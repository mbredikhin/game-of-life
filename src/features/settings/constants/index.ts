import { TSettings } from "../types";

export const DEFAULT_SETTINGS: TSettings = {
  tick: 1 * 1000,
  grid: {
    width: 32,
    height: 16,
  },
};
export const MAX_GRID_SIZE: TSettings["grid"] = {
  height: 500,
  width: 500,
};
