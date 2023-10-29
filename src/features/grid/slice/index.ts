import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coords, TGrid } from '../types';
import { ISettings } from '@/features/settings';

interface IGridState {
  grid: TGrid;
  gridHasChanged: boolean;
}

const initialState: IGridState = {
  grid: [],
  gridHasChanged: false,
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
  },
});

export const { updateGrid, updateGridCell, resetGrid } = GridSlice.actions;
export default GridSlice.reducer;
