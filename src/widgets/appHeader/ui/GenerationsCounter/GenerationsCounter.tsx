import classnames from 'classnames/bind';

import { useAppSelector } from '@/shared/hooks';

import styles from './GenerationsCounter.module.scss';
const cx = classnames.bind(styles);

export function GenerationsCounter() {
  const generation = useAppSelector((state) => state.gridState.generation);

  return <span className={cx(['generations-counter__text'])}>Generation: {generation}</span>;
}
