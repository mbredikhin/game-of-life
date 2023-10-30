import { useRef, useState } from 'react';
import styles from './Menu.module.scss';

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
      {isExpanded ? (
        <div className={styles['menu__content']} ref={contentRef}>
          {content}
        </div>
      ) : null}
    </div>
  );
};
