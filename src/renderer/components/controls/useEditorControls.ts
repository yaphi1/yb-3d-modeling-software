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
  SHIFT: 'SHIFT',
} as const;

export type CONTROLS_TYPE = keyof typeof CONTROLS;

export const keyMap: KeyboardControlsEntry<CONTROLS_TYPE>[] = [
  { name: CONTROLS.G, keys: ['g', 'm'] },
  { name: CONTROLS.S, keys: ['s'] },
  { name: CONTROLS.R, keys: ['r'] },
  { name: CONTROLS.D, keys: ['d'] },
  { name: CONTROLS.X, keys: ['x'] },
  { name: CONTROLS.Y, keys: ['y'] },
  { name: CONTROLS.Z, keys: ['z'] },
  { name: CONTROLS.ESC, keys: ['Escape'] },
  { name: CONTROLS.ENTER, keys: ['Enter'] },
  { name: CONTROLS.DELETE, keys: ['Backspace'] },
  { name: CONTROLS.SHIFT, keys: ['Shift'] },
];

export function useEditorControls() {
  // isPressed is all written out because React hooks shouldn't be used in a loop
  // Reference: https://react.dev/warnings/invalid-hook-call-warning
  const isPressed: Record<CONTROLS_TYPE, boolean> = {
    G: useKeyboardControls<CONTROLS_TYPE>((state) => state.G),
    S: useKeyboardControls<CONTROLS_TYPE>((state) => state.S),
    R: useKeyboardControls<CONTROLS_TYPE>((state) => state.R),
    D: useKeyboardControls<CONTROLS_TYPE>((state) => state.D),
    X: useKeyboardControls<CONTROLS_TYPE>((state) => state.X),
    Y: useKeyboardControls<CONTROLS_TYPE>((state) => state.Y),
    Z: useKeyboardControls<CONTROLS_TYPE>((state) => state.Z),
    ESC: useKeyboardControls<CONTROLS_TYPE>((state) => state.ESC),
    ENTER: useKeyboardControls<CONTROLS_TYPE>((state) => state.ENTER),
    DELETE: useKeyboardControls<CONTROLS_TYPE>((state) => state.DELETE),
    SHIFT: useKeyboardControls<CONTROLS_TYPE>((state) => state.SHIFT),
  };

  return { isPressed };
}
