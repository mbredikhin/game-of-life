import { ArrowPathIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useEffect } from 'react';

import PauseIcon from '@/app/assets/images/pause.svg';
import PlayIcon from '@/app/assets/images/play.svg';
import { GameStatus, resetGrid, updateGameStatus } from '@/entities/grid';
import { SettingsMenu } from '@/entities/settings';
import { PatternsMenu } from '@/features/selectPattern';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { Instruction } from '@/widgets/instruction';

import styles from './AppHeader.module.scss';

export function AppHeader() {
  const settings = useAppSelector((state) => state.settings);
  const gameStatus = useAppSelector((state) => state.gridState.gameStatus);
  const iterationsCount = useAppSelector((state) => state.gridState.iterationsCount);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetGrid(settings.grid));
  }, [settings.grid, dispatch]);

  function toggleGameStatus() {
    const newStatus = gameStatus === GameStatus.PAUSED ? GameStatus.PLAY : GameStatus.PAUSED;
    dispatch(updateGameStatus(newStatus));
  }

  return (
    <div className={styles['app-header']}>
      <span className={styles['app-header__title']}>Conway&apos;s Game of Life</span>
      <div className={styles['app-header-controls']}>
        <span className={styles['app-header__text']}>Iteration: {iterationsCount}</span>
        <button className={clsx(['button', 'button--lg'])} onClick={toggleGameStatus}>
          <span>{gameStatus === GameStatus.PAUSED ? 'Start' : 'Pause'}</span>
          <img
            className="button__icon"
            src={gameStatus === GameStatus.PAUSED ? PlayIcon : PauseIcon}
            alt=""
          />
        </button>
        <button className="button" onClick={() => dispatch(resetGrid(settings.grid))}>
          <ArrowPathIcon className="button__icon" />
        </button>
        <PatternsMenu />
        <SettingsMenu />
        <Instruction />
      </div>
    </div>
  );
}
