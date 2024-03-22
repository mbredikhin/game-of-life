import { BookOpenIcon } from '@heroicons/react/24/solid';
import classnames from 'classnames/bind';
import { useState } from 'react';

import { selectPattern } from '@/entities/grid';
import { decodeRLE, IPattern, Pattern, PatternSource, patternSources } from '@/entities/pattern';
import { TourPopup, TourStepID } from '@/features/tour';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { rotateMatrix } from '@/shared/lib';
import { Drawer, Tooltip } from '@/shared/ui';

import styles from './PatternsDrawer.module.scss';
const cx = classnames.bind(styles);

const patternsInitial = patternSources.reduce(
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
  const [patterns, setPatterns] = useState(patternsInitial);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const selectedPattern = useAppSelector((state) => state.gridState.selectedPattern);
  const dispatch = useAppDispatch();

  function rotatePatternGrid(pattern: IPattern) {
    if (selectedPattern?.name === pattern.name) {
      dispatch(selectPattern(null));
    }
    setPatterns({
      ...patterns,
      [pattern.group]: patterns[pattern.group].map((p) => ({
        ...p,
        ...(p.name === pattern.name ? { grid: rotateMatrix(pattern.grid) } : {}),
      })),
    });
  }

  function onSelectPattern(pattern: IPattern) {
    dispatch(selectPattern(pattern));
    setIsDrawerOpen(false);
  }

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
                rotate={rotatePatternGrid}
                select={onSelectPattern}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <TourPopup stepID={TourStepID.PatternsLibrary}>
      <Drawer activator={activator} open={isDrawerOpen} onChange={setIsDrawerOpen}>
        {content}
      </Drawer>
    </TourPopup>
  );
}
