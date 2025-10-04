import { useCallback } from 'react';

import { useAppDispatch, useAppSelector, useStorage } from '@/shared/hooks';
import { setAppearance } from '@/shared/lib';

import { SettingsStorageKey, updateIsDarkMode } from './model';

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
