import { useCallback } from 'react';
import { bindStorage } from '../lib';

const { get, set, remove } = bindStorage(window.localStorage);

export function useStorage<K extends string>() {
  const getFromStorage = useCallback(<T>(key: K): T | null => get<T>(key), []);

  const setToStorage = useCallback(<T>(key: K, value: T) => set<T>(key, value), []);

  const removeFromStorage = useCallback((key: K) => remove(key), []);

  return { getFromStorage, setToStorage, removeFromStorage };
}
