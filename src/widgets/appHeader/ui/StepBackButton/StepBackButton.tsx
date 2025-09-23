import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import { useCallback } from 'react';

import { stepBack as stepBackAction } from '@/entities/grid';
import { useAppDispatch, useAppSelector, useKeymap } from '@/shared/hooks';
import { Tooltip } from '@/shared/ui';

export function StepBackButton() {
  const gridDiffStack = useAppSelector((state) => state.gridState.gridDiffStack);
  const dispatch = useAppDispatch();

  const disabled = gridDiffStack.length === 0;

  const stepBack = useCallback(() => {
    dispatch(stepBackAction());
  }, [dispatch]);

  useKeymap({
    KeyB: stepBack,
  });

  return (
    <Tooltip
      position="bottom"
      content="Step back [B]"
      activator={
        <button disabled={disabled} className="button" onClick={stepBack}>
          <ArrowUturnLeftIcon className="button__icon" />
        </button>
      }
    />
  );
}
