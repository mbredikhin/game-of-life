import type { Coords } from '../../model';
import clsx from 'clsx';
import styles from './Cell.module.scss';

interface CellProps {
  isPopulated: boolean;
  coords: Coords;
  changeState: (isPopulated: boolean) => void;
  onMouseEnter: (coords: Coords) => void;
}

export function Cell({ isPopulated, coords, changeState, onMouseEnter }: CellProps) {
  return (
    <div
      data-x={coords.x}
      data-y={coords.y}
      className={clsx([styles.cell, isPopulated && styles['cell--filled']])}
      onClick={() => changeState(!isPopulated)}
      onMouseEnter={() => onMouseEnter(coords)}
    ></div>
  );
}
