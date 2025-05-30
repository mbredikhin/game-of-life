import classnames from 'classnames/bind';

import { useAppSelector } from '@/shared/hooks';

import { Coords, selectGridCell } from '../../model';
import styles from './Cell.module.scss';
import { CellState } from '@/shared/lib';
import { useHover } from 'usehooks-ts';
import { useRef } from 'react';
const cx = classnames.bind(styles);

interface CellProps {
  coords: Coords;
  zoom: number;
  onMouseDown: (coords: Coords, cellState: CellState) => void;
  onMouseEnter: (coords: Coords, cellState: CellState) => void;
}

export function Cell({ coords, zoom, onMouseDown, onMouseEnter }: CellProps) {
  const cellState = useAppSelector((state) => selectGridCell(state.gridState, coords));
  const selectedPattern = useAppSelector((state) => state.gridState.selectedPattern);
  const cellRef = useRef(null);
  const isHovered = useHover(cellRef);

  const edgeSize = 24 + zoom * 2;
  const style = { width: edgeSize, height: edgeSize };

  return (
    <div
      ref={cellRef}
      className={cx({
        cell: true,
        'cell--populated': cellState === CellState.Populated,
        'cell--ghost': cellState === CellState.Ghost,
        'cell--hovered': isHovered && selectedPattern === null,
      })}
      style={style}
      onMouseDown={() => onMouseDown(coords, cellState)}
      onMouseEnter={() => onMouseEnter(coords, cellState)}
    ></div>
  );
}
