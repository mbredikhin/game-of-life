import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

import { resetGrid } from '@/entities/grid';
import type { Settings as ISettings } from '@/entities/settings';
import {
  MAX_GRID_SIZE,
  updateDarkModeSettings,
  updateGridSettings,
  updateTickSettings,
} from '@/entities/settings';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { Menu, Switch } from '@/shared/ui';

import styles from './SettingsMenu.module.scss';

export function SettingsMenu() {
  const tickSettings = useAppSelector((state) => state.settings.tick);
  const gridSettings = useAppSelector((state) => state.settings.grid);
  const darkMode = useAppSelector((state) => state.settings.darkMode);
  const dispatch = useAppDispatch();

  function changeGridSettings(settings: Partial<ISettings['grid']>) {
    dispatch(updateGridSettings(settings));
    dispatch(resetGrid(gridSettings));
  }

  function changeTickSettings(settings: ISettings['tick']) {
    dispatch(updateTickSettings(settings));
  }

  function changeTheme(isDarkMode: ISettings['darkMode']) {
    if (isDarkMode) {
      document.documentElement.dataset.theme = 'dark';
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.dataset.theme = 'light';
      localStorage.setItem('theme', 'light');
    }
    dispatch(updateDarkModeSettings(isDarkMode));
  }

  const activator = (
    <button className="button">
      <Cog6ToothIcon className="button__icon" />
    </button>
  );

  const content = (
    <>
      <label className={styles['field']}>
        <span className={styles['field__name']}>Grid height (1-{MAX_GRID_SIZE.height - 1})</span>
        <input
          className={styles['field__input']}
          type="number"
          min={1}
          max={MAX_GRID_SIZE.height}
          value={gridSettings.height}
          onChange={(event) => changeGridSettings({ height: +event.target.value })}
        />
      </label>
      <label className={styles['field']}>
        <span className={styles['field__name']}>Grid width (1-{MAX_GRID_SIZE.width - 1})</span>
        <input
          className={styles['field__input']}
          type="number"
          min={1}
          max={MAX_GRID_SIZE.width}
          value={gridSettings.width}
          onChange={(event) => changeGridSettings({ width: +event.target.value })}
        />
      </label>
      <label className={styles['field']}>
        <span className={styles['field__name']}>Tick duration (ms)</span>
        <input
          className={styles['field__input']}
          type="number"
          min={0}
          step={25}
          value={tickSettings}
          onChange={(event) => changeTickSettings(+event.target.value)}
        />
      </label>
      <label className={clsx([styles['field'], 'pr-4'])}>
        <span className={styles['field__name']}>Dark mode</span>
        <Switch checked={darkMode} onChange={changeTheme} />
      </label>
    </>
  );

  return <Menu activator={activator} content={content}></Menu>;
}
