import clsx from 'clsx';

import type { IPattern } from '@/entities/pattern';

import styles from './PatternGrid.module.scss';

interface PatternGridProps {
  grid: IPattern['grid'];
}

export function PatternGrid({ grid }: PatternGridProps) {
  return (
    <div className={styles['pattern-grid']}>
      {grid.map((row, y) => (
        <div key={y} className={styles['pattern-grid__row']}>
          {row.map((isPopulated, x) => (
            <div
              key={`${y}:${x}`}
              className={clsx([
                styles['pattern-grid__cell'],
                ((grid.length > 10 && grid.length <= 20) ||
                  (grid[0].length > 10 && grid[0].length <= 20)) &&
                  styles['pattern-grid__cell--sm'],
                (grid.length > 20 || grid[0].length > 20) && styles['pattern-grid__cell--xs'],
                isPopulated && styles['pattern-grid__cell--filled'],
              ])}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
