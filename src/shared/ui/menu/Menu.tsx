import classnames from 'classnames/bind';
import { useRef, useState } from 'react';

import styles from './Menu.module.scss';
const cx = classnames.bind(styles);

type MenuProps = {
  activator: JSX.Element;
  content: JSX.Element;
};

export function Menu({ activator, content }: MenuProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cx(['menu'])}
      onMouseOver={() => setIsExpanded(true)}
      onMouseOut={() => setIsExpanded(false)}
    >
      {activator}
      <div
        className={cx(
          'menu__content',
          ...(isExpanded ? ['menu__content--show'] : ['menu__content--hidden']),
        )}
        ref={contentRef}
      >
        {content}
      </div>
    </div>
  );
}
