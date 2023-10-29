import { useRef, useState } from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { ISettings, MAX_GRID_SIZE, updateSettings } from '../../slice';
import styles from './Settings.module.scss';
import { resetGrid } from '@/features/grid/slice';

export const Settings = () => {
  const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);
  const dropdownRef = useRef<HTMLInputElement>(null);
  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  function changeSettings(payload: Partial<ISettings>) {
    dispatch(updateSettings(payload));
    dispatch(resetGrid(settings.grid));
  }

  return (
    <div
      className={styles.container}
      onMouseOver={() => setIsDropdownExpanded(true)}
      onMouseOut={() => setIsDropdownExpanded(false)}
    >
      <button className={styles.button}>
        <Cog6ToothIcon className={styles['button__icon']} />
      </button>

      {isDropdownExpanded ? (
        <div ref={dropdownRef} className={styles.form}>
          <label className={styles['field']}>
            <span className={styles['field__name']}>
              Grid height (1-{MAX_GRID_SIZE.height - 1})
            </span>
            <input
              className={styles['field__input']}
              type="number"
              min={1}
              max={MAX_GRID_SIZE.height}
              value={settings.grid.height}
              onChange={(event) =>
                changeSettings({
                  grid: {
                    ...settings.grid,
                    ...(+event.target.value < MAX_GRID_SIZE.height && {
                      height: +event.target.value,
                    }),
                  },
                })
              }
            />
          </label>
          <label className={styles['field']}>
            <span className={styles['field__name']}>Grid width (1-{MAX_GRID_SIZE.width - 1})</span>
            <input
              className={styles['field__input']}
              type="number"
              min={1}
              max={MAX_GRID_SIZE.width}
              value={settings.grid.width}
              onChange={(event) =>
                changeSettings({
                  grid: {
                    ...settings.grid,
                    ...(+event.target.value < MAX_GRID_SIZE.width && {
                      width: +event.target.value,
                    }),
                  },
                })
              }
            />
          </label>
          <label className={styles['field']}>
            <span className={styles['field__name']}>Tick duration (ms)</span>
            <input
              className={styles['field__input']}
              type="number"
              min={0}
              value={settings.tick}
              onChange={(event) => changeSettings({ tick: +event.target.value })}
            />
          </label>
        </div>
      ) : null}
    </div>
  );
};
