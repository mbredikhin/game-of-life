import type { IPattern } from '@/entities/pattern';

export enum GameStatus {
  Play = 'play',
  Pause = 'pause',
}

export type Coords = [y: number, x: number];

export type Brush = Record<'active' | 'fill', boolean>;

export type TGrid = boolean[][];

// List of cells which state has been changed
export type GridDiff = Coords[];

export interface GridState {
  grid: TGrid;
  gridDiffStack: GridDiff[];
  selectedPattern: IPattern | null;
  generation: number;
  gameStatus: GameStatus;
}
