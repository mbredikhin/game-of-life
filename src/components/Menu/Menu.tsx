import { useRef, useState } from 'react';
import styles from './Menu.module.scss';
import clsx from 'clsx';

type MenuProps = {
  activator: JSX.Element;
  content: JSX.Element;
};

export const Menu = ({ activator, content }: MenuProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={styles['menu']}
      onMouseOver={() => setIsExpanded(true)}
      onMouseOut={() => setIsExpanded(false)}
    >
      {activator}
      <div
        className={clsx(
          styles['menu__content'],
          ...(isExpanded ? [styles['menu__content--show']] : [styles['menu__content--hidden']]),
        )}
        ref={contentRef}
      >
        {content}
      </div>
    </div>
  );
};
