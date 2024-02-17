import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IPattern } from '@/entities/pattern';
import type { Settings } from '@/entities/settings';
import { GridState, Coords, GameStatus } from './types';

export const GridSlice = createSlice({
  name: 'grid',
  initialState: {
    grid: [],
    gridHasChanged: false,
    selectedPattern: null,
    iterationsCount: 0,
    gameStatus: GameStatus.PAUSED,
  } as GridState,
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
        iterationsCount: 0,
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
          const populatedNeighbours = neighboursCoords.reduce(
            (acc, { x, y }) => (state.grid[y] && state.grid[y][x] ? [...acc, { x, y }] : acc),
            [] as Coords[],
          );
          const result = cell
            ? populatedNeighbours.length > 1 && populatedNeighbours.length < 4
            : populatedNeighbours.length === 3;
          if (result !== cell) {
            gridHasChanged = true;
          }
          return result;
        }),
      );
      if (!gridHasChanged) {
        return {
          ...state,
          gameStatus: GameStatus.PAUSED,
        };
      }
      return {
        ...state,
        grid,
        gridHasChanged,
        iterationsCount: state.iterationsCount + 1,
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
      const grid = [
        ...state.grid.slice(0, coords.y),
        ...state.grid
          .slice(coords.y, coords.y + pattern.grid.length)
          .map((row, y) => [
            ...row.slice(0, coords.x),
            ...pattern.grid[y],
            ...row.slice(coords.x + pattern.grid[y].length),
          ]),
        ...state.grid.slice(coords.y + pattern.grid.length),
      ];
      return {
        ...state,
        grid,
        selectedPattern: null,
      };
    },
    updateIterationsCount: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        iterationsCount: action.payload,
      };
    },
    updateGameStatus: (state, action: PayloadAction<GameStatus>) => {
      return {
        ...state,
        gameStatus: action.payload,
      };
    },
  },
});

export const { reducer: gridReducer } = GridSlice;
export const {
  updateGrid,
  updateGridCell,
  resetGrid,
  selectPattern,
  applyPattern,
  updateIterationsCount,
  updateGameStatus,
  evolve,
} = GridSlice.actions;
