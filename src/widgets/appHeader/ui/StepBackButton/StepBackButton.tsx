import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import { useCallback, useEffect } from 'react';

import { stepBack as stepBackAction } from '@/entities/grid';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { Tooltip } from '@/shared/ui';

export function StepBackButton() {
  const gridHistory = useAppSelector((state) => state.gridState.gridHistory);
  const dispatch = useAppDispatch();

  const disabled = gridHistory.length === 0;

  const stepBack = useCallback(() => {
    dispatch(stepBackAction());
  }, [dispatch]);

  const keyboardHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'KeyB') {
        stepBack();
      }
    },
    [stepBack],
  );

  useEffect(() => {
    addEventListener('keypress', keyboardHandler);
    return () => removeEventListener('keypress', keyboardHandler);
  }, [keyboardHandler]);

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
