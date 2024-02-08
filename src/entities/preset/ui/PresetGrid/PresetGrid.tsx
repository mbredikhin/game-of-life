import clsx from 'clsx';
import type { IPreset } from '@/entities/preset';
import styles from './PresetGrid.module.scss';

interface PresetGridProps {
  grid: IPreset['grid'];
}

export function PresetGrid({ grid }: PresetGridProps) {
  return (
    <div className={styles['preset-grid']}>
      {grid.map((row, y) => (
        <div key={y} className={styles['preset-grid__row']}>
          {row.map((isPopulated, x) => (
            <div
              key={`${y}:${x}`}
              className={clsx([
                styles['preset-grid__cell'],
                isPopulated && styles['preset-grid__cell--filled'],
              ])}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
