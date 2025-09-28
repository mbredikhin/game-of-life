import classnames from 'classnames/bind';
import { useCallback, useEffect, useRef } from 'react';

import {
  applyPattern,
  Brush,
  Cell,
  CellState,
  Coords,
  GameStatus,
  GridState,
  updateGameStatus,
  updateGridCell,
} from '@/entities/grid';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { showToast } from '@/shared/ui';

import { patternGridToCellGrid } from '../../lib';
import styles from './Grid.module.scss';
const cx = classnames.bind(styles);

interface GridProps {
  zoom: number;
}

export function Grid({ zoom }: GridProps) {
  const brush = useRef<Brush>({ active: false, fill: false });
  const cursor = useRef<Coords>([0, 0]);
  const gridSettings = useAppSelector((state) => state.settings.grid);
  const selectedPattern = useAppSelector((state) => state.gridState.selectedPattern);
  const gameStatus = useAppSelector((state) => state.gridState.gameStatus);
  const dispatch = useAppDispatch();

  function changeCell(coords: Coords, cellState: CellState) {
    dispatch(updateGridCell({ coords, cellState }));
  }

  const drawPattern = useCallback(
    (cursorAt: Coords, pattern: Exclude<GridState['selectedPattern'], null>, isGhost: boolean) => {
      const y = cursorAt[0] - Math.floor(pattern.grid.length / 2);
      const x = cursorAt[1] - Math.floor(pattern.grid[0].length / 2);
      dispatch(
        applyPattern({
          pattern: patternGridToCellGrid(pattern.grid),
          coords: [y, x],
          isGhost,
        }),
      );
    },
    [dispatch],
  );

  function onCellMouseEnter(coords: Coords) {
    if (brush.current.active) {
      changeCell(coords, brush.current.fill ? CellState.Populated : CellState.Empty);
    }
    cursor.current = coords;
    if (selectedPattern) {
      drawPattern(cursor.current, selectedPattern, true);
    }
  }

  function onCellMouseDown(coords: Coords, cellState: CellState) {
    if (gameStatus === GameStatus.Play) {
      dispatch(updateGameStatus(GameStatus.Pause));
      showToast('Game paused');
    }
    if (selectedPattern) {
      drawPattern(coords, selectedPattern, false);
      return;
    }
    brush.current = {
      active: true,
      fill: cellState !== CellState.Populated,
    };
    changeCell(coords, brush.current.fill ? CellState.Populated : CellState.Empty);
  }

  function resetBrush() {
    brush.current = { active: false, fill: false };
  }

  useEffect(() => {
    if (selectedPattern) {
      drawPattern(cursor.current, selectedPattern, true);
    }
  }, [selectedPattern, drawPattern]);

  return (
    <div className={cx(['grid'])} onMouseUp={resetBrush} onMouseLeave={resetBrush}>
      {Array.from({ length: gridSettings.height }).map((_, y) => (
        <div key={y} className={cx(['grid__row'])}>
          {Array.from({ length: gridSettings.width }).map((_, x) => (
            <Cell
              key={`${y}:${x}`}
              zoom={zoom}
              coords={[y, x]}
              onMouseDown={onCellMouseDown}
              onMouseEnter={onCellMouseEnter}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
