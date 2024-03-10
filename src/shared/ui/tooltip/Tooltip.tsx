import classnames from 'classnames/bind';
import { useRef } from 'react';
import { useHover } from 'usehooks-ts';

import styles from './Tooltip.module.scss';
const cx = classnames.bind(styles);

interface TooltipProps {
  text: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  children: JSX.Element;
}

export function Tooltip({ text, position = 'top', children }: TooltipProps) {
  const activator = useRef(null);
  const isHover = useHover(activator);

  return (
    <div className={cx(['tooltip'])}>
      {isHover && text ? (
        <div className={cx(['tooltip__text', `tooltip__text--${position}`])}>{text}</div>
      ) : null}
      <div className={cx(['tooltip__activator'])} ref={activator}>
        {children}
      </div>
    </div>
  );
}
