import { BeakerIcon } from '@heroicons/react/24/solid';

import { initGridRandomly } from '@/entities/grid';
import { useAppDispatch } from '@/shared/hooks';
import { Tooltip } from '@/shared/ui';

export function InitRandomlyButton() {
  const dispatch = useAppDispatch();

  function initRandomly() {
    dispatch(initGridRandomly());
  }

  return (
    <Tooltip text="Init board randomly" position="bottom">
      <button className="button" onClick={initRandomly}>
        <BeakerIcon className="button__icon" />
      </button>
    </Tooltip>
  );
}
