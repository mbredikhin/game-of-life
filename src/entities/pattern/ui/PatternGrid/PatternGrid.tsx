import classnames from 'classnames/bind';

import type { IPattern } from '@/entities/pattern';

import styles from './PatternGrid.module.scss';
import { CellState } from '@/shared/lib';
const cx = classnames.bind(styles);

interface PatternGridProps {
  grid: IPattern['grid'];
}

export function PatternGrid({ grid }: PatternGridProps) {
  const gridSize = [grid.length, grid[0].length];

  return (
    <div className={cx(['pattern-grid'])}>
      {grid.map((row, y) => (
        <div key={y} className={cx(['pattern-grid__row'])}>
          {row.map((cell, x) => (
            <div
              key={`${y}:${x}`}
              className={cx({
                'pattern-grid__cell': true,
                'pattern-grid__cell--sm': gridSize.every((dim) => dim > 10 && dim <= 20),
                'pattern-grid__cell--xs': gridSize.every((dim) => dim > 20),
                'pattern-grid__cell--populated': cell === CellState.Populated,
              })}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
