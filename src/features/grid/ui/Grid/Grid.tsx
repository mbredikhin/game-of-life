import { useState } from 'react';

import { applyPattern, Brush, Cell, Coords, updateGridCell } from '@/entities/grid';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';

import styles from './Grid.module.scss';

let brush: Brush = {
  active: false,
  fill: false,
};
const zoomLevels = ['sm', 'md', 'lg'] as const;

export function Grid() {
  const gridSettings = useAppSelector((state) => state.settings.grid);
  const selectedPattern = useAppSelector((state) => state.gridState.selectedPattern);
  const [zoom, setZoom] = useState<'sm' | 'md' | 'lg'>('md');
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

  function changeZoom(delta: -1 | 1) {
    const currentZoomLevel = zoomLevels.findIndex((level) => level === zoom);
    const value = zoomLevels[currentZoomLevel + delta];
    if (value) {
      setZoom(value);
    }
  }

  return (
    <div className={styles['grid']}>
      {Array.from({ length: gridSettings.height }).map((_, y) => (
        <div key={y} className={styles['grid__row']}>
          {Array.from({ length: gridSettings.width }).map((_, x) => (
            <Cell
              key={`${y}:${x}`}
              size={zoom}
              coords={{ x, y }}
              onMouseDown={onCellMouseDown}
              onMouseUp={onCellMouseUp}
              onMouseEnter={onCellMouseEnter}
              onClick={onCellClick}
            />
          ))}
        </div>
      ))}
      <div className={styles['zoom-controls']}>
        <button className="button" onClick={() => changeZoom(-1)}>
          -
        </button>
        <button className="button" onClick={() => changeZoom(1)}>
          +
        </button>
      </div>
    </div>
  );
}
