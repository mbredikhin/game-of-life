// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const omitBy = <O extends Record<string, any>, K extends keyof O>(
  obj: O,
  predicate: (key: K, value: O[K]) => boolean = () => true,
): Partial<O> =>
  (Object.entries(obj) as [K, O[K]][]).reduce(
    (acc, [key, value]) => (predicate(key, value) ? acc : { ...acc, [key]: value }),
    {},
  );
