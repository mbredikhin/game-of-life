import { useEffect, useState } from 'react';
import { Settings } from '@/features/settings';
import { Grid } from '@/features/grid';
import { Instruction } from '@/features/instruction';
import { GameStatus } from '@/utils/constants';
import styles from './App.module.scss';

import PlayIcon from '@/assets/images/play.svg';
import PauseIcon from '@/assets/images/pause.svg';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { resetGrid } from './features/grid/slice';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

function App() {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.PAUSED);
  const [iterationsCount, setIterationsCount] = useState(0);
  const settings = useAppSelector((state) => state.settings);
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
          <Settings />
          <Instruction />
        </div>
      </div>
      <div className={styles['grid-container']}>
        <Grid
          status={gameStatus}
          iterationsCount={iterationsCount}
          toggleGameStatus={toggleGameStatus}
          changeIterationsCount={changeIterationsCount}
        />
      </div>
    </>
  );
}

export default App;
