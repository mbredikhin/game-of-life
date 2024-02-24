import type { IPattern } from '@/entities/pattern';

export enum GameStatus {
  PLAY,
  PAUSED,
}
export type TGrid = boolean[][];
export type Coords = Record<'x' | 'y', number>;
export type Brush = Record<'active' | 'fill', boolean>;
export interface GridState {
  grid: TGrid;
  gridHasChanged: boolean;
  selectedPattern: IPattern | null;
  iterationsCount: number;
  gameStatus: GameStatus;
}
