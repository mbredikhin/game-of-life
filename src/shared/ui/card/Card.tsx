import classnames from 'classnames/bind';

import styles from './Card.module.scss';
const cx = classnames.bind(styles);

interface CardProps {
  title?: JSX.Element | string;
  footer?: JSX.Element | string;
  children?: JSX.Element | string;
  maxWidth?: string;
}

export function Card({ title, footer, children, maxWidth }: CardProps) {
  return (
    <div className={cx(['card'])} style={{ ...(maxWidth && { maxWidth }) }}>
      {title ? <div className={cx(['card__title'])}>{title}</div> : null}
      {children ? <div className={cx(['card__body'])}>{children}</div> : null}
      {footer ? <div className={cx(['card__footer'])}>{footer}</div> : null}
    </div>
  );
}
