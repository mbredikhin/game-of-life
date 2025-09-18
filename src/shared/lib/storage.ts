export function bindStorage<K extends string>(storage: Storage) {
  const get = <T>(key: K): T | null => {
    const value: string | null = storage.getItem(key);
    if (value === null) {
      return null;
    }
    return JSON.parse(value);
  };

  const set = <T>(key: K, value: T) => {
    storage.setItem(key, JSON.stringify(value));
  };

  const remove = (key: K) => {
    storage.removeItem(key);
  };

  return { get, set, remove };
}
