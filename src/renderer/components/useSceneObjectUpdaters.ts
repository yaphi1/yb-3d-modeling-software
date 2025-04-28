import { useCallback, useContext } from 'react';
import { produce } from 'immer';
import {
  generateDuplicateObject,
  generateSceneObject,
  SceneObjects,
  SceneObjectsContext,
} from './contexts/SceneObjectsContext';
import { AllShapeProps, SHAPE_TYPE_NAMES } from './shapes/shapeTypes';
import { EditorRefs } from './contexts/EditorContext';

export function useSceneObjectUpdaters() {
  const { setSceneObjects } = useContext(SceneObjectsContext);

  const addSceneObject = useCallback(
    (sceneObjectType: SHAPE_TYPE_NAMES) => {
      setSceneObjects(
        produce((draft: SceneObjects) => {
          const newObject = generateSceneObject(sceneObjectType);
          draft.push(newObject);
        }),
      );
    },
    [setSceneObjects],
  );

  const duplicateSceneObject = useCallback(
    (sceneObject: AllShapeProps) => {
      setSceneObjects(
        produce((draft: SceneObjects) => {
          const newObject = generateDuplicateObject(sceneObject);
          draft.push(newObject);
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
    duplicateSceneObject,
    deleteSceneObject,
    storeSnapshotOfObjectAndMouse,
  };
}
