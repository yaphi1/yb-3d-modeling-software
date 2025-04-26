import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EditorGrid } from './EditorGrid';
import { Lighting } from './Lighting';
import { SceneObjects } from './SceneObjects';
import { useSelectionHelpers } from '../useSelectionHelpers';
import { useMouseMoveHandler } from './controls/useMouseMoveHandler';
import { useContext, useEffect } from 'react';
import { EditorStateContext } from './contexts/EditorStateContext';

const isDebug = true;

export function MainView() {
  const { deselectAll } = useSelectionHelpers();
  const { onMouseMove } = useMouseMoveHandler();

  const { editorState } = useContext(EditorStateContext);

  useEffect(() => {
    if (isDebug) {
      console.log(editorState);
    }
  }, [editorState]);

  return (
    <Canvas onClick={deselectAll} onMouseMove={onMouseMove}>
      <Lighting />
      <SceneObjects />
      <EditorGrid />
      <OrbitControls />
    </Canvas>
  );
}
