import { useEffect, useState } from 'react';

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

export function Grid() {
  const tick = useAppSelector((state) => state.settings.tick);
  const grid = useAppSelector((state) => state.gridState.grid);
  const selectedPattern = useAppSelector((state) => state.gridState.selectedPattern);
  const gameStatus = useAppSelector((state) => state.gridState.gameStatus);
  const dispatch = useAppDispatch();
  const [brush, setBrush] = useState<Brush>({
    active: false,
    fill: false,
  });

  useEffect(() => {
    if (gameStatus === GameStatus.PLAY) {
      timeoutID = setTimeout(() => dispatch(evolve()), tick);
    } else {
      clearTimeout(timeoutID);
    }
    return () => {
      clearTimeout(timeoutID);
    };
  }, [grid, gameStatus, tick, dispatch]);

  function changeCell(value: boolean, coords: Coords) {
    if (gameStatus === GameStatus.PLAY) {
      dispatch(updateGameStatus(GameStatus.PAUSED));
    } else {
      dispatch(updateGridCell({ value, coords }));
    }
  }

  function onCellClick(value: boolean, coords: Coords) {
    if (selectedPattern) {
      dispatch(applyPattern({ pattern: selectedPattern, coords }));
    } else {
      changeCell(value, coords);
    }
  }

  function onGridMouseDown(target: EventTarget) {
    const { x, y } = (target as HTMLDivElement).dataset;
    if (x !== undefined && y !== undefined) {
      setBrush({ active: true, fill: !grid[+y][+x] });
    }
  }

  function onGridMouseUp() {
    setBrush({ active: false, fill: false });
  }

  function onCellMouseEnter(coords: Coords) {
    changeCell(brush.fill, coords);
  }

  return (
    <div className={styles['container']}>
      <div
        className={styles['grid']}
        onMouseDown={({ target }) => onGridMouseDown(target)}
        onMouseUp={onGridMouseUp}
      >
        {grid.map((row, y) => (
          <div key={y} className={styles.row}>
            {row.map((cell, x) => (
              <Cell
                key={`${y}:${x}`}
                coords={{ x, y }}
                isPopulated={cell}
                onMouseEnter={brush.active ? onCellMouseEnter : () => {}}
                onClick={() => onCellClick(!cell, { x, y })}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
