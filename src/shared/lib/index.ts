export type RelativePosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max));

export function cropMatrix<T>(
  matrix: T[][],
  yAxisCoords: [number, number],
  xAxisCoords: [number, number],
) {
  return matrix
    .slice(yAxisCoords[0], yAxisCoords[1])
    .map((row) => row.slice(xAxisCoords[0], xAxisCoords[1]));
}

export function rotateMatrix<T>(matrix: T[][]) {
  return matrix[0].map((_, index) => matrix.map((row) => row[index]).reverse());
}
