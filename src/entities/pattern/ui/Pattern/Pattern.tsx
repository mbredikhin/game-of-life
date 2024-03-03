import classnames from 'classnames/bind';

import type { IPattern } from '@/entities/pattern';

import { PatternGrid } from '../PatternGrid/PatternGrid';
import styles from './Pattern.module.scss';
const cx = classnames.bind(styles);

interface PatternProps extends IPattern {
  isSelected: boolean;
  select: () => void;
}

export function Pattern({ name, grid, isSelected, select }: PatternProps) {
  return (
    <div className={cx(['pattern'])}>
      <div>
        <span className={cx(['pattern__name'])}>
          {name}
          <button
            onClick={select}
            className={cx(['button button--sm', isSelected && 'button--outlined', 'w-20'])}
          >
            {isSelected ? 'Selected' : 'Select'}
          </button>
        </span>
      </div>
      <div className={cx(['pattern__grid'])}>
        <PatternGrid grid={grid} />
      </div>
    </div>
  );
}
