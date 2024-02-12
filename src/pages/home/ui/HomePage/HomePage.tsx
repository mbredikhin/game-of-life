import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import {
  GameStatus,
  updateGrid,
  updateGridCell,
  applyPreset,
  selectPreset,
  updateIterationsCount,
  updateGameStatus,
} from '@/entities/grid';
import { Grid } from '@/features/grid';
import styles from './HomePage.module.scss';

export function HomePage() {
  const settings = useAppSelector((state) => state.settings);
  const gridState = useAppSelector((state) => state.gridState);
  const dispatch = useAppDispatch();

  function toggleGameStatus() {
    const newStatus =
      gridState.gameStatus === GameStatus.PAUSED ? GameStatus.PLAY : GameStatus.PAUSED;
    dispatch(updateGameStatus(newStatus));
  }

  return (
    <div className={styles['container']}>
      <Grid
        status={gridState.gameStatus}
        iterationsCount={gridState.iterationsCount}
        settings={settings}
        gridState={gridState}
        toggleGameStatus={toggleGameStatus}
        changeIterationsCount={(payload) => dispatch(updateIterationsCount(payload))}
        updateGrid={(payload) => dispatch(updateGrid(payload))}
        updateGridCell={(payload) => dispatch(updateGridCell(payload))}
        applyPreset={(payload) => {
          dispatch(applyPreset(payload));
          dispatch(selectPreset(null));
        }}
      />
    </div>
  );
}
