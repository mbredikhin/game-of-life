import { useEffect } from 'react';

import ClearIcon from '@/app/assets/images/clear.svg?react';
import { resetGrid } from '@/entities/grid';
import { TourPopup, TourStepID } from '@/features/tour';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { Tooltip } from '@/shared/ui';

export function ClearBoardButton() {
  const gridSettings = useAppSelector((state) => state.settings.grid);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetGrid(gridSettings));
  }, [gridSettings, dispatch]);

  return (
    <TourPopup stepID={TourStepID.ClearBoard}>
      <Tooltip text="Clear board" position="bottom">
        <button className="button" onClick={() => dispatch(resetGrid(gridSettings))}>
          <ClearIcon className="button__icon" fill="currentColor" />
        </button>
      </Tooltip>
    </TourPopup>
  );
}
