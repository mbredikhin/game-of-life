export const patternsRLE: {
  name: string;
  data: string;
}[] = [
  {
    name: 'Glider',
    data: `x = 3, y = 3
    bo$2bo$3o!`,
  },
  {
    name: 'Tumbler',
    data: `x = 9, y = 5
    bo5bob$obo3bobo$o2bobo2bo$2bo3bo2b$2b2ob2o!`,
  },
  {
    name: '101',
    data: `x = 18, y = 12
    4b2o6b2o4b$3bobo6bobo3b$3bo10bo3b$2obo10bob2o$2obobo2b2o2bobob2o$3bobo
    bo2bobobo3b$3bobobo2bobobo3b$2obobo2b2o2bobob2o$2obo10bob2o$3bo10bo3b$
    3bobo6bobo3b$4b2o6b2o!`,
  },
  {
    name: 'Pulsar',
    data: `x = 13, y = 10
    2b3o3b3o2b2$o4bobo4bo$o4bobo4bo$o4bobo4bo$2b3o3b3o2b2$2b3o3b3o2b$o4bob
    o4bo$o4bobo4bo$o4bobo4bo2$2b3o3b3o!`,
  },
  {
    name: 'Glider gun',
    data: `x = 36, y = 9
    24bo11b$22bobo11b$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o14b$2o8b
    o3bob2o4bobo11b$10bo5bo7bo11b$11bo3bo20b$12b2o!`,
  },
];

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
      y++;
      x = 0;
      repeat = 1;
    }
    if (char.match(/[0-9]+/)) {
      repeat = +char;
    }
  }

  return grid;
}
