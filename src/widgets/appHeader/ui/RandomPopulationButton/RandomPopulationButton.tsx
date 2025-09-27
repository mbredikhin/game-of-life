import { BeakerIcon } from '@heroicons/react/24/solid';
import { useCallback } from 'react';

import { generateRandomPopulation } from '@/entities/grid';
import { TourPopup, TourStepID } from '@/features/tour';
import { useAppDispatch, useAppSelector, useKeymap } from '@/shared/hooks';
import { Tooltip } from '@/shared/ui';

export function RandomPopulationButton() {
  const selectedPattern = useAppSelector((state) => state.gridState.selectedPattern);
  const dispatch = useAppDispatch();

  // R is used by the patterns feature when a pattern is selected
  const shortcutEnabled = !selectedPattern;

  const generate = useCallback(() => {
    dispatch(generateRandomPopulation());
  }, [dispatch]);

  useKeymap({
    ...(shortcutEnabled && {
      KeyR: generate,
    }),
  });

  const tooltipContent = (
    <span className="shortcut">Random population {shortcutEnabled && <kbd>R</kbd>}</span>
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
