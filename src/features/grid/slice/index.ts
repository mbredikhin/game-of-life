import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coords, TGrid } from '../types';
import { ISettings } from '@/features/settings';
import { IPreset } from '@/features/presets';

export interface IGridState {
  grid: TGrid;
  gridHasChanged: boolean;
  selectedPreset: IPreset | null;
}

const initialState: IGridState = {
  grid: [],
  gridHasChanged: false,
  selectedPreset: null,
};

export const GridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    updateGrid: (state, action: PayloadAction<Partial<IGridState>>) => {
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
    resetGrid: (state, action: PayloadAction<ISettings['grid']>) => {
      const { height, width } = action.payload;
      const grid = Array.from({ length: height }).map(() =>
        Array.from({ length: width }).map(() => false),
      );
      return {
        ...state,
        grid,
      };
    },
    selectPreset: (state, action: PayloadAction<IGridState['selectedPreset']>) => {
      return {
        ...state,
        selectedPreset: action.payload,
      };
    },
    applyPreset: (state, action: PayloadAction<{ preset: IPreset; coords: Coords }>) => {
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

export const { updateGrid, updateGridCell, resetGrid, selectPreset, applyPreset } =
  GridSlice.actions;
export default GridSlice.reducer;
