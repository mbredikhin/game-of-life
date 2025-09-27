import { CellState, Coords, TGrid } from './model';

export const getNeighboursCount = ([y, x]: Coords, grid: TGrid): number => {
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;
  const neighboursCoords: Coords[] = [
    [y + 1, x - 1],
    [y + 1, x],
    [y + 1, x + 1],
    [y, x - 1],
    [y, x + 1],
    [y - 1, x - 1],
    [y - 1, x],
    [y - 1, x + 1],
  ];

  neighboursCoords.forEach((coords) => {
    if (coords[0] < 0) {
      coords[0] += gridHeight;
    } else if (coords[0] > gridHeight - 1) {
      coords[0] -= gridHeight;
    }
    if (coords[1] < 0) {
      coords[1] += gridWidth;
    } else if (coords[1] > gridWidth - 1) {
      coords[1] -= gridWidth;
    }
  });

  return neighboursCoords.reduce(
    (acc, [y, x]) => acc + (grid[y]?.[x] === CellState.Populated ? 1 : 0),
    0,
  );
};

export const patternGridToCellGrid = (patternGrid: boolean[][]): TGrid =>
  patternGrid.map((row) =>
    row.map((isPopulated) => (isPopulated ? CellState.Populated : CellState.Empty)),
  );
