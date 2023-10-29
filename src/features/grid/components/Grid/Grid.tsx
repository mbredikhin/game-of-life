import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import type { ISettings } from '@/features/settings';
import { GameStatus } from '@/utils/constants';
import type { GridProps, TGrid, Brush, Coords } from '../../types';
import { Cell } from '../Cell';
import styles from './Grid.module.scss';
import { updateGrid, updateGridCell } from '../../slice';

export function Grid({
  status,
  iterationsCount,
  toggleGameStatus,
  changeIterationsCount,
}: GridProps) {
  const [brush, setBrush] = useState<Brush>({
    active: false,
    fill: false,
  });
  const { settings, gridState } = useAppSelector((state) => ({
    settings: state.settings,
    gridState: state.gridState,
  }));
  const dispatch = useAppDispatch();

  useEffect(() => {
    init(settings.grid);
  }, [settings.grid]);

  useEffect(() => {
    if (status === GameStatus.PLAY) {
      setTimeout(() => {
        const [newGrid, gridHasChanged] = getNewGrid();
        if (!gridHasChanged) {
          toggleGameStatus();
        }
        dispatch(updateGrid({ grid: newGrid, gridHasChanged }));
        changeIterationsCount(iterationsCount + 1);
      }, settings.tick);
    }
  }, [gridState.grid, status]);

  function init(settings: ISettings['grid']) {
    dispatch(
      updateGrid({
        grid: Array.from({ length: settings.height }).map(() =>
          Array.from({ length: settings.width }).map(() => false),
        ),
      }),
    );
  }

  function changeCell(value: boolean, coords: Coords) {
    if (status === GameStatus.PLAY) {
      toggleGameStatus();
      return;
    }
    dispatch(updateGridCell({ value, coords }));
  }

  function getNewGrid(): [TGrid, boolean] {
    let gridHasChanged = false;
    const newGrid = gridState.grid.map((row, y) =>
      row.map((cell, x) => {
        const neighboursCoords: Coords[] = [
          { x: x - 1, y: y + 1 },
          { x, y: y + 1 },
          { x: x + 1, y: y + 1 },
          { x: x - 1, y },
          { x: x + 1, y },
          { x: x - 1, y: y - 1 },
          { x, y: y - 1 },
          { x: x + 1, y: y - 1 },
        ];
        const populatedNeighbours = neighboursCoords.reduce(
          (acc, { x, y }) => (gridState.grid[y] && gridState.grid[y][x] ? [...acc, { x, y }] : acc),
          [] as Coords[],
        );
        const result = cell
          ? populatedNeighbours.length > 1 && populatedNeighbours.length < 4
          : populatedNeighbours.length === 3;
        if (result !== cell) {
          gridHasChanged = true;
        }
        return result;
      }),
    );
    return [newGrid, gridHasChanged];
  }

  return (
    <div className={styles['container']}>
      <div className={styles['grid']}>
        {gridState.grid.map((row, y) => (
          <div key={y} className={styles.row}>
            {row.map((cell, x) => (
              <Cell
                key={`${y}:${x}`}
                onMouseDown={() => setBrush({ active: true, fill: !cell })}
                onMouseUp={() => setBrush((brush) => ({ ...brush, active: false }))}
                brush={brush}
                isPopulated={cell}
                changeState={(value) => changeCell(value, { x, y })}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
