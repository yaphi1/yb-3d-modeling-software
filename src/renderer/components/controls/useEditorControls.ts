import { useKeyboardControls } from '@react-three/drei';
import { CONTROLS_TYPE } from './EditorControls';

export function useEditorControls() {
  const isPressedG = useKeyboardControls<CONTROLS_TYPE>((state) => state.G);
  const isPressedS = useKeyboardControls<CONTROLS_TYPE>((state) => state.S);
  const isPressedX = useKeyboardControls<CONTROLS_TYPE>((state) => state.X);
  const isPressedY = useKeyboardControls<CONTROLS_TYPE>((state) => state.Y);
  const isPressedZ = useKeyboardControls<CONTROLS_TYPE>((state) => state.Z);
  const isPressedEsc = useKeyboardControls<CONTROLS_TYPE>((state) => state.ESC);
  const isPressedEnter = useKeyboardControls<CONTROLS_TYPE>(
    (state) => state.ENTER,
  );
  const isPressedDelete = useKeyboardControls<CONTROLS_TYPE>(
    (state) => state.DELETE,
  );

  return {
    isPressedG,
    isPressedS,
    isPressedX,
    isPressedY,
    isPressedZ,
    isPressedEsc,
    isPressedEnter,
    isPressedDelete,
  };
}
