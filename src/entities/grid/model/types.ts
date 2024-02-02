import type { Settings } from '@/entities/settings';
import { Preset } from '@/entities/preset';

export enum GameStatus {
  PLAY,
  PAUSED,
}
export type Grid = boolean[][];
export type Coords = Record<'x' | 'y', number>;
export type Brush = Record<'active' | 'fill', boolean>;
export interface GridState {
  grid: Grid;
  gridHasChanged: boolean;
  selectedPreset: Preset | null;
}
export type GridProps = {
  status: GameStatus;
  gridState: GridState;
  settings: Settings;
  iterationsCount: number;
  updateGrid: (payload: Partial<GridState>) => void;
  updateGridCell: (payload: { value: boolean; coords: Coords }) => void;
  toggleGameStatus: () => void;
  changeIterationsCount: (count: number) => void;
  applyPreset: (payload: { preset: Preset; coords: Coords }) => void;
};
