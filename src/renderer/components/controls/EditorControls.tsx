import { KeyboardControls, KeyboardControlsEntry } from '@react-three/drei';
import { useMemo, PropsWithChildren } from 'react';

export const CONTROLS = {
  G: 'G',
  S: 'S',
  ESC: 'ESC',
  ENTER: 'ENTER',
} as const;

export type CONTROLS_TYPE = keyof typeof CONTROLS;

export function EditorControls({ children }: PropsWithChildren) {
  const map = useMemo<KeyboardControlsEntry<CONTROLS_TYPE>[]>(
    () => [
      { name: CONTROLS.G, keys: ['g'] },
      { name: CONTROLS.S, keys: ['s'] },
      { name: CONTROLS.ESC, keys: ['Escape'] },
      { name: CONTROLS.ENTER, keys: ['Enter'] },
    ],
    [],
  );

  return <KeyboardControls map={map}>{children}</KeyboardControls>;
}
