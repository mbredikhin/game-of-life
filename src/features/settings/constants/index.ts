import { TSettings } from "../types";

export const DEFAULT_SETTINGS: TSettings = {
  tick: 1 * 1000,
  grid: {
    width: 32,
    height: 24,
  },
} as const;

export const MAX_GRID_SIZE: TSettings["grid"] = {
  height: 64,
  width: 64,
} as const;
