import { Grid } from '@/features/grid';

import styles from './HomePage.module.scss';

export function HomePage() {
  return (
    <div className={styles['container']}>
      <Grid />
    </div>
  );
}
