export type AnyFunction = (...args: never[]) => never | void;

export type DebouncedFn<F extends AnyFunction> = F & { clear: () => void };

export interface DebounceOptions {
  leading?: boolean;
}

let debounceId = 0;
const generateDebounceId = () => ++debounceId;

const debounceTimeouts = new Map<number, ReturnType<typeof setTimeout>>();

export const debounce = <F extends AnyFunction>(
  fn: F,
  delay: number,
  options: Partial<DebounceOptions> = {},
): DebouncedFn<F> => {
  const id = generateDebounceId();
  const { leading = false } = options;

  const clearExistingTimeout = () => {
    const timeoutId = debounceTimeouts.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    debounceTimeouts.delete(id);
  };

  const debounced = ((...args: Parameters<F>) => {
    const timeoutId = debounceTimeouts.get(id);

    if (leading && !timeoutId) {
      fn(...args);
      const newTimeoutId = setTimeout(() => debounceTimeouts.delete(id), delay);
      debounceTimeouts.set(id, newTimeoutId);
      return;
    }

    clearExistingTimeout();

    const newTimeoutId = setTimeout(() => {
      if (!leading) {
        fn(...args);
      }
      debounceTimeouts.delete(id);
    }, delay);

    debounceTimeouts.set(id, newTimeoutId);
  }) as DebouncedFn<F>;

  debounced.clear = clearExistingTimeout;

  return debounced;
};
