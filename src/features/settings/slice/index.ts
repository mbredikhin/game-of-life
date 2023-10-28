import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISettings {
  tick: number;
  grid: {
    width: number;
    height: number;
  };
}

const initialState: ISettings = {
  tick: 1 * 250,
  grid: {
    width: 64,
    height: 40,
  },
};

export const MAX_GRID_SIZE: ISettings['grid'] = {
  height: 256,
  width: 256,
} as const;

export const SettingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings: (state, action: PayloadAction<Partial<ISettings>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateSettings } = SettingsSlice.actions;
export default SettingsSlice.reducer;
