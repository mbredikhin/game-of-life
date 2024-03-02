import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';

import { resetGrid } from '@/entities/grid';
import { SettingsMenu } from '@/entities/settings';
import { PatternsDrawer } from '@/features/selectPattern';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { Instruction } from '@/widgets/instruction';

import { GameStatusButton } from '../GameStatusButton/GameStatusButton';
import { GenerationsCounter } from '../GenerationsCounter/GenerationsCounter';
import { InitRandomlyButton } from '../InitRandomlyButton/InitRandomlyButton';
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
        <GenerationsCounter />
        <GameStatusButton />
        <InitRandomlyButton />
        <button className="button" onClick={() => dispatch(resetGrid(gridSettings))}>
          <ArrowPathIcon className="button__icon" />
        </button>
        <PatternsDrawer />
        <SettingsMenu />
        <Instruction />
      </div>
    </div>
  );
}
