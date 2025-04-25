import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EditorGrid } from './EditorGrid';
import { Lighting } from './Lighting';
import { SceneObjects } from './SceneObjects';

export function MainView() {
  return (
    <Canvas>
      <Lighting />
      <SceneObjects />
      <EditorGrid />
      <OrbitControls />
    </Canvas>
  );
}
