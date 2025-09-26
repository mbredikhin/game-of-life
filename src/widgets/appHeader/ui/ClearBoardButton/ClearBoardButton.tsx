import { useCallback, useEffect } from 'react';

import ClearIcon from '@/app/assets/images/clear.svg?react';
import { resetGrid } from '@/entities/grid';
import { TourPopup, TourStepID } from '@/features/tour';
import { useAppDispatch, useAppSelector, useKeymap } from '@/shared/hooks';
import { Tooltip } from '@/shared/ui';

export function ClearBoardButton() {
  const gridSettings = useAppSelector((state) => state.settings.grid);
  const dispatch = useAppDispatch();

  const clearGrid = useCallback(() => dispatch(resetGrid(gridSettings)), [gridSettings, dispatch]);

  useKeymap({
    KeyC: clearGrid,
  });

  useEffect(() => {
    dispatch(resetGrid(gridSettings));
  }, [gridSettings, dispatch]);

  const tooltipContent = (
    <span className="shortcut">
      Clear board <kbd>C</kbd>
    </span>
  );

  return (
    <TourPopup stepID={TourStepID.ClearBoard}>
      <Tooltip
        position="bottom"
        content={tooltipContent}
        activator={
          <button className="button" onClick={() => dispatch(resetGrid(gridSettings))}>
            <ClearIcon className="button__icon" fill="currentColor" />
          </button>
        }
      />
    </TourPopup>
  );
}
