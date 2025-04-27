import { KeyboardControls, KeyboardControlsEntry } from '@react-three/drei';
import { useMemo, PropsWithChildren } from 'react';

export const CONTROLS = {
  G: 'G',
  S: 'S',
  X: 'X',
  Y: 'Y',
  Z: 'Z',
  ESC: 'ESC',
  ENTER: 'ENTER',
  DELETE: 'DELETE',
} as const;

export type CONTROLS_TYPE = keyof typeof CONTROLS;

export function EditorControls({ children }: PropsWithChildren) {
  const map = useMemo<KeyboardControlsEntry<CONTROLS_TYPE>[]>(
    () => [
      { name: CONTROLS.G, keys: ['g'] },
      { name: CONTROLS.S, keys: ['s'] },
      { name: CONTROLS.X, keys: ['x'] },
      { name: CONTROLS.Y, keys: ['y'] },
      { name: CONTROLS.Z, keys: ['z'] },
      { name: CONTROLS.ESC, keys: ['Escape'] },
      { name: CONTROLS.ENTER, keys: ['Enter'] },
      { name: CONTROLS.DELETE, keys: ['Backspace'] },
    ],
    [],
  );

  return <KeyboardControls map={map}>{children}</KeyboardControls>;
}
