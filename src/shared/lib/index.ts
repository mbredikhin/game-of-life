export * from './appearance';
export * from './math';
export * from './placement';
export * from './storage';

// TODO: Violates FSD, remove from here once patterns no longer depend on it
export enum CellState {
  Empty,
  Populated,
  Ghost,
}
