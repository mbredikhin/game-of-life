import clsx from 'clsx';
import type { Preset as IPreset } from '@/entities/preset';
import { GameStatus } from '@/entities/grid';
import { Grid } from '@/features/grid';
import styles from './Preset.module.scss';

interface PresetProps extends IPreset {
  isSelected: boolean;
  select: () => void;
}

export function Preset({ name, grid, isSelected, select }: PresetProps) {
  const settings = {
    tick: 0,
    grid: {
      width: grid[0].length,
      height: grid.length,
    },
  };
  const gridState = {
    grid,
    gridHasChanged: false,
    selectedPreset: null,
  };
  return (
    <div className={styles['preset']}>
      <span className={styles['preset__name']}>{name}</span>
      <div className={styles['preset__grid']}>
        <Grid
          status={GameStatus.PAUSED}
          iterationsCount={0}
          settings={settings}
          gridState={gridState}
          toggleGameStatus={() => {}}
          changeIterationsCount={() => {}}
          updateGrid={() => {}}
          updateGridCell={() => {}}
          applyPreset={() => {}}
        />
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
