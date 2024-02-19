import clsx from 'clsx';

import type { Coords } from '../../model';
import styles from './Cell.module.scss';

interface CellProps {
  isPopulated: boolean;
  coords: Coords;
  onClick: () => void;
  onMouseEnter: (coords: Coords) => void;
}

export function Cell({ isPopulated, coords, onClick, onMouseEnter }: CellProps) {
  return (
    <div
      data-x={coords.x}
      data-y={coords.y}
      className={clsx([styles.cell, isPopulated && styles['cell--filled']])}
      onClick={() => onClick()}
      onMouseEnter={() => onMouseEnter(coords)}
    ></div>
  );
}
