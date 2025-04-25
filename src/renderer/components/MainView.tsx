import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EditorGrid } from './EditorGrid';
import { Lighting } from './Lighting';
import { SceneObjects } from './SceneObjects';
import { useSelectionHelpers } from '../useSelectionHelpers';

export function MainView() {
  const { deselectAll } = useSelectionHelpers();

  return (
    <Canvas onClick={deselectAll}>
      <Lighting />
      <SceneObjects />
      <EditorGrid />
      <OrbitControls />
    </Canvas>
  );
}
