import { useContext } from 'react';
import { produce } from 'immer';
import { v4 as generateUUID } from 'uuid';
import {
  SceneObjects,
  SceneObjectsContext,
} from './contexts/SceneObjectsContext';
import { SHAPE_TYPES } from './shapes/shapeTypes';

export function EditorUI() {
  const { setSceneObjects } = useContext(SceneObjectsContext);

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        padding: '10px',
        backgroundColor: '#333',
      }}
    >
      <button
        type="button"
        onClick={() => {
          setSceneObjects(
            produce((draft: SceneObjects) => {
              draft.push({
                id: generateUUID(),
                sceneObjectName: SHAPE_TYPES.CUBE,
                position: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
              });
            }),
          );
        }}
      >
        Add Cube
      </button>
    </div>
  );
}
