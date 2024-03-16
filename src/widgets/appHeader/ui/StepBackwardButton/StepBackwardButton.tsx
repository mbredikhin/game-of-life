import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';

import { stepBackward } from '@/entities/grid';
import { useAppDispatch } from '@/shared/hooks';
import { Tooltip } from '@/shared/ui';

export function StepBackwardButton() {
  const dispatch = useAppDispatch();

  return (
    <Tooltip text="Step backward" position="bottom">
      <button className="button" onClick={() => dispatch(stepBackward())}>
        <ArrowUturnLeftIcon className="button__icon" />
      </button>
    </Tooltip>
  );
}
