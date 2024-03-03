import classnames from 'classnames/bind';

import type { IPattern } from '@/entities/pattern';

import styles from './PatternGrid.module.scss';
const cx = classnames.bind(styles);

interface PatternGridProps {
  grid: IPattern['grid'];
}

export function PatternGrid({ grid }: PatternGridProps) {
  return (
    <div className={cx(['pattern-grid'])}>
      {grid.map((row, y) => (
        <div key={y} className={cx(['pattern-grid__row'])}>
          {row.map((isPopulated, x) => (
            <div
              key={`${y}:${x}`}
              className={cx([
                'pattern-grid__cell',
                ((grid.length > 10 && grid.length <= 20) ||
                  (grid[0].length > 10 && grid[0].length <= 20)) &&
                  'pattern-grid__cell--sm',
                (grid.length > 20 || grid[0].length > 20) && 'pattern-grid__cell--xs',
                isPopulated && 'pattern-grid__cell--filled',
              ])}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
