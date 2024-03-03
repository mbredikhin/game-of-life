import { BookOpenIcon } from '@heroicons/react/24/solid';
import classnames from 'classnames/bind';

import { selectPattern } from '@/entities/grid';
import { Pattern } from '@/entities/pattern';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { Drawer } from '@/shared/ui';

import { decodeRLE, patternsRLE } from '../../lib';
import styles from './PatternsDrawer.module.scss';
const cx = classnames.bind(styles);

const patterns = patternsRLE.map((pattern) => ({ ...pattern, grid: decodeRLE(pattern.data) }));

const activator = (
  <button className="button">
    <BookOpenIcon className="button__icon" />
  </button>
);
export function PatternsDrawer() {
  const selectedPattern = useAppSelector((state) => state.gridState.selectedPattern);
  const dispatch = useAppDispatch();

  const content = (
    <>
      <span className={cx(['title'])}>You can select any pattern and place it on board</span>
      <div className={cx(['patterns'])}>
        {patterns.map((pattern) => (
          <Pattern
            key={pattern.name}
            {...pattern}
            isSelected={Boolean(selectedPattern && selectedPattern.name === pattern.name)}
            select={() => dispatch(selectPattern(pattern))}
          />
        ))}
      </div>
    </>
  );
  return <Drawer activator={activator} content={content}></Drawer>;
}
