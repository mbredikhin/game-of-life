import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/solid';
import classnames from 'classnames/bind';
import { memo } from 'react';

import { Tooltip } from '@/shared/ui';

import { type Pattern as IPattern } from '../../model';
import { PatternGrid } from '../PatternGrid/PatternGrid';
import styles from './Pattern.module.scss';
const cx = classnames.bind(styles);

interface PatternProps extends IPattern {
  isSelected: boolean;
  select: (pattern: IPattern) => void;
  rotate: (pattern: IPattern) => void;
}

export const Pattern = memo(function Pattern({
  isSelected,
  select,
  rotate,
  ...pattern
}: PatternProps) {
  return (
    <div className={cx(['pattern'])}>
      <div className={cx(['pattern-header'])}>
        <span className={cx(['pattern-header__name'])}>{pattern.name}</span>
        <button
          onClick={() => select(pattern)}
          className={cx(['button button--sm', isSelected && 'button--outlined', 'w-20'])}
        >
          <span>{isSelected ? 'Selected' : 'Select'}</span>
        </button>
        <Tooltip text="Rotate clockwise" position="top">
          <button onClick={() => rotate(pattern)} className="button button--sm">
            <ArrowPathRoundedSquareIcon className="button__icon button__icon--sm" />
          </button>
        </Tooltip>
      </div>
      <div className={cx(['pattern__grid'])}>
        <PatternGrid grid={pattern.grid} />
      </div>
    </div>
  );
});
