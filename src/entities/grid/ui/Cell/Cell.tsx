import clsx from 'clsx';
import type { Brush } from '@/entities/grid';
import styles from './Cell.module.scss';

interface CellProps {
  isPopulated: boolean;
  brush: Brush;
  changeState: (isPopulated: boolean) => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
}

export function Cell({ isPopulated, brush, changeState, onMouseDown, onMouseUp }: CellProps) {
  return (
    <div
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      className={clsx([styles.cell, isPopulated && styles['cell--filled']])}
      onMouseEnter={() => brush.active && changeState(brush.fill)}
      onClick={() => changeState(!isPopulated)}
    ></div>
  );
}
