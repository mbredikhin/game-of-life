import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid';
import classnames from 'classnames/bind';
import { useCallback, useEffect } from 'react';

import { resetGrid } from '@/entities/grid';
import {
  MAX_GRID_SIZE,
  Settings as ISettings,
  updateGridSettings,
  updateTheme,
  updateTick,
} from '@/entities/settings';
import { useAppDispatch, useAppSelector, useStorage } from '@/shared/hooks';
import { Menu, Switch } from '@/shared/ui';

import { SettingsStorageKey, Theme } from '../../lib';
import styles from './SettingsMenu.module.scss';
const cx = classnames.bind(styles);

export function SettingsMenu() {
  const tickSettings = useAppSelector((state) => state.settings.tick);
  const gridSettings = useAppSelector((state) => state.settings.grid);
  const theme = useAppSelector((state) => state.settings.theme);
  const dispatch = useAppDispatch();
  const { getFromStorage, setToStorage } = useStorage<SettingsStorageKey>(window.localStorage);

  const changeGridSettings = useCallback(
    (settings: ISettings['grid']) => {
      dispatch(updateGridSettings(settings));
      dispatch(resetGrid(settings));
      setToStorage(SettingsStorageKey.Grid, settings);
    },
    [setToStorage, dispatch],
  );

  const changeTick = useCallback(
    (tick: ISettings['tick']) => {
      dispatch(updateTick(tick));
      setToStorage(SettingsStorageKey.Tick, tick);
    },
    [setToStorage, dispatch],
  );

  const changeTheme = useCallback(
    (theme: Theme) => {
      document.documentElement.dataset.theme = theme;
      dispatch(updateTheme(theme));
      setToStorage(SettingsStorageKey.DarkMode, theme);
    },
    [setToStorage, dispatch],
  );

  useEffect(() => {
    const theme: ISettings['theme'] | null = getFromStorage(SettingsStorageKey.DarkMode);
    if (theme === Theme.Light) {
      changeTheme(theme);
    }

    const preservedGridSettings: ISettings['grid'] | null = getFromStorage(SettingsStorageKey.Grid);
    if (preservedGridSettings) {
      changeGridSettings({ ...gridSettings, ...preservedGridSettings });
    }

    const tick: ISettings['tick'] | null = getFromStorage(SettingsStorageKey.Tick);
    if (tick) {
      changeTick(tick);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeGridSettings, changeTick, changeTheme]);

  const activator = (
    <button className="button" disabled>
      <WrenchScrewdriverIcon className="button__icon" />
    </button>
  );

  const content = (
    <>
      <label className={cx(['field'])}>
        <span className={cx(['field__name'])}>Grid height (1-{MAX_GRID_SIZE.height - 1})</span>
        <input
          className={cx(['field__input'])}
          type="number"
          min={1}
          max={MAX_GRID_SIZE.height}
          value={gridSettings.height}
          onChange={(event) => changeGridSettings({ ...gridSettings, height: +event.target.value })}
        />
      </label>
      <label className={cx(['field'])}>
        <span className={cx(['field__name'])}>Grid width (1-{MAX_GRID_SIZE.width - 1})</span>
        <input
          className={cx(['field__input'])}
          type="number"
          min={1}
          max={MAX_GRID_SIZE.width}
          value={gridSettings.width}
          onChange={(event) => changeGridSettings({ ...gridSettings, width: +event.target.value })}
        />
      </label>
      <label className={cx(['field'])}>
        <span className={cx(['field__name'])}>Tick duration (ms)</span>
        <input
          className={cx(['field__input'])}
          type="number"
          min={25}
          step={25}
          value={tickSettings}
          onChange={(event) => changeTick(+event.target.value)}
        />
      </label>
      <label className={cx(['field', 'pr-4'])}>
        <span className={cx(['field__name'])}>Dark mode</span>
        <Switch
          checked={theme === Theme.Dark}
          onChange={(value) => changeTheme(value ? Theme.Dark : Theme.Light)}
        />
      </label>
    </>
  );

  return <Menu activator={activator} content={content}></Menu>;
}
