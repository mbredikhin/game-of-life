import { PatternSource } from './types';

export * from './types';

export const patternSources: PatternSource[] = [
  {
    name: 'Glider',
    group: 'spaceships',
    data: `x = 3, y = 3
    bo$2bo$3o!`,
  },
  {
    name: 'Lightweight spaceship',
    group: 'spaceships',
    data: `x = 5, y = 4
    bo2bo$o4b$o3bo$4o!`,
  },
  {
    name: 'Middleweight spaceship',
    group: 'spaceships',
    data: `x = 6, y = 5
    bo3bo$o5b$o4bo$5o$b!`,
  },
  {
    name: 'Heavyweight spaceship',
    group: 'spaceships',
    data: `x = 7, y = 5
    bo4bo$o6b$o5bo$6o$b!`,
  },
  {
    name: 'Canada goose',
    group: 'spaceships',
    data: `x = 13, y = 12
    3o10b$o9b2ob$bo6b3obo$3b2o2b2o4b$4bo8b$8bo4b$4b2o3bo3b$3bobob2o4b$3bob
    o2bob2ob$2bo4b2o4b$2b2o9b$2b2o!`,
  },
  {
    name: '117P9H3V0',
    group: 'spaceships',
    data: `x = 17, y = 29
    8bo8b$7bobo7b$6bo3bo6b$7b3o7b2$5b2o3b2o5b$2b2o3bobo3b2o2b$2b2o3bobo3b
    2o2b$2o5bobo5b2o$4b2obobob2o4b$o6bobo6bo$3b2o2bobo2b2o3b$bo2bobo3bobo
    2bob$b2o11b2ob$b2o11b2ob$4bo7bo4b$4b3o3b3o4b$6bo3bo6b$3b2obo3bob2o3b$
    5b2o3b2o5b$5bobobobo5b2$5bo2bo2bo5b$6b2ob2o6b$5b2o3b2o5b2$4bo2b3o2bo4b
    $3b11o3b$3b2obo3bob2o!`,
  },
  {
    name: 'Blinker',
    group: 'oscillators',
    data: `x = 3, y = 1
    ooo!`,
  },
  {
    name: 'Toad',
    group: 'oscillators',
    data: `x = 4, y = 2
    b3o$3o!`,
  },
  {
    name: 'Beacon',
    group: 'oscillators',
    data: `x = 4, y = 4
    2o2b$o3b$3bo$2b2o!`,
  },
  {
    name: 'Clock',
    group: 'oscillators',
    data: `x = 4, y = 4
    2bob$obob$bobo$bo!`,
  },
  {
    name: 'Tumbler',
    group: 'oscillators',
    data: `x = 9, y = 5
    bo5bob$obo3bobo$o2bobo2bo$2bo3bo2b$2b2ob2o!`,
  },
  {
    name: 'Octagon 2',
    group: 'oscillators',
    data: `x = 8, y = 8
    3b2o3b$2bo2bo2b$bo4bob$o6bo$o6bo$bo4bob$2bo2bo2b$3b2o!`,
  },
  {
    name: '112P15',
    group: 'oscillators',
    data: `x = 25, y = 25
    6bo11bo$7b2o7b2o$3bobob2o7b2obobo$2bobo15bobo$3bo17bo$2bo19bo$o9b2ob2o
    9bo$b2o8bobo8b2o$b2o6bobobobo6b2o$8bobo3bobo$6bo2bo5bo2bo$6b3o7b3o2$6b
    3o7b3o$6bo2bo5bo2bo$8bobo3bobo$b2o6bobobobo6b2o$b2o8bobo8b2o$o9b2ob2o
    9bo$2bo19bo$3bo17bo$2bobo15bobo$3bobob2o7b2obobo$7b2o7b2o$6bo11bo!`,
  },
  {
    name: '101',
    group: 'oscillators',
    data: `x = 18, y = 12
    4b2o6b2o4b$3bobo6bobo3b$3bo10bo3b$2obo10bob2o$2obobo2b2o2bobob2o$3bobo
    bo2bobobo3b$3bobobo2bobobo3b$2obobo2b2o2bobob2o$2obo10bob2o$3bo10bo3b$
    3bobo6bobo3b$4b2o6b2o!`,
  },
  {
    name: 'Pulsar',
    group: 'oscillators',
    data: `x = 13, y = 13
    2b3o3b3o2b2$o4bobo4bo$o4bobo4bo$o4bobo4bo$2b3o3b3o2b2$2b3o3b3o2b$o4bob
    o4bo$o4bobo4bo$o4bobo4bo2$2b3o3b3o!`,
  },
  {
    name: 'Two eaters',
    group: 'oscillators',
    data: `x = 9, y = 8
    2o7b$bo7b$bobo5b$2b2o5b$5b2o2b$5bobob$7bob$7b2o!`,
  },
  {
    name: 'Ants',
    group: 'wicks',
    data: `x = 44, y = 4
    2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o2b$2b2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o
    3b2o$2b2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o$2o3b2o3b2o3b2o3b2o3b2o3b2o3b
    2o3b2o!`,
  },
  {
    name: 'Hat',
    group: 'still lifes',
    data: `x = 5, y = 4
    2bo2b$bobob$bobob$2ob2o!`,
  },
  {
    name: 'Block',
    group: 'still lifes',
    data: `x = 2, y = 2
    2o$2o!`,
  },
  {
    name: 'Beehive',
    group: 'still lifes',
    data: `x = 4, y = 3
    b2ob$o2bo$b2o!`,
  },
  {
    name: 'Loaf',
    group: 'still lifes',
    data: `x = 4, y = 4
    b2o$o2bo$bobo$2bo!`,
  },
  {
    name: 'Boat',
    group: 'still lifes',
    data: `x = 3, y = 3
    2ob$obo$bo!`,
  },
  {
    name: 'Turning toads',
    group: 'wicks',
    data: `x = 37, y = 8
    15bo6bo14b$14b2o5b2o6b2o6b$6b3obobob2obobob2obobo10b$2b2obo6bobo4bobo
    4bobo2bob2o2b$o2bobo3bo18b4obo2bo$2obobo27bob2o$3bo29bo3b$3b2o27b2o!`,
  },
  {
    name: 'Gosper glider gun',
    group: 'guns',
    data: `x = 36, y = 9
    24bo11b$22bobo11b$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o14b$2o8b
    o3bob2o4bobo11b$10bo5bo7bo11b$11bo3bo20b$12b2o!`,
  },
  {
    name: 'Undecomino',
    group: 'pure glider generators',
    data: `x = 6, y = 2
    6o$5o!`,
  },
  {
    name: '4-8-12 diamond',
    group: 'pure glider generators',
    data: `x = 12, y = 9
    4b4o4b2$2b8o2b2$12o2$2b8o2b2$4b4o!`,
  },
  {
    name: 'p28 block puffer',
    group: 'puffers',
    data: `x = 29, y = 11
    10b3o3b3o$2bo6bo2bo3bo2bo6bo$b3o5bo3bobo3bo5b3o$2obo9bobo9bob2o$3o5b2o
    3bobo3b2o5b3o$b2o8bobobobo8b2o$9bobobobobobo$13bobo$11bobobobo$10b2obo
    bob2o$11bobobobo!`,
  },
  {
    name: 'Pufferfish',
    group: 'puffers',
    data: `x = 15, y = 12, rule = B3/S23
    3bo7bo$2b3o5b3o$b2o2bo3bo2b2o$3b3o3b3o2$4bo5bo$2bo2bo3bo2bo$o5bobo5bo$
    2o4bobo4b2o$6bobo$3bobo3bobo$4bo5bo!`,
  },
];
