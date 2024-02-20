import { InformationCircleIcon } from '@heroicons/react/24/solid';

import { Menu } from '@/shared/ui';

import styles from './Instruction.module.scss';

const activator = (
  <button className="button">
    <InformationCircleIcon className="button__icon" />
  </button>
);
const content = (
  <>
    <span className={styles['instruction__title']}>How to start?</span>
    <p>
      The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square
      cells, each of which is in one of two possible states, live or dead (or populated and
      unpopulated, respectively). Every cell interacts with its eight neighbours, which are the
      cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the
      following transitions occur:
    </p>
    <ol>
      <li>1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
      <li>2. Any live cell with two or three live neighbours lives on to the next generation.</li>
      <li>3. Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
      <li>
        4. Any dead cell with exactly three live neighbours becomes a live cell, as if by
        reproduction.
      </li>
    </ol>
    <p>
      These rules, which compare the behaviour of the automaton to real life, can be condensed into
      the following:
    </p>
    <ol>
      <li>1. Any live cell with two or three live neighbours survives.</li>
      <li>2. Any dead cell with three live neighbours becomes a live cell.</li>
      <li>
        3. All other live cells die in the next generation. Similarly, all other dead cells stay
        dead.
      </li>
    </ol>
    <p>
      The initial pattern constitutes the seed of the system. The first generation is created by
      applying the above rules simultaneously to every cell in the seed, live or dead; births and
      deaths occur simultaneously, and the discrete moment at which this happens is sometimes called
      a tick. Each generation is a pure function of the preceding one. The rules continue to be
      applied repeatedly to create further generations.
    </p>
  </>
);

export function Instruction() {
  return <Menu activator={activator} content={content}></Menu>;
}
