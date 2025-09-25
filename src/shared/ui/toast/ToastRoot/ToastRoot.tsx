import { useRef } from 'react';
import { useToast } from '../lib';

export function ToastRoot() {
  const { mountToast, toastPortal } = useToast();
  const hasToastRootBeenMounted = useRef(false);

  const setRootRef = (node: HTMLDivElement | null) => {
    if (node && !hasToastRootBeenMounted.current) {
      hasToastRootBeenMounted.current = true;
      mountToast(node);
    }
  };

  return (
    <div className="toast-root" ref={setRootRef}>
      {toastPortal}
    </div>
  );
}
