import clsx from 'clsx';

import { useAppSelector } from '@/shared/hooks';

import { Coords, selectGridCell } from '../../model';
import styles from './Cell.module.scss';

interface CellProps {
  coords: Coords;
  size: 'sm' | 'md' | 'lg';
  onMouseDown: (coords: Coords, isPopulated: boolean) => void;
  onMouseUp: (coords: Coords, isPopulated: boolean) => void;
  onMouseEnter: (coords: Coords, isPopulated: boolean) => void;
  onClick: (coords: Coords, isPopulated: boolean) => void;
}

export function Cell({ coords, size, onMouseDown, onMouseUp, onMouseEnter, onClick }: CellProps) {
  const isPopulated = useAppSelector((state) => selectGridCell(state.gridState, coords));

  return (
    <div
      className={clsx([
        styles.cell,
        styles[`cell--${size}`],
        isPopulated && styles['cell--filled'],
      ])}
      onMouseDown={() => onMouseDown(coords, isPopulated)}
      onMouseUp={() => onMouseUp(coords, isPopulated)}
      onMouseEnter={() => onMouseEnter(coords, isPopulated)}
      onClick={() => onClick(coords, isPopulated)}
    ></div>
  );
}
