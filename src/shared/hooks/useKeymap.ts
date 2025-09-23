import { useCallback, useEffect } from 'react';

const MODIFIERS = ['ctrlKey', 'shiftKey', 'altKey'] as const;

type KeymapModifier = (typeof MODIFIERS)[number];

type KeymapHandler = (event: KeyboardEvent) => void;

type KeymapConfig = {
  modifiers?: KeymapModifier[];
  handler: KeymapHandler;
};

export type Keymap = Record<KeyboardEvent['code'], KeymapConfig[] | KeymapHandler>;

export function useKeymap(keymap: Keymap) {
  const onKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const keymapConfigOrHandler = keymap[event.code];
      if (!keymapConfigOrHandler) {
        return;
      }
      if (typeof keymapConfigOrHandler === 'function') {
        keymapConfigOrHandler(event);
        return;
      }
      const keymapConfig = keymapConfigOrHandler;
      const eventModifiers: KeymapModifier[] = MODIFIERS.filter((modifier) => !!event[modifier]);
      const matchedShortcuts = keymapConfig?.filter(
        ({ modifiers }) => (modifiers?.length ?? 0) === eventModifiers.length,
      );
      matchedShortcuts.forEach(({ handler }) => handler(event));
    },
    [keymap],
  );

  useEffect(() => {
    addEventListener('keypress', onKeyPress);
    return () => removeEventListener('keypress', onKeyPress);
  }, [onKeyPress]);
}
