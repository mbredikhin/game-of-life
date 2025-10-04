import { ArrowTopRightOnSquareIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

import { TourPopup, TourStepID } from '@/features/tour';
import { RouteName } from '@/shared/config';
import { Tooltip } from '@/shared/ui';

export function InstructionButton() {
  return (
    <TourPopup stepID={TourStepID.Instruction}>
      <Tooltip
        position="left"
        content={
          <div className="flex gap-2">
            Open instruction
            <ArrowTopRightOnSquareIcon width={18} />
          </div>
        }
        activator={
          <a className="button" href={RouteName.INSTRUCTION_PAGE} target="_blank" rel="noreferrer">
            <InformationCircleIcon className="button__icon" />
          </a>
        }
      />
    </TourPopup>
  );
}
