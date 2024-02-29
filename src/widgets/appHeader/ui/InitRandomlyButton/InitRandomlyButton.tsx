import { BeakerIcon } from '@heroicons/react/24/solid';

import { initGridRandomly } from '@/entities/grid';
import { useAppDispatch } from '@/shared/hooks';

export function InitRandomlyButton() {
  const dispatch = useAppDispatch();

  function initRandomly() {
    dispatch(initGridRandomly());
  }

  return (
    <button className="button" onClick={initRandomly}>
      <BeakerIcon className="button__icon" />
    </button>
  );
}
