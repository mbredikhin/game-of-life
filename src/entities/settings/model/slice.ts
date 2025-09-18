import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { MAX_GRID_SIZE } from '@/entities/settings/model/constants';

import type { Settings } from './types';
import { SettingsStorageKey } from '../lib';
import { bindStorage } from '@/shared/lib';

const { get: getFromStorage } = bindStorage(window.localStorage);

export const SettingsSlice = createSlice({
  name: 'settings',
  initialState: {
    isDarkMode: getFromStorage(SettingsStorageKey.DarkMode) ?? true,
    tick: getFromStorage(SettingsStorageKey.Tick) ?? 200,
    grid: {
      width: 75,
      height: 40,
      ...getFromStorage(SettingsStorageKey.Grid),
    },
  } as Settings,
  reducers: {
    updateTick: (state, action: PayloadAction<Settings['tick']>) => {
      return {
        ...state,
        tick: action.payload,
      };
    },
    updateGridSettings: (state, action: PayloadAction<Partial<Settings['grid']>>) => {
      const keys = Object.keys(action.payload) as (keyof typeof action.payload)[];
      const payload = keys.reduce(
        (acc, key) => ({
          ...acc,
          [key]:
            action.payload[key]! > MAX_GRID_SIZE[key] ? MAX_GRID_SIZE[key] : action.payload[key],
        }),
        {} as Partial<Settings['grid']>,
      );
      return {
        ...state,
        grid: {
          ...state.grid,
          ...payload,
        },
      };
    },
    updateIsDarkMode: (state, action: PayloadAction<Settings['isDarkMode']>) => {
      return {
        ...state,
        isDarkMode: action.payload,
      };
    },
  },
});

export const { reducer: settingsReducer } = SettingsSlice;
export const { updateTick, updateGridSettings, updateIsDarkMode } = SettingsSlice.actions;
