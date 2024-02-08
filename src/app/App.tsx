import clsx from 'clsx';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { GameStatus, resetGrid, updateGameStatus, updateIterationsCount } from '@/entities/grid';
import { PresetsMenu } from '@/features/selectPreset';
import { SettingsMenu } from '@/entities/settings';
import { Instruction } from '@/widgets/instruction';
import './styles/index.scss';
import PlayIcon from './assets/images/play.svg';
import PauseIcon from './assets/images/pause.svg';
import styles from './App.module.scss';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { AppRouter } from '@/app/router/AppRouter';
import { withProviders } from '@/app/providers';

function App() {
  const settings = useAppSelector((state) => state.settings);
  const gameStatus = useAppSelector((state) => state.gridState.gameStatus);
  const iterationsCount = useAppSelector((state) => state.gridState.iterationsCount);
  const dispatch = useAppDispatch();

  const reset = useCallback(() => {
    dispatch(updateIterationsCount(0));
    dispatch(resetGrid(settings.grid));
  }, [settings.grid, dispatch]);

  useEffect(() => {
    reset();
  }, [reset]);

  function toggleGameStatus() {
    const newStatus = gameStatus === GameStatus.PAUSED ? GameStatus.PLAY : GameStatus.PAUSED;
    dispatch(updateGameStatus(newStatus));
    if (newStatus === GameStatus.PLAY) {
      dispatch(updateIterationsCount(0));
    }
  }

  return (
    <>
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
          <button className="button" onClick={() => reset()}>
            <ArrowPathIcon className="button__icon" />
          </button>
          <PresetsMenu />
          <SettingsMenu />
          <Instruction />
        </div>
      </div>
      <AppRouter />
    </>
  );
}

export default withProviders(App);
