import { applyPattern, Brush, Cell, Coords, updateGridCell } from '@/entities/grid';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';

import styles from './Grid.module.scss';

let brush: Brush = {
  active: false,
  fill: false,
};

export function Grid() {
  const gridSettings = useAppSelector((state) => state.settings.grid);
  const selectedPattern = useAppSelector((state) => state.gridState.selectedPattern);
  const dispatch = useAppDispatch();

  function changeCell(coords: Coords, isPopulated: boolean) {
    dispatch(updateGridCell({ coords, value: isPopulated }));
  }

  function onCellClick(coords: Coords, isPopulated: boolean) {
    if (selectedPattern) {
      dispatch(applyPattern({ pattern: selectedPattern, coords }));
    } else {
      changeCell(coords, !isPopulated);
    }
  }

  function onCellMouseEnter(coords: Coords, isPopulated: boolean) {
    if (brush.active) {
      changeCell(coords, brush.fill);
    }
  }

  function onCellMouseDown(coords: Coords, isPopulated: boolean) {
    brush = { active: true, fill: !isPopulated };
  }

  function onCellMouseUp(coords: Coords, isPopulated: boolean) {
    brush = { active: false, fill: false };
  }

  return (
    <div className={styles['grid']}>
      {Array.from({ length: gridSettings.height }).map((_, y) => (
        <div key={y} className={styles['grid__row']}>
          {Array.from({ length: gridSettings.width }).map((_, x) => (
            <Cell
              key={`${y}:${x}`}
              coords={{ x, y }}
              onMouseDown={onCellMouseDown}
              onMouseUp={onCellMouseUp}
              onMouseEnter={onCellMouseEnter}
              onClick={onCellClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
