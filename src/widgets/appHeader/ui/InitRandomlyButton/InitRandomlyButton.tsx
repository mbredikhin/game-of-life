import { BeakerIcon } from '@heroicons/react/24/solid';
import { useCallback, useEffect } from 'react';

import { initGridRandomly } from '@/entities/grid';
import { TourPopup, TourStepID } from '@/features/tour';
import { useAppDispatch } from '@/shared/hooks';
import { Tooltip } from '@/shared/ui';

export function InitRandomlyButton() {
  const dispatch = useAppDispatch();

  const initRandomly = useCallback(() => {
    dispatch(initGridRandomly());
  }, [dispatch]);

  const keyboardHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'KeyR') {
        initRandomly();
      }
    },
    [initRandomly],
  );

  useEffect(() => {
    addEventListener('keypress', keyboardHandler);
    return () => removeEventListener('keypress', keyboardHandler);
  }, [keyboardHandler]);

  return (
    <TourPopup stepID={TourStepID.InitRandomly}>
      <Tooltip text="Init board randomly [R]" position="bottom">
        <button className="button" onClick={initRandomly}>
          <BeakerIcon className="button__icon" />
        </button>
      </Tooltip>
    </TourPopup>
  );
}
