import { applyPattern, Brush, Cell, Coords, updateGridCell } from '@/entities/grid';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { fitNumber } from '@/shared/lib';

import styles from './Grid.module.scss';

interface GridProps {
  zoom: 'sm' | 'md' | 'lg';
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

  function onCellClick(coords: Coords, isPopulated: boolean) {
    if (selectedPattern) {
      dispatch(
        applyPattern({
          pattern: selectedPattern,
          coords: {
            x: coords.x - Math.floor(selectedPattern.grid[0].length / 2),
            y: coords.y - Math.floor(selectedPattern.grid.length / 2),
          },
        }),
      );
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

  function resetBrush() {
    brush = { active: false, fill: false };
  }

  return (
    <div className={styles['grid']} onMouseUp={resetBrush} onMouseLeave={resetBrush}>
      {Array.from({ length: gridSettings.height }).map((_, y) => (
        <div key={y} className={styles['grid__row']}>
          {Array.from({ length: gridSettings.width }).map((_, x) => (
            <Cell
              key={`${y}:${x}`}
              size={zoom}
              coords={{ x, y }}
              onMouseDown={onCellMouseDown}
              onMouseEnter={onCellMouseEnter}
              onClick={onCellClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
