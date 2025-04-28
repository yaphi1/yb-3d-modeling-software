import { useKeyboardControls } from '@react-three/drei';
import { CONTROLS, CONTROLS_TYPE } from './controlKeys';

export function useEditorControls() {
  const isPressed: Partial<Record<CONTROLS_TYPE, boolean>> = {};

  Object.keys(CONTROLS).forEach(control => {
    const key = control as CONTROLS_TYPE;
    isPressed[key] = useKeyboardControls<CONTROLS_TYPE>((state) => state[key]);
  });

  return {
    isPressed
  };
}
