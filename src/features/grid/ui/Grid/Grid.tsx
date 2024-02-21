import { useEffect } from 'react';

import {
  applyPattern,
  Brush,
  Cell,
  Coords,
  evolve,
  GameStatus,
  updateGameStatus,
  updateGridCell,
} from '@/entities/grid';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';

import styles from './Grid.module.scss';

let timeoutID: number | undefined;
let brush: Brush = {
  active: false,
  fill: false,
};

export function Grid() {
  const tick = useAppSelector((state) => state.settings.tick);
  const gridSettings = useAppSelector((state) => state.settings.grid);
  const selectedPattern = useAppSelector((state) => state.gridState.selectedPattern);
  const gameStatus = useAppSelector((state) => state.gridState.gameStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (gameStatus === GameStatus.PLAY) {
      timeoutID = setInterval(() => dispatch(evolve()), tick);
    } else {
      clearInterval(timeoutID);
    }
    return () => {
      clearInterval(timeoutID);
    };
  }, [gameStatus, tick, dispatch]);

  function changeCell(coords: Coords, isPopulated: boolean) {
    if (gameStatus === GameStatus.PLAY) {
      dispatch(updateGameStatus(GameStatus.PAUSED));
    }
    dispatch(updateGridCell({ coords, value: isPopulated }));
  }

  function onCellClick(coords: Coords, isPopulated: boolean) {
    if (selectedPattern) {
      dispatch(applyPattern({ pattern: selectedPattern, coords }));
    } else {
      changeCell(coords, !isPopulated);
    }
  }

  function onCellMouseEnter(coords: Coords, isPopulated: boolean) {
    if (brush.active) {
      changeCell(coords, brush.fill);
    }
  }

  function onCellMouseDown(coords: Coords, isPopulated: boolean) {
    brush = { active: true, fill: !isPopulated };
  }

  function onCellMouseUp(coords: Coords, isPopulated: boolean) {
    brush = { active: false, fill: false };
  }

  return (
    <div className={styles['container']}>
      <div className={styles['grid']}>
        {Array.from({ length: gridSettings.height }).map((_, y) => (
          <div key={y} className={styles.row}>
            {Array.from({ length: gridSettings.width }).map((_, x) => (
              <Cell
                key={`${y}:${x}`}
                coords={{ x, y }}
                onMouseDown={onCellMouseDown}
                onMouseUp={onCellMouseUp}
                onMouseEnter={onCellMouseEnter}
                onClick={onCellClick}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
