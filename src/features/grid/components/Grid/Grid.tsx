import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks';
import type { ISettings } from '@/features/settings';
import { GameStatus } from '@/utils/constants';
import type { GridProps, TGrid, Brush, Coords } from '../../types';
import { Cell } from '../Cell';
import styles from './Grid.module.scss';

export function Grid({ status, toggleGameStatus }: GridProps) {
  const [grid, setGrid] = useState<TGrid>([]);
  const [brush, setBrush] = useState<Brush>({
    active: false,
    fill: false,
  });
  const settings = useAppSelector((state) => state.settings);

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
        setGrid(newGrid);
      }, settings.tick);
    }
  }, [grid, status]);

  function init(settings: ISettings['grid']) {
    const grid: TGrid = Array.from({ length: settings.height }).map(() =>
      Array.from({ length: settings.width }).map(() => false),
    );
    setGrid(grid);
  }

  function changeCell(isPopulated: boolean, coords: Coords) {
    if (status === GameStatus.PLAY) {
      toggleGameStatus();
    }
    const row = [
      ...grid[coords.y].slice(0, coords.x),
      isPopulated,
      ...grid[coords.y].slice(coords.x + 1),
    ];
    changeRow(row, coords.y);
  }

  function changeRow(row: boolean[], index: number) {
    setGrid((grid) => [...grid.slice(0, index), row, ...grid.slice(index + 1)]);
  }

  function getNewGrid(): [TGrid, boolean] {
    let gridHasChanged = false;
    const newGrid = grid.map((row, y) =>
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
          (acc, { x, y }) => (grid[y] && grid[y][x] ? [...acc, { x, y }] : acc),
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
        {grid.map((row, y) => (
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
