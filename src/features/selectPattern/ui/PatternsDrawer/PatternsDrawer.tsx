import { BookOpenIcon } from '@heroicons/react/24/solid';
import classnames from 'classnames/bind';
import { useCallback, useState } from 'react';

import { selectPattern } from '@/entities/grid';
import { IPattern, Pattern, patternSources } from '@/entities/pattern';
import { TourPopup, TourStepID } from '@/features/tour';
import { useAppDispatch, useAppSelector, useKeymap } from '@/shared/hooks';
import { flipMatrix, MatrixTransformation, rotateMatrix } from '@/shared/lib';
import { Drawer, hideToast, showToast, Tooltip } from '@/shared/ui';

import { buildPatternGroups } from '../../lib';
import styles from './PatternsDrawer.module.scss';
const cx = classnames.bind(styles);

const activatorTooltipContent = (
  <span className="shortcut">
    Patterns library <kbd>L</kbd>
  </span>
);

const activator = (
  <Tooltip
    position="bottom"
    content={activatorTooltipContent}
    activator={
      <button className="button">
        <BookOpenIcon className="button__icon" />
      </button>
    }
  />
);

const groupedPatterns = buildPatternGroups(patternSources);

export function PatternsDrawer() {
  const [patterns, setPatterns] = useState(groupedPatterns);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const selectedPattern = useAppSelector((state) => state.gridState.selectedPattern);
  const dispatch = useAppDispatch();

  function onSelectPattern(pattern: IPattern) {
    dispatch(selectPattern({ id: pattern.id, grid: pattern.grid }));
    setIsDrawerOpen(false);
    const toastId = showToast({
      content: (
        <span>
          Press <kbd>R</kbd> to rotate, <kbd>F</kbd> to flip
        </span>
      ),
    });
    setTimeout(() => window.addEventListener('click', () => hideToast(toastId), { once: true }), 0);
  }

  function updatePattern(patternPayload: Partial<IPattern> & { id: number }) {
    const [group, index] = Object.entries(patterns).reduce(
      (acc, [group, patterns]) => {
        const index = patterns.findIndex(({ id }) => id === patternPayload.id);
        return index === -1 ? acc : [group, index];
      },
      ['', 0] as [string, number],
    );

    setPatterns({
      ...patterns,
      [group]: [
        ...patterns[group].slice(0, index),
        { ...patterns[group][index], ...patternPayload },
        ...patterns[group].slice(index + 1),
      ],
    });
  }

  function transform(
    pattern: Pick<IPattern, 'id' | 'grid'>,
    transformation: MatrixTransformation,
    isSelected = false,
  ) {
    const transformedPattern = { ...pattern, grid: transformation(pattern.grid) };
    if (isSelected) {
      dispatch(selectPattern(transformedPattern));
      return;
    }
    updatePattern(transformedPattern);
  }

  function rotate(pattern: Pick<IPattern, 'id' | 'grid'>, isSelected = false) {
    transform(pattern, rotateMatrix, isSelected);
  }

  function flip(pattern: Pick<IPattern, 'id' | 'grid'>, isSelected = false) {
    transform(pattern, flipMatrix, isSelected);
  }

  const toggleDrawer = useCallback(() => setIsDrawerOpen(!isDrawerOpen), [isDrawerOpen]);

  useKeymap({
    KeyL: toggleDrawer,
    ...(selectedPattern && {
      KeyR: () => rotate(selectedPattern, true),
      KeyF: () => flip(selectedPattern, true),
    }),
  });

  const content = (
    <div>
      <div className={cx(['text-3xl font-bold leading-10', 'px-6 pt-6'])}>
        You can select any pattern and place it on board
      </div>
      {Object.entries(patterns).map(([group, patterns]) => (
        <div key={group}>
          <div className={cx(['subtitle', 'patterns-group__name'])}>{group}</div>
          <div className={cx(['patterns-group__list'])}>
            {patterns.map((pattern) => (
              <Pattern
                key={pattern.id}
                {...pattern}
                isSelected={selectedPattern?.id === pattern.id}
                rotate={rotate}
                flip={flip}
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
