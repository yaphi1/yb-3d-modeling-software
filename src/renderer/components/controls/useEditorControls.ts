import { useKeyboardControls } from '@react-three/drei';
import { CONTROLS_TYPE } from './EditorControls';

export function useEditorControls() {
  const isPressedG = useKeyboardControls<CONTROLS_TYPE>(state => state.G);
  const isPressedS = useKeyboardControls<CONTROLS_TYPE>(state => state.S);
  const isPressedEsc = useKeyboardControls<CONTROLS_TYPE>(state => state.ESC);

  return {
    isPressedG,
    isPressedS,
    isPressedEsc,
  };
}
