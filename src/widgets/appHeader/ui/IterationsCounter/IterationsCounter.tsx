import { useAppSelector } from '@/shared/hooks';

import styles from './IterationsCounter.module.scss';

export function IterationsCounter() {
  const iterationsCount = useAppSelector((state) => state.gridState.iterationsCount);

  return <span className={styles['iterations-counter__text']}>Iteration: {iterationsCount}</span>;
}
