import clsx from 'clsx';

import type { IPattern } from '@/entities/pattern';

import { PatternGrid } from '../PatternGrid/PatternGrid';
import styles from './Pattern.module.scss';

interface PatternProps extends IPattern {
  isSelected: boolean;
  select: () => void;
}

export function Pattern({ name, grid, isSelected, select }: PatternProps) {
  return (
    <div className={styles['pattern']}>
      <div>
        <span className={styles['pattern__name']}>
          {name}
          <button
            onClick={select}
            className={clsx(['button button--sm', isSelected && 'button--outlined', 'w-20'])}
          >
            {isSelected ? 'Selected' : 'Select'}
          </button>
        </span>
      </div>
      <div className={styles['pattern__grid']}>
        <PatternGrid grid={grid} />
      </div>
    </div>
  );
}
