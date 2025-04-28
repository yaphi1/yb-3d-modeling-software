import { KeyboardControlsEntry, useKeyboardControls } from '@react-three/drei';

export const CONTROLS = {
  G: 'G',
  S: 'S',
  R: 'R',
  D: 'D',
  X: 'X',
  Y: 'Y',
  Z: 'Z',
  ESC: 'ESC',
  ENTER: 'ENTER',
  DELETE: 'DELETE',
} as const;

export type CONTROLS_TYPE = keyof typeof CONTROLS;

export const keyMap: KeyboardControlsEntry<CONTROLS_TYPE>[] = [
  { name: CONTROLS.G, keys: ['g'] },
  { name: CONTROLS.S, keys: ['s'] },
  { name: CONTROLS.R, keys: ['r'] },
  { name: CONTROLS.D, keys: ['d'] },
  { name: CONTROLS.X, keys: ['x'] },
  { name: CONTROLS.Y, keys: ['y'] },
  { name: CONTROLS.Z, keys: ['z'] },
  { name: CONTROLS.ESC, keys: ['Escape'] },
  { name: CONTROLS.ENTER, keys: ['Enter'] },
  { name: CONTROLS.DELETE, keys: ['Backspace'] },
];

export function useEditorControls() {
  const isPressed: Partial<Record<CONTROLS_TYPE, boolean>> = {};

  Object.keys(CONTROLS).forEach(control => {
    const key = control as CONTROLS_TYPE;
    isPressed[key] = useKeyboardControls<CONTROLS_TYPE>((state) => state[key]);
  });

  return { isPressed };
}
