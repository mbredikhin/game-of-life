import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Settings } from './types';

export const SettingsSlice = createSlice({
  name: 'settings',
  initialState: {
    tick: 1 * 250,
    grid: {
      width: 64,
      height: 40,
    },
  } as Settings,
  reducers: {
    updateSettings: (state, action: PayloadAction<Partial<Settings>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { reducer: settingsReducer } = SettingsSlice;
export const { updateSettings } = SettingsSlice.actions;
