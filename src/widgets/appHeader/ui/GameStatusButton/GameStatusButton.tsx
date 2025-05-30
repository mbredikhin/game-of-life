import { useCallback, useEffect } from 'react';

import PauseIcon from '@/app/assets/images/pause.svg?react';
import PlayIcon from '@/app/assets/images/play.svg?react';
import { evolve, GameStatus, updateGameStatus } from '@/entities/grid';
import { TourPopup, TourStepID } from '@/features/tour';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { CellState } from '@/shared/lib';

let loop: number | undefined;

export function GameStatusButton() {
  const tick = useAppSelector((state) => state.settings.tick);
  const gameStatus = useAppSelector((state) => state.gridState.gameStatus);
  const grid = useAppSelector((state) => state.gridState.grid);
  const dispatch = useAppDispatch();

  const changeGameStatus = useCallback(
    (status: GameStatus) => {
      if (grid.flat().every((cell) => cell !== CellState.Populated) && status === GameStatus.Play) {
        return;
      }
      dispatch(updateGameStatus(status));
      clearInterval(loop);
      if (status === GameStatus.Play) {
        loop = +setInterval(() => dispatch(evolve()), tick);
      }
    },
    [grid, tick, dispatch],
  );

  const keyboardHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        const status = gameStatus === GameStatus.Pause ? GameStatus.Play : GameStatus.Pause;
        changeGameStatus(status);
      }
    },
    [gameStatus, changeGameStatus],
  );

  useEffect(() => {
    addEventListener('keypress', keyboardHandler);
    return () => removeEventListener('keypress', keyboardHandler);
  }, [keyboardHandler]);

  useEffect(() => {
    if (gameStatus === GameStatus.Play) {
      clearInterval(loop);
      loop = +setInterval(() => dispatch(evolve()), tick);
    }
    return () => clearInterval(loop);
  }, [tick, gameStatus, dispatch]);

  return (
    <TourPopup stepID={TourStepID.Start}>
      <button
        className="button button--lg"
        onClick={() =>
          changeGameStatus(gameStatus === GameStatus.Pause ? GameStatus.Play : GameStatus.Pause)
        }
      >
        <span>{gameStatus === GameStatus.Pause ? 'Start' : 'Pause'}</span>
        {gameStatus === GameStatus.Pause ? (
          <PlayIcon className="button__icon" fill="currentColor" />
        ) : (
          <PauseIcon className="button__icon" fill="currentColor" />
        )}
      </button>
    </TourPopup>
  );
}
