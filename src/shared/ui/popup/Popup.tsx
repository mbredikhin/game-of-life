import classnames from 'classnames/bind';

import { RelativePosition } from '@/shared/lib';

import { Card } from '../card/Card';
import styles from './Popup.module.scss';
const cx = classnames.bind(styles);

interface PopupProps {
  show: boolean;
  position?: RelativePosition;
  title?: JSX.Element | string;
  body?: JSX.Element | string;
  footer?: JSX.Element | string;
  children: React.ReactNode;
}

export function Popup({ show, position = 'bottom', title, body, footer, children }: PopupProps) {
  return (
    <div className={cx(['popup'])}>
      {show ? (
        <div className={cx(['popup__content', `popup__content--${position}`])}>
          <Card maxWidth="340px" title={title} footer={footer}>
            {body}
          </Card>
        </div>
      ) : null}
      <div>{children}</div>
    </div>
  );
}
