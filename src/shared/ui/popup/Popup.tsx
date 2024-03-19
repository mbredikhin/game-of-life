import classnames from 'classnames/bind';

import { Card } from '../card/Card';
import styles from './Popup.module.scss';
const cx = classnames.bind(styles);

interface PopupProps {
  show: boolean;
  position?: 'top' | 'right' | 'bottom' | 'left';
  title?: JSX.Element | string;
  body?: JSX.Element | string;
  footer?: JSX.Element | string;
  children: JSX.Element;
}

export function Popup({ show, position = 'bottom', title, body, footer, children }: PopupProps) {
  return (
    <div className={cx(['popup'])}>
      {show ? (
        <div className={cx(['popup__content', `popup__content--${position}`])}>
          <Card title={title} body={body} footer={footer}></Card>
        </div>
      ) : null}
      <div>{children}</div>
    </div>
  );
}
