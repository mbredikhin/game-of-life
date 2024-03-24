import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import { useCallback, useEffect } from 'react';

import { stepBackward as stepBackwardAction } from '@/entities/grid';
import { useAppDispatch } from '@/shared/hooks';
import { Tooltip } from '@/shared/ui';

export function StepBackwardButton() {
  const dispatch = useAppDispatch();

  const stepBackward = useCallback(() => {
    dispatch(stepBackwardAction());
  }, [dispatch]);

  const keyboardHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'KeyB') {
        stepBackward();
      }
    },
    [stepBackward],
  );

  useEffect(() => {
    addEventListener('keypress', keyboardHandler);
    return () => removeEventListener('keypress', keyboardHandler);
  }, [keyboardHandler]);

  return (
    <Tooltip text="Step backward [B]" position="bottom">
      <button className="button" onClick={stepBackward}>
        <ArrowUturnLeftIcon className="button__icon" />
      </button>
    </Tooltip>
  );
}
