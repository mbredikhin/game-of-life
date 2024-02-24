import { Board } from '@/widgets/board';

import styles from './HomePage.module.scss';

export function HomePage() {
  return (
    <div className={styles['container']}>
      <Board />
    </div>
  );
}
