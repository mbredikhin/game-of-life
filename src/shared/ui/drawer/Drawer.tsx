import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid';
import classnames from 'classnames/bind';
import { useState } from 'react';

import styles from './Drawer.module.scss';
const cx = classnames.bind(styles);

type DrawerProps = {
  activator: JSX.Element;
  content: JSX.Element;
};

export function Drawer({ activator, content }: DrawerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div onClick={() => setIsExpanded(true)}>{activator}</div>

      <div className={cx('drawer', ...(isExpanded ? ['drawer--show'] : ['drawer--hidden']))}>
        <button onClick={() => setIsExpanded(false)} className={cx(['drawer__button'])}>
          <ChevronDoubleRightIcon className="button__icon button__icon--lg" />
        </button>
        <div className={cx(['drawer__content'])}>{content}</div>
      </div>
    </>
  );
}
