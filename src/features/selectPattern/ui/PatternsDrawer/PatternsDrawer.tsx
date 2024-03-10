import { BookOpenIcon } from '@heroicons/react/24/solid';
import classnames from 'classnames/bind';

import { selectPattern } from '@/entities/grid';
import { decodeRLE, IPattern, Pattern, PatternSource, patternSources } from '@/entities/pattern';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { Drawer, Tooltip } from '@/shared/ui';

import styles from './PatternsDrawer.module.scss';
const cx = classnames.bind(styles);

const patterns = patternSources.reduce(
  (acc, pattern) => ({
    ...acc,
    [pattern.group]: [...(acc[pattern.group] ?? []), { ...pattern, grid: decodeRLE(pattern.data) }],
  }),
  {} as Record<PatternSource['group'], IPattern[]>,
);

const activator = (
  <Tooltip text="Patterns library" position="bottom">
    <button className="button">
      <BookOpenIcon className="button__icon" />
    </button>
  </Tooltip>
);
export function PatternsDrawer() {
  const selectedPattern = useAppSelector((state) => state.gridState.selectedPattern);
  const dispatch = useAppDispatch();

  const content = (
    <div>
      <div className={cx(['title', 'px-6 pt-6'])}>
        You can select any pattern and place it on board
      </div>
      {Object.entries(patterns).map(([group, patterns]) => (
        <div key={group}>
          <div className={cx(['subtitle', 'patterns-group__name'])}>{group}</div>
          <div className={cx(['patterns-group__list'])}>
            {patterns.map((pattern) => (
              <Pattern
                key={pattern.name}
                {...pattern}
                isSelected={Boolean(selectedPattern && selectedPattern.name === pattern.name)}
                select={() => dispatch(selectPattern(pattern))}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
  return <Drawer activator={activator} content={content}></Drawer>;
}
