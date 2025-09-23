import { CellState, TGrid } from '@/entities/grid';
import { IPattern } from '@/entities/pattern';

export const patternGridToCellGrid = (patternGrid: IPattern['grid']): TGrid =>
  patternGrid.map((row) =>
    row.map((isPopulated) => (isPopulated ? CellState.Populated : CellState.Empty)),
  );
