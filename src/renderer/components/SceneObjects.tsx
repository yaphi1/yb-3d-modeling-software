import { useContext, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Shape } from './shapes/Shape';
import { SceneObjectsContext } from './contexts/SceneObjectsContext';
import { useEditorControls } from './controls/useEditorControls';
import { useSceneObjectUpdaters } from './useSceneObjectUpdaters';
import { EditorContext } from './contexts/EditorContext';
import { useEditorStateHelpers } from '../useEditorStateHelpers';
import { getSceneObjectById } from '../helpers';
import { convert3DPositionTo2DCoords } from '../mathHelpers';

export function SceneObjects() {
  const { sceneObjects } = useContext(SceneObjectsContext);
  const { editorState, editorRefs } = useContext(EditorContext);
  const { isPressedDelete } = useEditorControls();
  const { deleteSceneObject } = useSceneObjectUpdaters();
  const { setEditingStateToDefault } = useEditorStateHelpers();
  const { selectedObjectId } = editorState;
  const { camera, size } = useThree();

  useEffect(() => {
    const selectedObject = getSceneObjectById({
      id: selectedObjectId,
      sceneObjects,
    });
    if (!selectedObject) {
      return;
    }

    const coordsIn2D = convert3DPositionTo2DCoords({
      position: selectedObject.position,
      camera,
      canvasSize: size,
    });

    editorRefs.objectCoordsIn2DViewport.current = coordsIn2D;
  }, [
    editorState.editingState,
    editorRefs.objectCoordsIn2DViewport,
    sceneObjects,
    selectedObjectId,
    camera,
    size,
  ]);

  useEffect(() => {
    const shouldDelete = isPressedDelete && selectedObjectId;
    if (shouldDelete) {
      const idToDelete = selectedObjectId;
      setEditingStateToDefault({ keepSelection: false });
      deleteSceneObject({ id: idToDelete });
    }
  }, [
    isPressedDelete,
    selectedObjectId,
    setEditingStateToDefault,
    deleteSceneObject,
  ]);

  return (
    <>
      {sceneObjects.map((sceneObject) => (
        <Shape key={sceneObject.id} shapeProps={sceneObject} />
      ))}
    </>
  );
}
