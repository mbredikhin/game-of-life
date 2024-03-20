import classnames from 'classnames/bind';
import { useState } from 'react';

import { Card } from '../card/Card';
import styles from './Menu.module.scss';
const cx = classnames.bind(styles);

type MenuProps = {
  activator: JSX.Element;
  content: JSX.Element;
};

export function Menu({ activator, content }: MenuProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={cx(['menu'])}
      onMouseOver={() => setIsExpanded(true)}
      onMouseOut={() => setIsExpanded(false)}
    >
      {activator}
      <div className={cx(['menu__content', `menu__content--${isExpanded ? 'show' : 'hidden'}`])}>
        <Card>{content}</Card>
      </div>
    </div>
  );
}
