import clsx from 'clsx';
import styles from './Cell.module.scss';
import type { Brush } from '../../types';

type CellProps = {
  isPopulated: boolean;
  brush: Brush;
  changeState: (isPopulated: boolean) => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
};

export const Cell = ({ isPopulated, brush, changeState, onMouseDown, onMouseUp }: CellProps) => {
  return (
    <div
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      className={clsx([styles.cell, isPopulated && styles['cell--filled']])}
      onMouseEnter={() => brush.active && changeState(brush.fill)}
      onClick={() => changeState(!isPopulated)}
    ></div>
  );
};
