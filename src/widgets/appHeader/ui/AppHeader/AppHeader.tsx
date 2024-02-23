import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';

import { resetGrid } from '@/entities/grid';
import { SettingsMenu } from '@/entities/settings';
import { PatternsMenu } from '@/features/selectPattern';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { Instruction } from '@/widgets/instruction';

import { GameStatusButton } from '../GameStatusButton/GameStatusButton';
import { IterationsCounter } from '../IterationsCounter/IterationsCounter';
import styles from './AppHeader.module.scss';

export function AppHeader() {
  const gridSettings = useAppSelector((state) => state.settings.grid);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetGrid(gridSettings));
  }, [gridSettings, dispatch]);

  return (
    <div className={styles['app-header']}>
      <span className={styles['app-header__title']}>Conway&apos;s Game of Life</span>
      <div className={styles['app-header-controls']}>
        <IterationsCounter />
        <GameStatusButton />
        <button className="button" onClick={() => dispatch(resetGrid(gridSettings))}>
          <ArrowPathIcon className="button__icon" />
        </button>
        <PatternsMenu />
        <SettingsMenu />
        <Instruction />
      </div>
    </div>
  );
}
