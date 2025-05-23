import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid';
import classnames from 'classnames/bind';
import { createPortal } from 'react-dom';

import styles from './Drawer.module.scss';
const cx = classnames.bind(styles);

type DrawerProps = {
  activator: JSX.Element;
  children: JSX.Element;
  open: boolean;
  onChange: (open: boolean) => void;
};

export function Drawer({ activator, children, open, onChange }: DrawerProps) {
  return (
    <>
      <div onClick={() => onChange(true)}>{activator}</div>

      {createPortal(
        <div>
          {open ? (
            <div className={cx('drawer-backdrop')} onClick={() => onChange(false)}></div>
          ) : null}
          <div className={cx('drawer', open && ['drawer--open'])}>
            <button onClick={() => onChange(false)} className={cx(['drawer__button'])}>
              <ChevronDoubleRightIcon className="button__icon button__icon--lg" />
            </button>
            <div className={cx(['drawer__content'])}>{children}</div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
