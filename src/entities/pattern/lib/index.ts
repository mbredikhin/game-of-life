export function decodeRLE(input: string) {
  const inputByLines = input.split('\n');
  const dimensions = inputByLines[0].trim().replace('x = ', '').replace('y = ', '').split(',');
  const data = inputByLines
    .slice(1)
    .map((s) => s.trim())
    .join('');
  const grid: boolean[][] = Array.from({ length: +dimensions[1] }).map(
    () => Array.from({ length: +dimensions[0] }).fill(false) as boolean[],
  );
  let repeat = 1;
  let x = 0;
  let y = 0;

  for (let index = 0; index < data.length; index++) {
    const char = data[index];
    if (char === '!') {
      break;
    } else if (char === 'b') {
      grid[y].splice(x, repeat, ...Array.from({ length: repeat }).map(() => false));
      x += repeat;
      repeat = 1;
    } else if (char === 'o') {
      grid[y].splice(x, repeat, ...Array.from({ length: repeat }).map(() => true));
      x += repeat;
      repeat = 1;
    } else if (char === '$') {
      if (repeat > 1) {
        grid.splice(
          y + 1,
          repeat - 1,
          Array.from({ length: +dimensions[0] }).map(() => false),
        );
      }
      y += repeat;
      x = 0;
      repeat = 1;
    }
    if (char.match(/[0-9]+/)) {
      repeat = data[index - 1]?.match(/[0-9]+/) ? +`${repeat}${char}` : +char;
    }
  }

  return grid;
}
