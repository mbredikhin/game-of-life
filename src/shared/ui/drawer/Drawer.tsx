import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useState } from 'react';

import styles from './Drawer.module.scss';

type DrawerProps = {
  activator: JSX.Element;
  content: JSX.Element;
};

export function Drawer({ activator, content }: DrawerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div onClick={() => setIsExpanded(true)}>{activator}</div>

      <div
        className={clsx(
          styles['drawer'],
          ...(isExpanded ? [styles['drawer--show']] : [styles['drawer--hidden']]),
        )}
      >
        <button onClick={() => setIsExpanded(false)} className={styles['drawer__button']}>
          <ChevronDoubleRightIcon className="button__icon button__icon--lg" />
        </button>
        <div className={styles['drawer__content']}>{content}</div>
      </div>
    </>
  );
}
