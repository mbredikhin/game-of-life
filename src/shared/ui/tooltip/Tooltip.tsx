import classnames from 'classnames/bind';
import { useRef } from 'react';
import { useHover } from 'usehooks-ts';

import styles from './Tooltip.module.scss';
const cx = classnames.bind(styles);

interface TooltipProps {
  position?: 'top' | 'right' | 'bottom' | 'left';
  content: JSX.Element | string;
  activator: JSX.Element;
}

export function Tooltip({ position = 'top', content, activator }: TooltipProps) {
  const activatorRef = useRef(null);
  const isHover = useHover(activatorRef);

  return (
    <div className={cx(['tooltip'])}>
      {isHover && content ? (
        <div className={cx(['tooltip__content', `tooltip__content--${position}`])}>{content}</div>
      ) : null}
      <div className={cx(['tooltip__activator'])} ref={activatorRef}>
        {activator}
      </div>
    </div>
  );
}
