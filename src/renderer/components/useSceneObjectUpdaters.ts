import { useCallback, useContext } from 'react';
import { produce } from 'immer';
import { v4 as generateUUID } from 'uuid';
import {
  SceneObjects,
  SceneObjectsContext,
} from './contexts/SceneObjectsContext';
import { AllShapeProps, SHAPE_NAMES } from './shapes/shapeTypes';
import { EditorRefs } from './contexts/EditorContext';

export function useSceneObjectUpdaters() {
  const { setSceneObjects } = useContext(SceneObjectsContext);

  const addSceneObject = useCallback(
    (sceneObjectName: SHAPE_NAMES) => {
      setSceneObjects(
        produce((draft: SceneObjects) => {
          draft.push({
            id: generateUUID(),
            sceneObjectName,
            position: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            rotation: { x: 0, y: 0, z: 0 },
          });
        }),
      );
    },
    [setSceneObjects],
  );

  const deleteSceneObject = useCallback(
    ({ id }: { id: string }) => {
      setSceneObjects(
        produce((draft: SceneObjects) => {
          return draft.filter((sceneObject) => sceneObject.id !== id);
        }),
      );
    },
    [setSceneObjects],
  );

  const storeSnapshotOfObjectAndMouse = useCallback(
    ({
      editorRefs,
      sceneObject,
    }: {
      editorRefs: EditorRefs;
      sceneObject: AllShapeProps;
    }) => {
      editorRefs.objectPositionSnapshot.current = sceneObject.position;
      editorRefs.objectRotationSnapshot.current = sceneObject.rotation;
      editorRefs.objectScaleSnapshot.current = sceneObject.scale;
      editorRefs.mousePositionSnapshot.current = {
        ...(editorRefs.mousePosition.current ?? { x: 0, y: 0 }),
      };
    },
    [],
  );

  return {
    addSceneObject,
    deleteSceneObject,
    storeSnapshotOfObjectAndMouse,
  };
}
