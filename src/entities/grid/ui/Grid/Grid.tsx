import classnames from 'classnames/bind';

import { applyPattern, Brush, Cell, Coords, updateGridCell } from '@/entities/grid';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';

import styles from './Grid.module.scss';
const cx = classnames.bind(styles);

interface GridProps {
  zoom: number;
}

let brush: Brush = {
  active: false,
  fill: false,
};

export function Grid({ zoom }: GridProps) {
  const gridSettings = useAppSelector((state) => state.settings.grid);
  const selectedPattern = useAppSelector((state) => state.gridState.selectedPattern);
  const dispatch = useAppDispatch();

  function changeCell(coords: Coords, isPopulated: boolean) {
    dispatch(updateGridCell({ coords, value: isPopulated }));
  }

  function onCellMouseEnter(coords: Coords, isPopulated: boolean) {
    if (brush.active) {
      changeCell(coords, brush.fill);
    }
  }

  function onCellMouseDown(coords: Coords, isPopulated: boolean) {
    if (selectedPattern) {
      const y = coords[0] - Math.floor(selectedPattern.grid.length / 2);
      const x = coords[1] - Math.floor(selectedPattern.grid[0].length / 2);
      dispatch(
        applyPattern({
          pattern: selectedPattern,
          coords: [y, x],
        }),
      );
      return;
    }
    brush = { active: true, fill: !isPopulated };
    changeCell(coords, brush.fill);
  }

  function resetBrush() {
    brush = { active: false, fill: false };
  }

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
              onCellMouseEnter={onCellMouseEnter}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
