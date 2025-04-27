import { useCallback, useContext } from 'react';
import { produce } from 'immer';
import { v4 as generateUUID } from 'uuid';
import {
  SceneObjects,
  SceneObjectsContext,
} from './contexts/SceneObjectsContext';
import { SHAPE_NAMES } from './shapes/shapeTypes';

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

  return {
    addSceneObject,
    deleteSceneObject,
  };
}
