import { GameStatus } from '@/utils/constants';

export type TGrid = boolean[][];
export type GridProps = {
  status: GameStatus;
  toggleGameStatus: () => void;
};
export type Coords = Record<'x' | 'y', number>;
export type Brush = Record<'active' | 'fill', boolean>;
