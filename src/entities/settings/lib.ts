import { useAppDispatch, useAppSelector, useStorage } from '@/shared/hooks';
import { useCallback } from 'react';
import { Settings, updateIsDarkMode } from './model';

export enum SettingsStorageKey {
  DarkMode = 'darkMode',
  Tick = 'tick',
  Grid = 'grid',
}

export function useAppearance() {
  const isDarkMode = useAppSelector((state) => state.settings.isDarkMode);
  const dispatch = useAppDispatch();
  const { getFromStorage, setToStorage } = useStorage<SettingsStorageKey>(window.localStorage);

  const changeIsDarkMode = useCallback(
    (isDarkMode: boolean) => {
      document.documentElement.dataset.theme = isDarkMode ? 'dark' : 'light';
      dispatch(updateIsDarkMode(isDarkMode));
      setToStorage(SettingsStorageKey.DarkMode, isDarkMode);
    },
    [setToStorage, dispatch],
  );

  const initAppearance = () => {
    const isDarkMode: Settings['isDarkMode'] = getFromStorage(SettingsStorageKey.DarkMode) ?? true;
    changeIsDarkMode(isDarkMode);
  };

  return { isDarkMode, changeIsDarkMode, initAppearance };
}
