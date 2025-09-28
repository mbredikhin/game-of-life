import { decodeRLE, IPattern, PatternSource } from '@/entities/pattern';

let patternId = 0;
const generatePatternId = () => ++patternId;

export const buildPatternGroups = (patternSources: PatternSource[]) =>
  patternSources.reduce(
    (acc, pattern) => ({
      ...acc,
      [pattern.group]: [
        ...(acc[pattern.group] ?? []),
        { ...pattern, id: generatePatternId(), grid: decodeRLE(pattern.data) },
      ],
    }),
    {} as Record<PatternSource['group'], IPattern[]>,
  );
