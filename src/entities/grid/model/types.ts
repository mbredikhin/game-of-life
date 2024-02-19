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
