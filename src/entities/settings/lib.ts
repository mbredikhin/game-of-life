import { useCallback } from 'react';

import { useAppDispatch, useAppSelector, useStorage } from '@/shared/hooks';
import { setAppearance } from '@/shared/lib';

import { updateIsDarkMode } from './model';

export enum SettingsStorageKey {
  DarkMode = 'darkMode',
  Tick = 'tick',
  Grid = 'grid',
  PauseGameOnDraw = 'pauseGameOnDraw',
}

export function useAppearance() {
  const isDarkMode = useAppSelector((state) => state.settings.isDarkMode);
  const dispatch = useAppDispatch();
  const { setToStorage } = useStorage<SettingsStorageKey>();

  const changeIsDarkMode = useCallback(
    (isDarkMode: boolean) => {
      setAppearance(isDarkMode);
      dispatch(updateIsDarkMode(isDarkMode));
      setToStorage(SettingsStorageKey.DarkMode, isDarkMode);
    },
    [setToStorage, dispatch],
  );

  return { isDarkMode, changeIsDarkMode };
}
