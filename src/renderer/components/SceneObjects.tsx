import { useContext, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Shape } from './shapes/Shape';
import { SceneObjectsContext } from './contexts/SceneObjectsContext';
import { useEditorControls } from './controls/useEditorControls';
import { useSceneObjectUpdaters } from './useSceneObjectUpdaters';
import { EditorContext } from './contexts/EditorContext';
import { useEditorStateHelpers } from '../useEditorStateHelpers';
import { convert3DPositionTo2DCoords } from '../mathHelpers';

export function SceneObjects() {
  const { sceneObjects, getActiveObject } = useContext(SceneObjectsContext);
  const { editorState, editorRefs } = useContext(EditorContext);
  const { isPressedDelete } = useEditorControls();
  const { deleteSceneObject } = useSceneObjectUpdaters();
  const { setEditingStateToDefault } = useEditorStateHelpers();
  const { selectedObjectId } = editorState;
  const { camera, size } = useThree();

  useEffect(() => {
    const selectedObject = getActiveObject();
    if (!selectedObject) {
      return;
    }

    const coordsIn2D = convert3DPositionTo2DCoords({
      position: selectedObject.position,
      camera,
      canvasSize: size,
    });

    editorRefs.objectCoordsIn2DViewport.current = coordsIn2D;
  }, [editorRefs.objectCoordsIn2DViewport, getActiveObject, camera, size]);

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
