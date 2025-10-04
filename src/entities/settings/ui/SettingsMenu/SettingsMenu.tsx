import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid';
import classnames from 'classnames/bind';
import { useCallback } from 'react';

import { resetGrid } from '@/entities/grid';
import {
  MAX_GRID_SIZE,
  Settings,
  SettingsStorageKey,
  updateGridSettings,
  updatePauseGameOnDraw,
  updateTick,
} from '@/entities/settings';
import { TourPopup, TourStepID } from '@/features/tour';
import { useAppDispatch, useAppSelector, useStorage } from '@/shared/hooks';
import { Menu, Switch } from '@/shared/ui';

import { useAppearance } from '../../lib';
import styles from './SettingsMenu.module.scss';
const cx = classnames.bind(styles);

export function SettingsMenu() {
  const tick = useAppSelector((state) => state.settings.tick);
  const gridSettings = useAppSelector((state) => state.settings.grid);
  const pauseGameOnDraw = useAppSelector((state) => state.settings.pauseGameOnDraw);
  const dispatch = useAppDispatch();
  const { setToStorage } = useStorage<SettingsStorageKey>();
  const { isDarkMode, changeIsDarkMode } = useAppearance();

  const changeGridSettings = useCallback(
    (settings: Settings['grid']) => {
      dispatch(updateGridSettings(settings));
      dispatch(resetGrid(settings));
      setToStorage(SettingsStorageKey.Grid, settings);
    },
    [setToStorage, dispatch],
  );

  const changeTick = useCallback(
    (tick: Settings['tick']) => {
      dispatch(updateTick(tick));
      setToStorage(SettingsStorageKey.Tick, tick);
    },
    [setToStorage, dispatch],
  );

  const changePauseGameOnDraw = useCallback(
    (pauseGameOnDraw: Settings['pauseGameOnDraw']) => {
      dispatch(updatePauseGameOnDraw(pauseGameOnDraw));
      setToStorage(SettingsStorageKey.PauseGameOnDraw, pauseGameOnDraw);
    },
    [setToStorage, dispatch],
  );

  const activator = (
    <button className="button">
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
          value={tick}
          onChange={(event) => changeTick(+event.target.value)}
        />
      </label>
      <label className={cx(['field', 'pr-4'])}>
        <span className={cx(['field__name'])}>Dark mode</span>
        <Switch checked={isDarkMode} onChange={changeIsDarkMode} />
      </label>
      <label className={cx(['field', 'pr-4'])}>
        <span className={cx(['field__name'])}>Pause game on draw</span>
        <Switch checked={pauseGameOnDraw} onChange={changePauseGameOnDraw} />
      </label>
    </>
  );

  return (
    <TourPopup stepID={TourStepID.Settings}>
      <Menu activator={activator} content={content}></Menu>
    </TourPopup>
  );
}
