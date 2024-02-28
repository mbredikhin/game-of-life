export function fitNumber(value: number, range: [number, number]) {
  if (value < range[0]) {
    return range[0];
  } else if (value > range[1]) {
    return range[1];
  }
  return value;
}

export function cropMatrix<T>(
  matrix: T[][],
  yAxisCoords: [number, number],
  xAxisCoords: [number, number],
) {
  return matrix
    .slice(yAxisCoords[0], yAxisCoords[1])
    .map((row) => row.slice(xAxisCoords[0], xAxisCoords[1]));
}
