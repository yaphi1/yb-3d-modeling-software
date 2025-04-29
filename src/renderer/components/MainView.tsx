import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import { useContext } from 'react';
import { EditorGrid } from './EditorGrid';
import { Lighting } from './Lighting';
import { SceneObjects } from './SceneObjects';
import { useSelectionHelpers } from '../useSelectionHelpers';
import { useMouseMoveHandler } from './controls/useMouseMoveHandler';
import {
  EDITING_STATES,
  EditorContext,
  VIEWING_MODES,
} from './contexts/EditorContext';
import { Axes } from './Axes';
import { useEditorStateHelpers } from '../useEditorStateHelpers';

export function MainView() {
  const { deselectAll } = useSelectionHelpers();
  const { onMouseMove } = useMouseMoveHandler();
  const { editorState } = useContext(EditorContext);
  const { setEditingStateToDefault } = useEditorStateHelpers();

  const isMoving = editorState.editingState === EDITING_STATES.MOVE;
  const isMaterialPreview =
    editorState.viewingMode === VIEWING_MODES.MATERIAL_PREVIEW;

  return (
    <Canvas
      onMouseMove={onMouseMove}
      style={{
        cursor: isMoving ? 'move' : 'auto',
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
      {isMaterialPreview && <Sky sunPosition={1} />}
      <SceneObjects />
      <EditorGrid />
      <Axes />
      <OrbitControls makeDefault />
    </Canvas>
  );
}
