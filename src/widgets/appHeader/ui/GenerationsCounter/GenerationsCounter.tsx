import { useAppSelector } from '@/shared/hooks';

import styles from './GenerationsCounter.module.scss';

export function GenerationsCounter() {
  const generation = useAppSelector((state) => state.gridState.generation);

  return <span className={styles['generations-counter__text']}>Generation: {generation}</span>;
}
