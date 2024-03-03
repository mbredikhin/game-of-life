import classnames from 'classnames/bind';

import { Board } from '@/widgets/board';

import styles from './HomePage.module.scss';
const cx = classnames.bind(styles);

export function HomePage() {
  return (
    <div className={cx(['home-page'])}>
      <Board />
    </div>
  );
}
