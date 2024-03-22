import { useEffect } from 'react';

import PauseIcon from '@/app/assets/images/pause.svg?react';
import PlayIcon from '@/app/assets/images/play.svg?react';
import { evolve, GameStatus, updateGameStatus } from '@/entities/grid';
import { TourPopup, TourStepID } from '@/features/tour';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';

let loop: number | undefined;

export function GameStatusButton() {
  const tick = useAppSelector((state) => state.settings.tick);
  const gameStatus = useAppSelector((state) => state.gridState.gameStatus);
  const gridHasChanged = useAppSelector((state) => state.gridState.gridHasChanged);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!gridHasChanged) {
      dispatch(updateGameStatus(GameStatus.PAUSED));
      clearInterval(loop);
    }
  }, [gridHasChanged, dispatch]);

  useEffect(() => {
    if (gameStatus === GameStatus.PLAY) {
      clearInterval(loop);
      loop = setInterval(() => dispatch(evolve()), tick);
    }
    return () => clearInterval(loop);
  }, [tick, gameStatus, dispatch]);

  function toggleGameStatus() {
    const newStatus = gameStatus === GameStatus.PAUSED ? GameStatus.PLAY : GameStatus.PAUSED;
    dispatch(updateGameStatus(newStatus));
    if (newStatus === GameStatus.PLAY) {
      loop = setInterval(() => dispatch(evolve()), tick);
    } else {
      clearInterval(loop);
    }
  }

  return (
    <TourPopup stepID={TourStepID.Start}>
      <button className="button button--lg" onClick={toggleGameStatus}>
        <span>{gameStatus === GameStatus.PAUSED ? 'Start' : 'Pause'}</span>
        {gameStatus === GameStatus.PAUSED ? (
          <PlayIcon className="button__icon" fill="currentColor" />
        ) : (
          <PauseIcon className="button__icon" fill="currentColor" />
        )}
      </button>
    </TourPopup>
  );
}
