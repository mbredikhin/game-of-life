import { useState } from 'react';
import { Settings } from '@/features/settings';
import { Grid } from '@/features/grid';
import { Instruction } from '@/features/instruction';
import { GameStatus } from '@/utils/constants';
import styles from './App.module.scss';
import { Provider } from 'react-redux';
import { store } from '@/store';
import PlayIcon from '@/assets/images/play.svg';
import PauseIcon from '@/assets/images/pause.svg';

function App() {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.PAUSED);

  function toggleGameStatus() {
    setGameStatus(gameStatus === GameStatus.PAUSED ? GameStatus.PLAY : GameStatus.PAUSED);
  }

  return (
    <Provider store={store}>
      <div className={styles['app-header']}>
        <span className={styles['app-header__title']}>Conway's Game of Life</span>
        <div className={styles['app-header-controls']}>
          <button className={styles['app-header-controls__button']} onClick={toggleGameStatus}>
            <span>{gameStatus === GameStatus.PAUSED ? 'Start' : 'Pause'}</span>
            <img
              className={styles['app-header-controls__button-icon']}
              src={gameStatus === GameStatus.PAUSED ? PlayIcon : PauseIcon}
              alt=""
            />
          </button>
          <Settings />
          <Instruction />
        </div>
      </div>
      <div className={styles['grid-container']}>
        <Grid status={gameStatus} toggleGameStatus={toggleGameStatus} />
      </div>
    </Provider>
  );
}

export default App;
