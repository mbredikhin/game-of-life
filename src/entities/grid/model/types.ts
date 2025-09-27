export enum GameStatus {
  Play = 'play',
  Pause = 'pause',
}

export type Coords = [y: number, x: number];

export type Brush = Record<'active' | 'fill', boolean>;

export enum CellState {
  Empty,
  Populated,
  Ghost,
}

export type TGrid = CellState[][];

// List of cells which state has been changed
export type GridDiff = Coords[];

export interface GridState {
  grid: TGrid;
  gridDiffStack: GridDiff[];
  selectedPattern: {
    id: number;
    grid: boolean[][];
  } | null;
  generation: number;
  gameStatus: GameStatus;
}
