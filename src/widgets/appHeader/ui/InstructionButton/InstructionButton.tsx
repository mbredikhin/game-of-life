import { InformationCircleIcon } from '@heroicons/react/24/outline';

import { TourPopup, TourStepID } from '@/features/tour';
import { RouteName } from '@/shared/config';
import { Tooltip } from '@/shared/ui';

export function InstructionButton() {
  return (
    <TourPopup stepID={TourStepID.Instruction}>
      <Tooltip
        position="bottom"
        content="Open instruction"
        activator={
          <a className="button" href={RouteName.INSTRUCTION_PAGE} target="_blank">
            <InformationCircleIcon className="button__icon" />
          </a>
        }
      />
    </TourPopup>
  );
}
