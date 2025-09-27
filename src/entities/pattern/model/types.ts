export interface PatternSource {
  name: string;
  group: string;
  data: string;
}

export interface Pattern {
  id: number;
  name: string;
  group: string;
  grid: boolean[][];
}
