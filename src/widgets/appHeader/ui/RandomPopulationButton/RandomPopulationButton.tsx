import { BeakerIcon } from '@heroicons/react/24/solid';
import { useCallback } from 'react';

import { generateRandomPopulation } from '@/entities/grid';
import { TourPopup, TourStepID } from '@/features/tour';
import { useAppDispatch, useKeymap } from '@/shared/hooks';
import { Tooltip } from '@/shared/ui';

export function RandomPopulationButton() {
  const dispatch = useAppDispatch();

  const generate = useCallback(() => {
    dispatch(generateRandomPopulation());
  }, [dispatch]);

  useKeymap({
    KeyR: generate,
  });

  const tooltipContent = (
    <span className="shortcut">
      Random population <kbd>R</kbd>
    </span>
  );

  return (
    <TourPopup stepID={TourStepID.RandomPopulation}>
      <Tooltip
        position="bottom"
        content={tooltipContent}
        activator={
          <button className="button" onClick={generate}>
            <BeakerIcon className="button__icon" />
          </button>
        }
      />
    </TourPopup>
  );
}
