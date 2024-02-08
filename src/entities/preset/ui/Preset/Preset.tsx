import clsx from 'clsx';
import type { IPreset } from '@/entities/preset';
import styles from './Preset.module.scss';
import { PresetGrid } from '../PresetGrid/PresetGrid';

interface PresetProps extends IPreset {
  isSelected: boolean;
  select: () => void;
}

export function Preset({ name, grid, isSelected, select }: PresetProps) {
  return (
    <div className={styles['preset']}>
      <span className={styles['preset__name']}>{name}</span>
      <div className={styles['preset__grid']}>
        <PresetGrid grid={grid} />
      </div>
      {
        <button
          onClick={select}
          className={clsx(['button button--sm', ...(isSelected ? [] : ['button--outlined'])])}
        >
          {isSelected ? 'Selected' : 'Select'}
        </button>
      }
    </div>
  );
}
