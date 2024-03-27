import classnames from 'classnames/bind';

import { useAppSelector } from '@/shared/hooks';

import { Coords, selectGridCell } from '../../model';
import styles from './Cell.module.scss';
const cx = classnames.bind(styles);

interface CellProps {
  coords: Coords;
  size: 'sm' | 'md' | 'lg';
  onMouseDown: (coords: Coords, isPopulated: boolean) => void;
  onCellMouseEnter: (coords: Coords, isPopulated: boolean) => void;
}

export function Cell({ coords, size, onMouseDown, onCellMouseEnter }: CellProps) {
  const isPopulated = useAppSelector((state) => selectGridCell(state.gridState, coords));

  return (
    <div
      className={cx(['cell', `cell--${size}`, isPopulated && 'cell--filled'])}
      onMouseDown={() => onMouseDown(coords, isPopulated)}
      onMouseEnter={() => onCellMouseEnter(coords, isPopulated)}
    ></div>
  );
}
