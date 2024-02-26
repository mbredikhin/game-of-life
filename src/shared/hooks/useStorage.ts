import { useCallback } from 'react';

export function useStorage<K extends string>(storage: Storage) {
  const getFromStorage = useCallback(
    <T>(key: K): T | null => {
      const value: string | null = storage.getItem(key);
      if (value === null) {
        return null;
      }
      return JSON.parse(value);
    },
    [storage],
  );

  const setToStorage = useCallback(
    <T>(key: K, value: T) => {
      storage.setItem(key, JSON.stringify(value));
    },
    [storage],
  );

  const removeFromStorage = useCallback(
    (key: K) => {
      storage.removeItem(key);
    },
    [storage],
  );

  return { getFromStorage, setToStorage, removeFromStorage };
}
