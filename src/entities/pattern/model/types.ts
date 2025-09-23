export interface PatternSource {
  name: string;
  group: string;
  data: string;
}

export interface Pattern {
  name: string;
  group: string;
  grid: boolean[][];
}
