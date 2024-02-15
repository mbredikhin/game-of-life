import { useCallback, useEffect, useState } from 'react';
import type { GridProps, Grid as TGrid, Brush, Coords } from '@/entities/grid';
import { Cell, GameStatus } from '@/entities/grid';
import styles from './Grid.module.scss';

let timeoutID: number | undefined;

export function Grid({
  status,
  iterationsCount,
  settings,
  gridState,
  toggleGameStatus,
  changeIterationsCount,
  updateGrid,
  updateGridCell,
  applyPattern,
}: GridProps) {
  const [brush, setBrush] = useState<Brush>({
    active: false,
    fill: false,
  });

  const getNewGrid = useCallback<() => [TGrid, boolean]>(() => {
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
  }, [gridState.grid]);

  const setupLoop = useCallback(
    (tick: number) => {
      timeoutID = setTimeout(() => {
        const [newGrid, gridHasChanged] = getNewGrid();
        if (!gridHasChanged) {
          toggleGameStatus();
          return;
        }
        updateGrid({ grid: newGrid, gridHasChanged });
        changeIterationsCount(iterationsCount + 1);
      }, tick);
    },
    [iterationsCount, changeIterationsCount, updateGrid, toggleGameStatus, getNewGrid],
  );

  useEffect(() => {
    if (status === GameStatus.PLAY) {
      setupLoop(settings.tick);
    } else {
      clearTimeout(timeoutID);
    }
    return () => {
      clearTimeout(timeoutID);
    };
  }, [status, settings.tick, setupLoop]);

  function changeCell(value: boolean, coords: Coords) {
    if (status === GameStatus.PLAY) {
      toggleGameStatus();
      return;
    }
    updateGridCell({ value, coords });
  }

  function onGridMouseDown(target: EventTarget) {
    const { x, y } = (target as HTMLDivElement).dataset;
    if (x !== undefined && y !== undefined) {
      setBrush({ active: true, fill: !gridState.grid[+y][+x] });
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
        {gridState.grid.map((row, y) => (
          <div key={y} className={styles.row}>
            {row.map((cell, x) => (
              <Cell
                key={`${y}:${x}`}
                coords={{ x, y }}
                isPopulated={cell}
                onMouseEnter={brush.active ? onCellMouseEnter : () => {}}
                changeState={(value) =>
                  gridState.selectedPattern
                    ? applyPattern({ pattern: gridState.selectedPattern, coords: { x, y } })
                    : changeCell(value, { x, y })
                }
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
