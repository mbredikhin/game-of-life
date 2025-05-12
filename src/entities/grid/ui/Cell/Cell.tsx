import classnames from 'classnames/bind';

import { useAppSelector } from '@/shared/hooks';

import { Coords, selectGridCell } from '../../model';
import styles from './Cell.module.scss';
const cx = classnames.bind(styles);

interface CellProps {
  coords: Coords;
  zoom: number;
  onMouseDown: (coords: Coords, isPopulated: boolean) => void;
  onCellMouseEnter: (coords: Coords, isPopulated: boolean) => void;
}

export function Cell({ coords, zoom, onMouseDown, onCellMouseEnter }: CellProps) {
  const isPopulated = useAppSelector((state) => selectGridCell(state.gridState, coords));
  const edgeSize = 24 + zoom * 2;
  const style = { width: `${edgeSize}px`, height: `${edgeSize}px` };

  return (
    <div
      className={cx(['cell', isPopulated && 'cell--filled'])}
      style={style}
      onMouseDown={() => onMouseDown(coords, isPopulated)}
      onMouseEnter={() => onCellMouseEnter(coords, isPopulated)}
    ></div>
  );
}
