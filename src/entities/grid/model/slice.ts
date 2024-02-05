import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Preset } from '@/entities/preset';
import type { Settings } from '@/entities/settings';
import type { GridState, Coords } from './types';

export const GridSlice = createSlice({
  name: 'grid',
  initialState: {
    grid: [],
    gridHasChanged: false,
    selectedPreset: null,
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
      const grid = [...state.grid.slice(0, coords.y), row, ...state.grid.slice(coords.y + 1)];
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
      };
    },
    selectPreset: (state, action: PayloadAction<GridState['selectedPreset']>) => {
      return {
        ...state,
        selectedPreset: action.payload,
      };
    },
    applyPreset: (state, action: PayloadAction<{ preset: Preset; coords: Coords }>) => {
      const { preset, coords } = action.payload;
      const grid = [
        ...state.grid.slice(0, coords.y),
        ...state.grid
          .slice(coords.y, coords.y + preset.grid.length)
          .map((row, y) => [
            ...row.slice(0, coords.x),
            ...preset.grid[y],
            ...row.slice(coords.x + preset.grid[y].length),
          ]),
        ...state.grid.slice(coords.y + preset.grid.length),
      ];
      return {
        ...state,
        grid,
      };
    },
  },
});

export const { reducer: gridReducer } = GridSlice;
export const { updateGrid, updateGridCell, resetGrid, selectPreset, applyPreset } =
  GridSlice.actions;
