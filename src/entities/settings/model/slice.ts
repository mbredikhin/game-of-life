import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { MAX_GRID_SIZE } from '@/entities/settings/model/constants';
import { bindStorage, omitBy } from '@/shared/lib';

import { SettingsStorageKey } from '../lib';
import type { Settings } from './types';

const { get: getFromStorage } = bindStorage(window.localStorage);

const defaultSettings: Settings = {
  isDarkMode: true,
  tick: 200,
  pauseGameOnDraw: true,
  grid: {
    width: 75,
    height: 40,
  },
};

const persistedSettings = omitBy(
  {
    isDarkMode: getFromStorage(SettingsStorageKey.DarkMode),
    tick: getFromStorage(SettingsStorageKey.Tick),
    pauseGameOnDraw: getFromStorage(SettingsStorageKey.PauseGameOnDraw),
    grid: getFromStorage(SettingsStorageKey.Grid),
  },
  (_, value) => value === null,
) as Partial<Settings>;

const initialState: Settings = {
  ...defaultSettings,
  ...persistedSettings,
};

export const SettingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateIsDarkMode: (state, action: PayloadAction<Settings['isDarkMode']>) => {
      state.isDarkMode = action.payload;
    },
    updateTick: (state, action: PayloadAction<Settings['tick']>) => {
      state.tick = action.payload;
    },
    updatePauseGameOnDraw: (state, action: PayloadAction<Settings['pauseGameOnDraw']>) => {
      state.pauseGameOnDraw = action.payload;
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
      state.grid = {
        ...state.grid,
        ...payload,
      };
    },
  },
});

export const { reducer: settingsReducer } = SettingsSlice;
export const { updateTick, updateGridSettings, updateIsDarkMode, updatePauseGameOnDraw } =
  SettingsSlice.actions;
