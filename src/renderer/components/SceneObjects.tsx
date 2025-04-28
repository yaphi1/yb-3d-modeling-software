import { useCallback, useContext, useEffect, useRef } from 'react';
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
  const { isPressed } = useEditorControls();
  const { deleteSceneObject, duplicateSceneObject } = useSceneObjectUpdaters();
  const { setEditingStateToDefault } = useEditorStateHelpers();
  const { selectedObjectId } = editorState;
  const { camera, size } = useThree();
  const isDuplicating = useRef(false);
  const { setEditingStateToMove } = useEditorStateHelpers();
  const { storeSnapshotOfObjectAndMouse } = useSceneObjectUpdaters();

  const track2DPositionOfActive3DObject = useCallback(() => {
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

  useEffect(track2DPositionOfActive3DObject, [track2DPositionOfActive3DObject]);

  const listenForDelete = useCallback(() => {
    const shouldDelete = isPressed.DELETE && selectedObjectId;
    if (shouldDelete) {
      const idToDelete = selectedObjectId;
      setEditingStateToDefault({ keepSelection: false });
      deleteSceneObject({ id: idToDelete });
    }
  }, [
    isPressed.DELETE,
    selectedObjectId,
    setEditingStateToDefault,
    deleteSceneObject,
  ]);

  useEffect(listenForDelete, [listenForDelete]);

  const listenForDuplicate = useCallback(() => {
    const activeObject = getActiveObject();

    // todo: Figure out why D press doesn't register if shift is held
    // const isKeyComboPressed = isPressed.D && isPressed.SHIFT;
    const isKeyComboPressed = isPressed.D;

    const shouldDuplicate =
      !isDuplicating.current && isKeyComboPressed && activeObject;

    if (shouldDuplicate) {
      isDuplicating.current = true;
      duplicateSceneObject(activeObject);

      storeSnapshotOfObjectAndMouse({ editorRefs, sceneObject: activeObject });
      setEditingStateToMove();
    }

    if (!isKeyComboPressed) {
      isDuplicating.current = false;
    }
  }, [
    isPressed.D,
    getActiveObject,
    duplicateSceneObject,
    editorRefs,
    setEditingStateToMove,
    storeSnapshotOfObjectAndMouse,
  ]);

  useEffect(listenForDuplicate, [listenForDuplicate]);

  return (
    <>
      {sceneObjects.map((sceneObject) => (
        <Shape key={sceneObject.id} shapeProps={sceneObject} />
      ))}
    </>
  );
}
