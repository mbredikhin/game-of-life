import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';

import { goBackward } from '@/entities/grid';
import { useAppDispatch } from '@/shared/hooks';
import { Tooltip } from '@/shared/ui';

export function GoBackwardButton() {
  const dispatch = useAppDispatch();

  return (
    <Tooltip text="Go backward" position="bottom">
      <button className="button" onClick={() => dispatch(goBackward())}>
        <ArrowUturnLeftIcon className="button__icon" />
      </button>
    </Tooltip>
  );
}
