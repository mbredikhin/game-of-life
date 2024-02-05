import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import {
  GameStatus,
  resetGrid,
  updateGrid,
  updateGridCell,
  applyPreset,
  selectPreset,
} from '@/entities/grid';
import { Grid } from '@/features/grid';
import { PresetsMenu } from '@/features/presets';
import { SettingsMenu } from '@/entities/settings';
import { Instruction } from '@/widgets/instruction';
import './styles/index.scss';
import PlayIcon from './assets/images/play.svg';
import PauseIcon from './assets/images/pause.svg';
import styles from './App.module.scss';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

export function App() {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.PAUSED);
  const [iterationsCount, setIterationsCount] = useState(0);
  const settings = useAppSelector((state) => state.settings);
  const gridState = useAppSelector((state) => state.gridState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    reset();
  }, []);

  function toggleGameStatus() {
    const newStatus = gameStatus === GameStatus.PAUSED ? GameStatus.PLAY : GameStatus.PAUSED;
    setGameStatus(newStatus);
    if (newStatus === GameStatus.PLAY) {
      changeIterationsCount(0);
    }
  }

  function changeIterationsCount(count: number) {
    setIterationsCount(count);
  }

  function reset() {
    changeIterationsCount(0);
    dispatch(resetGrid(settings.grid));
  }

  return (
    <>
      <div className={styles['app-header']}>
        <span className={styles['app-header__title']}>Conway's Game of Life</span>
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
      <div className={styles['grid-container']}>
        <Grid
          status={gameStatus}
          iterationsCount={iterationsCount}
          settings={settings}
          gridState={gridState}
          toggleGameStatus={toggleGameStatus}
          changeIterationsCount={changeIterationsCount}
          updateGrid={(payload) => dispatch(updateGrid(payload))}
          updateGridCell={(payload) => dispatch(updateGridCell(payload))}
          applyPreset={(payload) => {
            dispatch(applyPreset(payload));
            dispatch(selectPreset(null));
          }}
        />
      </div>
    </>
  );
}
