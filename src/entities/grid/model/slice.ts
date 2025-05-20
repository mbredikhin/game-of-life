import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { IPattern } from '@/entities/pattern';
import type { Settings } from '@/entities/settings';
import { cropMatrix, clamp } from '@/shared/lib';

import { Coords, GameStatus, GridState } from './types';

const initialState: GridState = {
  grid: [],
  gridHistory: [],
  gridHasChanged: false,
  selectedPattern: null,
  generation: 0,
  gameStatus: GameStatus.Pause,
};

export const GridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    updateGrid: (state, action: PayloadAction<Partial<GridState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateGridCell: (state, action: PayloadAction<{ value: boolean; coords: Coords }>) => {
      const { coords, value } = action.payload;
      const row = [
        ...state.grid[coords.y].slice(0, coords.x),
        value,
        ...state.grid[coords.y].slice(coords.x + 1),
      ];
      const grid: GridState['grid'] = [
        ...state.grid.slice(0, coords.y),
        row,
        ...state.grid.slice(coords.y + 1),
      ];
      return {
        ...state,
        grid,
      };
    },
    resetGrid: (state, action: PayloadAction<Settings['grid']>) => {
      const { height, width } = action.payload;
      const grid = Array.from({ length: height }).map(() =>
        Array.from({ length: width }).map(() => false),
      );
      return {
        ...state,
        grid,
        generation: 0,
        gridHistory: [],
      };
    },
    stepBack: (state) => {
      return {
        ...state,
        ...(state.generation !== 0 && {
          grid: state.gridHistory.slice(-1)[0],
          gridHistory: state.gridHistory.slice(0, -1),
          generation: state.generation - 1,
          gameStatus: GameStatus.Pause,
        }),
      };
    },
    evolve: (state) => {
      let gridHasChanged = false;
      const grid = state.grid.map((row, y) =>
        row.map((cell, x) => {
          const neighboursCoords: Coords[] = [
            { x: x - 1, y: y + 1 },
            { x, y: y + 1 },
            { x: x + 1, y: y + 1 },
            { x: x - 1, y },
            { x: x + 1, y },
            { x: x - 1, y: y - 1 },
            { x, y: y - 1 },
            { x: x + 1, y: y - 1 },
          ];
          const populatedNeighbours = neighboursCoords.reduce((acc, coords) => {
            let { y, x } = coords;
            const gridHeight = state.grid.length;
            const gridWidth = state.grid[0].length;
            if (y < 0) {
              y = y + gridHeight;
            } else if (y > gridHeight - 1) {
              y = y - gridHeight;
            }
            if (x < 0) {
              x = x + gridWidth;
            } else if (x > gridWidth - 1) {
              x = x - gridWidth;
            }
            return state.grid[y][x] ? [...acc, { x, y }] : acc;
          }, [] as Coords[]);
          const result = cell
            ? populatedNeighbours.length > 1 && populatedNeighbours.length < 4
            : populatedNeighbours.length === 3;
          if (result !== cell) {
            gridHasChanged = true;
          }
          return result;
        }),
      );

      return {
        ...state,
        grid,
        gridHasChanged,
        ...(gridHasChanged ? { generation: state.generation + 1 } : {}),
        gridHistory: [...state.gridHistory, state.grid],
      };
    },
    selectPattern: (state, action: PayloadAction<GridState['selectedPattern']>) => {
      return {
        ...state,
        selectedPattern: action.payload,
      };
    },
    applyPattern: (state, action: PayloadAction<{ pattern: IPattern; coords: Coords }>) => {
      const { pattern, coords } = action.payload;
      const croppedPatternGrid = cropMatrix<boolean>(
        pattern.grid,
        [
          coords.y < 0 ? Math.abs(coords.y) : 0,
          coords.y > state.grid.length - 1
            ? state.grid.length - 1 - coords.y
            : state.grid.length - 1,
        ],
        [
          coords.x < 0 ? Math.abs(coords.x) : 0,
          coords.y > state.grid[0].length - 1
            ? state.grid[0].length - 1 - coords.x
            : state.grid[0].length - 1,
        ],
      );
      const y = clamp(coords.y, 0, state.grid.length - 1);
      const x = clamp(coords.x, 0, state.grid[0].length - 1);
      const grid = [
        ...state.grid.slice(0, y),
        ...state.grid
          .slice(y, y + croppedPatternGrid.length)
          .map((row, y) => [
            ...row.slice(0, x),
            ...croppedPatternGrid[y],
            ...row.slice(x + croppedPatternGrid[y].length),
          ]),
        ...state.grid.slice(y + croppedPatternGrid.length),
      ];
      return {
        ...state,
        grid,
        selectedPattern: null,
      };
    },
    updateGenerationsCount: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        generation: action.payload,
      };
    },
    updateGameStatus: (state, action: PayloadAction<GameStatus>) => {
      return {
        ...state,
        gameStatus: action.payload,
      };
    },
    initGridRandomly: (state) => {
      const grid = Array.from({ length: state.grid.length }).map(() =>
        Array.from({ length: state.grid[0].length }).map(() => Math.random() > 0.9),
      );
      return {
        ...state,
        grid,
        generation: 0,
      };
    },
  },
});

const selectGridCell = createSelector(
  [(state: GridState) => state.grid, (_: GridState, coords: Coords) => coords],
  (grid, coords) => grid.at(coords.y)?.at(coords.x) ?? false,
);

export const { reducer: gridReducer } = GridSlice;
export const {
  updateGrid,
  updateGridCell,
  resetGrid,
  stepBack,
  selectPattern,
  applyPattern,
  updateGenerationsCount,
  updateGameStatus,
  evolve,
  initGridRandomly,
} = GridSlice.actions;
export { selectGridCell };
