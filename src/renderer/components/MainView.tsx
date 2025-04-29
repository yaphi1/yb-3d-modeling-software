import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useContext, useEffect, useRef } from 'react';
// @ts-expect-error - import vs require shenanigans that I don't have time to deal with
import { OrbitControls as OrbitControlsType } from 'three/examples/jsm/Addons.js';
import { EditorGrid } from './EditorGrid';
import { Lighting } from './Lighting';
import { SceneObjects } from './SceneObjects';
import { useSelectionHelpers } from '../useSelectionHelpers';
import { useMouseMoveHandler } from './controls/useMouseMoveHandler';
import { EDITING_STATES, EditorContext } from './contexts/EditorContext';
import { Axes } from './Axes';
import { useEditorStateHelpers } from '../useEditorStateHelpers';

export function MainView() {
  const { deselectAll } = useSelectionHelpers();
  const { onMouseMove } = useMouseMoveHandler();
  const { editorState, editorRefs } = useContext(EditorContext);
  const { setEditingStateToDefault } = useEditorStateHelpers();
  const cameraRef = useRef<OrbitControlsType>(null);

  const cameraDistance = cameraRef.current?.getDistance();

  useEffect(() => {
    if (cameraDistance) {
      editorRefs.cameraDistance.current = cameraDistance;
    }
  }, [editorRefs.cameraDistance, cameraDistance]);

  const isModifying = editorState.editingState !== EDITING_STATES.DEFAULT;

  return (
    <Canvas
      onMouseMove={onMouseMove}
      style={{
        cursor: isModifying ? 'move' : 'auto',
      }}
      onPointerMissed={() => {
        if (editorState.editingState === EDITING_STATES.DEFAULT) {
          deselectAll();
        } else {
          setEditingStateToDefault({ keepSelection: true });
        }
      }}
    >
      <Lighting />
      <SceneObjects />
      <EditorGrid />
      <Axes />
      <OrbitControls ref={cameraRef} makeDefault />
    </Canvas>
  );
}
