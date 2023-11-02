import { GameStatus } from '@/utils/constants';
import { IGridState } from '../slice';
import { ISettings } from '@/features/settings';
import { IPreset } from '@/features/presets';

export type TGrid = boolean[][];
export type GridProps = {
  status: GameStatus;
  gridState: IGridState;
  settings: ISettings;
  iterationsCount: number;
  updateGrid: (payload: Partial<IGridState>) => void;
  updateGridCell: (payload: { value: boolean; coords: Coords }) => void;
  toggleGameStatus: () => void;
  changeIterationsCount: (count: number) => void;
  applyPreset: (payload: { preset: IPreset; coords: Coords }) => void;
};
export type Coords = Record<'x' | 'y', number>;
export type Brush = Record<'active' | 'fill', boolean>;
