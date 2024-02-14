import type { Settings } from '@/entities/settings';
import type { IPattern } from '@/entities/pattern';

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
  selectedPattern: IPattern | null;
  iterationsCount: number;
  gameStatus: GameStatus;
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
  applyPattern: (payload: { pattern: IPattern; coords: Coords }) => void;
};
