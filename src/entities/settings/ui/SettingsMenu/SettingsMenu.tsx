import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid';
import classnames from 'classnames/bind';
import { useCallback } from 'react';

import { resetGrid } from '@/entities/grid';
import { MAX_GRID_SIZE, Settings, updateGridSettings, updateTick } from '@/entities/settings';
import { TourPopup, TourStepID } from '@/features/tour';
import { useAppDispatch, useAppSelector, useStorage } from '@/shared/hooks';
import { Menu, Switch } from '@/shared/ui';

import { SettingsStorageKey, useAppearance } from '../../lib';
import styles from './SettingsMenu.module.scss';
const cx = classnames.bind(styles);

export function SettingsMenu() {
  const tickSettings = useAppSelector((state) => state.settings.tick);
  const gridSettings = useAppSelector((state) => state.settings.grid);
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
          value={tickSettings}
          onChange={(event) => changeTick(+event.target.value)}
        />
      </label>
      <label className={cx(['field', 'pr-4'])}>
        <span className={cx(['field__name'])}>Dark mode</span>
        <Switch checked={isDarkMode} onChange={changeIsDarkMode} />
      </label>
    </>
  );

  return (
    <TourPopup stepID={TourStepID.Settings}>
      <Menu activator={activator} content={content}></Menu>
    </TourPopup>
  );
}
