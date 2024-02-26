import { Theme } from '../lib';

export interface Settings {
  theme: Theme;
  tick: number;
  grid: {
    width: number;
    height: number;
  };
}
