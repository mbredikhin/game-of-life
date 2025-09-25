import { XMarkIcon } from '@heroicons/react/24/solid';
import classnames from 'classnames/bind';
import { ToastConfig } from '../lib';

import styles from './Toast.module.scss';
const cx = classnames.bind(styles);

interface ToastProps extends ToastConfig {
  index: number;
  onClose: () => void;
}

export function Toast({ index, text, icon, position, onClose }: ToastProps) {
  const yShift = index * 86;

  return (
    <div
      className={cx({
        'toast-wrapper': true,
        'toast-wrapper--top': position === 'top',
        'toast-wrapper--bottom': position === 'bottom',
      })}
      style={{
        [position]: `${yShift}px`,
      }}
    >
      <div
        className={cx({
          toast: true,
          'toast--top': position === 'top',
          'toast--bottom': position === 'bottom',
        })}
      >
        {icon ? <div className={cx(['toast__icon'])}>{icon}</div> : null}
        <div className={cx(['toast__text'])}>{text}</div>
        <button className={cx(['toast__close-button'])} onClick={onClose}>
          <XMarkIcon />
        </button>
      </div>
    </div>
  );
}
