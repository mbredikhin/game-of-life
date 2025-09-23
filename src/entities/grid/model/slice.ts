import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { cropMatrix, clamp, assignMatrices, MatrixCropWindow } from '@/shared/lib';
import { CellState, Coords, GameStatus, GridDiff, GridState, TGrid } from './types';
import { Settings } from '@/entities/settings';
import { getNeighboursCount } from '../lib';

const initialState: GridState = {
  grid: [],
  gridDiffStack: [],
  selectedPattern: null,
  generation: 0,
  gameStatus: GameStatus.Pause,
};

export const GridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    updateGridCell: (state, action: PayloadAction<{ coords: Coords; cellState: CellState }>) => {
      const { coords, cellState } = action.payload;
      const [y, x] = coords;
      if (state.grid[y][x] === cellState) {
        return;
      }

      state.grid[y][x] = cellState;

      if (cellState === CellState.Ghost) {
        return;
      }

      const gridDiff = state.gridDiffStack.at(-1);
      if (gridDiff) {
        gridDiff.push([y, x]);
      }
    },

    resetGrid: (state, action: PayloadAction<Settings['grid']>) => {
      const { height, width } = action.payload;

      state.grid = Array.from({ length: height }).map(() =>
        Array.from({ length: width }).map(() => CellState.Empty),
      );
      state.selectedPattern = null;
      state.generation = 0;
      state.gridDiffStack = [];
      state.gameStatus = GameStatus.Pause;
    },

    stepBack: (state) => {
      if (state.generation === 0) {
        return state;
      }
      const grid = state.grid;
      const gridDiff: GridDiff = state.gridDiffStack.pop() ?? [];
      gridDiff.forEach(([y, x]) => {
        if (!(x in (grid[y] ?? []))) {
          return;
        }
        if (grid[y][x] === CellState.Populated) {
          grid[y][x] = CellState.Empty;
        } else if (grid[y][x] === CellState.Empty) {
          grid[y][x] = CellState.Populated;
        }
      });
      state.generation -= 1;
      state.gameStatus = GameStatus.Pause;
    },

    evolve: (state) => {
      const gridDiff: GridDiff = [];
      state.grid = state.grid.map((row, y) =>
        row.map((cell, x) => {
          const neighboursCount = getNeighboursCount([y, x], state.grid);
          let newCell: CellState = cell === CellState.Ghost ? CellState.Ghost : CellState.Empty;
          if (
            (cell === CellState.Populated && [2, 3].includes(neighboursCount)) ||
            neighboursCount === 3
          ) {
            newCell = CellState.Populated;
          }

          if (newCell !== cell) {
            gridDiff.push([y, x]);
          }
          return newCell;
        }),
      );
      state.gridDiffStack.push(gridDiff);
      state.generation += 1;
      if (gridDiff.length === 0) {
        state.gameStatus = GameStatus.Pause;
      }
    },

    selectPattern: (state, action: PayloadAction<GridState['selectedPattern']>) => {
      state.selectedPattern = action.payload;
    },

    applyPattern: (
      state,
      action: PayloadAction<{
        pattern: TGrid;
        coords: Coords;
        isGhost?: boolean;
      }>,
    ) => {
      const [y, x] = action.payload.coords;
      const maxY = state.grid.length - 1;
      const maxX = state.grid[0].length - 1;
      const patternCropWindow: MatrixCropWindow = {
        y: [y < 0 ? Math.abs(y) : 0, y > maxY ? maxY - y : maxY],
        x: [x < 0 ? Math.abs(x) : 0, x > maxX ? maxX - x : maxX],
      };
      const patternGrid = cropMatrix(action.payload.pattern, patternCropWindow);

      const applyFrom = {
        y: clamp(y, 0, maxY),
        x: clamp(x, 0, maxX),
      } as const;

      if (action.payload.isGhost) {
        const cleanedGrid = state.grid.map((row) =>
          row.map((cell) => (cell === CellState.Ghost ? CellState.Empty : cell)),
        );
        const ghostGrid = patternGrid.map((row, y) =>
          row.map((patternCell, x) => {
            const coords = { y: applyFrom.y + y, x: applyFrom.x + x };
            if (coords.y >= state.grid.length || coords.x >= state.grid[0].length) {
              return CellState.Empty;
            }
            const gridCell = state.grid[coords.y][coords.x];
            const cell =
              patternCell === CellState.Populated
                ? CellState.Ghost
                : cleanedGrid[coords.y][coords.x];
            return gridCell === CellState.Populated ? gridCell : cell;
          }),
        );
        state.grid = assignMatrices(cleanedGrid, ghostGrid, applyFrom);
        return;
      }

      const gridDiff = state.gridDiffStack.at(-1);
      if (gridDiff) {
        patternGrid.forEach((row, y) => {
          row.forEach((cell, x) => {
            if (cell === CellState.Populated && state.grid[y][x] === CellState.Empty) {
              gridDiff.push([applyFrom.y + y, applyFrom.x + x]);
            }
          });
        });
      }

      state.grid = assignMatrices(state.grid, patternGrid, applyFrom, [CellState.Empty]);
      state.selectedPattern = null;
    },

    updateGenerationsCount: (state, action: PayloadAction<number>) => {
      state.generation = action.payload;
    },

    updateGameStatus: (state, action: PayloadAction<GameStatus>) => {
      state.gameStatus = action.payload;
    },

    generateRandomPopulation: (state) => {
      state.grid = state.grid.map((row) =>
        row.map(() => (Math.random() > 0.9 ? CellState.Populated : CellState.Empty)),
      );
      state.gameStatus = GameStatus.Pause;
      state.selectedPattern = null;
      state.generation = 0;
      state.gridDiffStack = [];
    },
  },
});

const selectGridCell = createSelector(
  [(state: GridState) => state.grid, (_: GridState, coords: Coords) => coords],
  (grid, [y, x]) => grid.at(y)?.at(x) ?? CellState.Empty,
);

export const { reducer: gridReducer } = GridSlice;
export const {
  updateGridCell,
  resetGrid,
  stepBack,
  selectPattern,
  applyPattern,
  updateGenerationsCount,
  updateGameStatus,
  evolve,
  generateRandomPopulation,
} = GridSlice.actions;
export { selectGridCell };
