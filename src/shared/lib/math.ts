export interface MatrixCropWindow {
  y: [from: number, to: number];
  x: [from: number, to: number];
}

export type MatrixTransformation = <T>(matrix: T[][]) => T[][];

// Returns submatrix cropped to the specified window of rows (y) and columns (x).
export const cropMatrix = <T>(matrix: T[][], window: MatrixCropWindow) =>
  matrix.slice(...window.y).map((row) => row.slice(...window.x));

// Rotate matrix clockwise
export const rotateMatrix: MatrixTransformation = (matrix) =>
  matrix[0].map((_, index) =>
    matrix
      .map((row) => row[index])
      .slice()
      .reverse(),
  );

// Flip matrix
export const flipMatrix: MatrixTransformation = (matrix) =>
  matrix.map((row) => row.slice().reverse());

// Merge matrix b into a at a specific position
export const assignMatrices = <T>(
  a: T[][],
  b: T[][],
  from: { y: number; x: number },
  omit: T[] = [],
) => [
  ...a.slice(0, from.y),
  ...a
    .slice(from.y, from.y + b.length)
    .map((row, y) => [
      ...row.slice(0, from.x),
      ...b[y].map((elem, x) => (omit.includes(elem) ? a[from.y + y][from.x + x] : elem)),
      ...row.slice(from.x + b[y].length),
    ]),
  ...a.slice(from.y + b.length),
];

export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max));
