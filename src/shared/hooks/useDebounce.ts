import { useEffect, useMemo, useRef } from 'react';

import { AnyFunction, debounce, DebounceOptions } from '../lib';

export function useDebounce<F extends AnyFunction>(
  fn: F,
  delay: number,
  options?: Partial<DebounceOptions>,
) {
  const fnRef = useRef(fn);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const debouncedFn = useMemo(
    () => debounce(((...args: Parameters<F>) => fnRef.current(...args)) as F, delay, options),
    [delay, options],
  );

  useEffect(() => () => debouncedFn?.clear?.(), [debouncedFn]);

  return debouncedFn;
}
