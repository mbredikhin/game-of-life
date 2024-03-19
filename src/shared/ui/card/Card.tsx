import classnames from 'classnames/bind';

import styles from './Card.module.scss';
const cx = classnames.bind(styles);

interface CardProps {
  title?: JSX.Element | string;
  body?: JSX.Element | string;
  footer?: JSX.Element | string;
}

export function Card({ title, body, footer }: CardProps) {
  return (
    <div className={cx(['card'])}>
      {title ? <div className={cx(['card__title'])}>{title}</div> : null}
      {body ? <div className={cx(['card__body'])}>{body}</div> : null}
      {footer ? <div className={cx(['card__footer'])}>{footer}</div> : null}
    </div>
  );
}