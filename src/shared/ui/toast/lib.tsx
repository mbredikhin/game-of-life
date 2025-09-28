import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { RelativePosition } from '@/shared/lib';

import { Toast } from './Toast/Toast';

export interface ToastConfig {
  content: JSX.Element | string;
  icon: JSX.Element | null;
  position: Extract<RelativePosition, 'top' | 'bottom'>;
  duration: number;
}

interface IToast extends ToastConfig {
  id: number;
}

const TICK_DURATION = 100;
const TOASTS_LIMIT = 2;

const defaultToastConfig: ToastConfig = {
  content: '',
  icon: null,
  position: 'top',
  duration: 5000,
};

let toastId = 0;
const generateToastId = () => ++toastId;

export let showToast: (
  configOrText: Partial<ToastConfig> | ToastConfig['content'],
) => void = () => {
  throw new Error('<ToastRoot /> must be mounted before use.');
};

export const useToast = () => {
  const [toasts, setToasts] = useState<IToast[]>([]);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  const toastPortal = container
    ? createPortal(
        <>
          {toasts.map(({ id, ...props }, index) => (
            <Toast key={id} index={index} {...props} onClose={() => closeToast(id)} />
          ))}
        </>,
        container,
      )
    : null;

  showToast = addToast;

  function addToast(configOrContent: Partial<ToastConfig> | ToastConfig['content']) {
    const id = generateToastId();
    const toast =
      typeof configOrContent === 'string'
        ? { ...defaultToastConfig, content: configOrContent, id }
        : { ...defaultToastConfig, ...configOrContent, id };

    setToasts([...toasts, toast].slice(-TOASTS_LIMIT));
  }

  function closeToast(id: IToast['id']) {
    const newToasts = toasts.filter((toast) => toast.id !== id);
    setToasts(newToasts);
  }

  function mountToast(element: HTMLElement) {
    setContainer(element);
  }

  function countdown() {
    return +setInterval(() => {
      setToasts((toasts) =>
        toasts.reduce((acc, toast) => {
          const duration = toast.duration - TICK_DURATION;
          return duration <= 0 ? acc : [...acc, { ...toast, duration }];
        }, [] as IToast[]),
      );
    }, TICK_DURATION);
  }

  useEffect(() => {
    const countdownIntervalId = countdown();
    return () => clearInterval(countdownIntervalId);
  }, []);

  return {
    toastPortal,
    mountToast,
  };
};
