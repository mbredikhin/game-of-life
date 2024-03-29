import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

import { TourPopup, TourStepID } from '@/features/tour';
import { RouteName } from '@/shared/config';
import { Tooltip } from '@/shared/ui';

export function InstructionButton() {
  const navigate = useNavigate();

  return (
    <TourPopup stepID={TourStepID.Instruction}>
      <Tooltip text="Go to instruction" position="bottom">
        <button className="button" onClick={() => navigate(RouteName.INSTRUCTION_PAGE)}>
          <InformationCircleIcon className="button__icon" />
        </button>
      </Tooltip>
    </TourPopup>
  );
}
