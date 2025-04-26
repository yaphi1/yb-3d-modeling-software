import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EditorGrid } from './EditorGrid';
import { Lighting } from './Lighting';
import { SceneObjects } from './SceneObjects';
import { useSelectionHelpers } from '../useSelectionHelpers';
import { useMouseMoveHandler } from './controls/useMouseMoveHandler';

export function MainView() {
  const { deselectAll } = useSelectionHelpers();
  const { onMouseMove } = useMouseMoveHandler();

  return (
    <Canvas onClick={deselectAll} onMouseMove={onMouseMove}>
      <Lighting />
      <SceneObjects />
      <EditorGrid />
      <OrbitControls />
    </Canvas>
  );
}
