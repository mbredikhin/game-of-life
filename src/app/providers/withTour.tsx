import { createContext, useCallback, useState } from 'react';

import { steps, TourButtonType, TourStep } from '@/features/tour';
import { useStorage } from '@/shared/hooks';

export const TourContext = createContext<{
  step: TourStep | null;
  onButtonClick: (type: TourButtonType, step: TourStep) => void;
}>({ step: null, onButtonClick: () => {} });

export enum TourStorageKey {
  IsTourFinished = 'isTourFinished',
}

// eslint-disable-next-line react/display-name
export const withTour = (component: () => JSX.Element) => () => {
  const { getFromStorage, setToStorage } = useStorage<TourStorageKey>(window.localStorage);
  const [step, setStep] = useState<TourStep | null>(
    getFromStorage(TourStorageKey.IsTourFinished) ? null : steps[0],
  );

  const goBack = useCallback((step: TourStep) => {
    const index = steps.findIndex(({ id }) => id === step.id);
    if (index > 0) {
      setStep(steps[index - 1]);
    }
  }, []);

  const goNext = useCallback((step: TourStep) => {
    const index = steps.findIndex(({ id }) => id === step.id);
    if (index < steps.length - 1) {
      setStep(steps[index + 1]);
    }
  }, []);

  const cancel = useCallback(() => {
    setStep(null);
    setToStorage(TourStorageKey.IsTourFinished, 1);
  }, [setToStorage]);

  const onButtonClick = useCallback(
    (type: TourButtonType, step: TourStep) => {
      if (type === TourButtonType.Back) {
        goBack(step);
      } else if (type === TourButtonType.Next) {
        goNext(step);
      } else {
        cancel();
      }
    },
    [goBack, goNext, cancel],
  );

  return <TourContext.Provider value={{ step, onButtonClick }}>{component()}</TourContext.Provider>;
};
