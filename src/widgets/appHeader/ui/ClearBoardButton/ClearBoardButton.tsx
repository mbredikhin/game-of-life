import { useCallback, useEffect } from 'react';

import ClearIcon from '@/app/assets/images/clear.svg?react';
import { resetGrid } from '@/entities/grid';
import { TourPopup, TourStepID } from '@/features/tour';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { Tooltip } from '@/shared/ui';

export function ClearBoardButton() {
  const gridSettings = useAppSelector((state) => state.settings.grid);
  const dispatch = useAppDispatch();

  const keyboardHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'KeyC') {
        dispatch(resetGrid(gridSettings));
      }
    },
    [gridSettings, dispatch],
  );

  useEffect(() => {
    addEventListener('keypress', keyboardHandler);
    return () => removeEventListener('keypress', keyboardHandler);
  }, [keyboardHandler]);

  useEffect(() => {
    dispatch(resetGrid(gridSettings));
  }, [gridSettings, dispatch]);

  return (
    <TourPopup stepID={TourStepID.ClearBoard}>
      <Tooltip
        position="bottom"
        content="Clear board [C]"
        activator={
          <button className="button" onClick={() => dispatch(resetGrid(gridSettings))}>
            <ClearIcon className="button__icon" fill="currentColor" />
          </button>
        }
      />
    </TourPopup>
  );
}
