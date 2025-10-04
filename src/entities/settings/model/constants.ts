import { Settings } from './types';

export const MAX_GRID_SIZE: Settings['grid'] = {
  height: 256,
  width: 256,
} as const;

export enum SettingsStorageKey {
  DarkMode = 'darkMode',
  Tick = 'tick',
  Grid = 'grid',
  PauseGameOnDraw = 'pauseGameOnDraw',
}
