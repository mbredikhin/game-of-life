import { BeakerIcon } from '@heroicons/react/24/solid';
import { useCallback, useEffect } from 'react';

import { generateRandomPopulation } from '@/entities/grid';
import { TourPopup, TourStepID } from '@/features/tour';
import { useAppDispatch } from '@/shared/hooks';
import { Tooltip } from '@/shared/ui';

export function RandomPopulationButton() {
  const dispatch = useAppDispatch();

  const generate = useCallback(() => {
    dispatch(generateRandomPopulation());
  }, [dispatch]);

  const keyboardHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'KeyR') {
        generate();
      }
    },
    [generate],
  );

  useEffect(() => {
    addEventListener('keypress', keyboardHandler);
    return () => removeEventListener('keypress', keyboardHandler);
  }, [keyboardHandler]);

  return (
    <TourPopup stepID={TourStepID.RandomPopulation}>
      <Tooltip
        position="bottom"
        content="Random population [R]"
        activator={
          <button className="button" onClick={generate}>
            <BeakerIcon className="button__icon" />
          </button>
        }
      />
    </TourPopup>
  );
}
