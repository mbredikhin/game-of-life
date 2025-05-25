import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { IPattern } from '@/entities/pattern';
import { cropMatrix, clamp } from '@/shared/lib';

import { Coords, GameStatus, GridDiff, GridState, TGrid } from './types';
import { Settings } from '@/entities/settings';

const getNeighboursCount = ([y, x]: Coords, grid: TGrid): number => {
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;
  let neighboursCoords: Coords[] = [
    [y + 1, x - 1],
    [y + 1, x],
    [y + 1, x + 1],
    [y, x - 1],
    [y, x + 1],
    [y - 1, x - 1],
    [y - 1, x],
    [y - 1, x + 1],
  ];

  neighboursCoords.forEach((coords) => {
    if (coords[0] < 0) {
      coords[0] += gridHeight;
    } else if (coords[0] > gridHeight - 1) {
      coords[0] -= gridHeight;
    }
    if (coords[1] < 0) {
      coords[1] += gridWidth;
    } else if (coords[1] > gridWidth - 1) {
      coords[1] -= gridWidth;
    }
  });

  return neighboursCoords.reduce((acc, [y, x]) => acc + (grid[y]?.[x] ? 1 : 0), 0);
};

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
    updateGridCell: (state, action: PayloadAction<{ value: boolean; coords: Coords }>) => {
      const { coords, value } = action.payload;
      const [y, x] = coords;
      if (state.grid[y][x] === value) {
        return state;
      }

      state.grid[y][x] = value;

      const gridDiff = state.gridDiffStack.at(-1);
      if (gridDiff) {
        gridDiff.push([y, x]);
      }
    },

    resetGrid: (state, action: PayloadAction<Settings['grid']>) => {
      const { height, width } = action.payload;

      state.grid = Array.from({ length: height }).map(() =>
        Array.from({ length: width }).map(() => false),
      );
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
        if (grid[y] && x in grid[y]) {
          grid[y][x] = !grid[y][x];
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
          const newCell = cell ? [2, 3].includes(neighboursCount) : neighboursCount === 3;
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

    applyPattern: (state, action: PayloadAction<{ pattern: IPattern; coords: Coords }>) => {
      const [y, x] = action.payload.coords;
      const croppedPatternGrid = cropMatrix<boolean>(
        action.payload.pattern.grid,
        [
          y < 0 ? Math.abs(y) : 0,
          y > state.grid.length - 1 ? state.grid.length - 1 - y : state.grid.length - 1,
        ],
        [
          x < 0 ? Math.abs(x) : 0,
          y > state.grid[0].length - 1 ? state.grid[0].length - 1 - x : state.grid[0].length - 1,
        ],
      );

      const startFromY = clamp(y, 0, state.grid.length - 1);
      const startFromX = clamp(x, 0, state.grid[0].length - 1);

      const gridDiff = state.gridDiffStack.at(-1);
      if (gridDiff) {
        croppedPatternGrid.forEach((row, y) => {
          row.forEach((cell, x) => {
            if (cell && !state.grid[y][x]) {
              gridDiff.push([startFromY + y, startFromX + x]);
            }
          });
        });
      }

      state.grid = [
        ...state.grid.slice(0, startFromY),
        ...state.grid
          .slice(startFromY, startFromY + croppedPatternGrid.length)
          .map((row, y) => [
            ...row.slice(0, startFromX),
            ...croppedPatternGrid[y],
            ...row.slice(startFromX + croppedPatternGrid[y].length),
          ]),
        ...state.grid.slice(y + croppedPatternGrid.length),
      ];
      state.selectedPattern = null;
    },

    updateGenerationsCount: (state, action: PayloadAction<number>) => {
      state.generation = action.payload;
    },

    updateGameStatus: (state, action: PayloadAction<GameStatus>) => {
      state.gameStatus = action.payload;
    },

    generateRandomPopulation: (state) => {
      state.grid = state.grid.map((row) => row.map(() => Math.random() > 0.9));
      state.gameStatus = GameStatus.Pause;
      state.generation = 0;
      state.gridDiffStack = [];
    },
  },
});

const selectGridCell = createSelector(
  [(state: GridState) => state.grid, (_: GridState, coords: Coords) => coords],
  (grid, [y, x]) => grid.at(y)?.at(x) ?? false,
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
