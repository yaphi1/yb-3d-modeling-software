import { useCallback, useContext, useMemo } from 'react';
import { produce } from 'immer';
import { SceneObjectsContext } from '../contexts/SceneObjectsContext';

export function MaterialEditor() {
  const { getActiveObject, setSceneObjects } = useContext(SceneObjectsContext);
  const activeObject = useMemo(getActiveObject, [getActiveObject]);

  const changeColor = useCallback(
    (color: string) => {
      setSceneObjects(
        produce((draft) => {
          const activeObjectDraft = getActiveObject(draft)!;
          activeObjectDraft.color = color;
        }),
      );
    },
    [setSceneObjects, getActiveObject],
  );

  const changeMetalness = useCallback(
    (metalness: number) => {
      setSceneObjects(
        produce((draft) => {
          const activeObjectDraft = getActiveObject(draft)!;
          activeObjectDraft.metalness = metalness;
        }),
      );
    },
    [setSceneObjects, getActiveObject],
  );

  const changeRoughness = useCallback(
    (roughness: number) => {
      setSceneObjects(
        produce((draft) => {
          const activeObjectDraft = getActiveObject(draft)!;
          activeObjectDraft.roughness = roughness;
        }),
      );
    },
    [setSceneObjects, getActiveObject],
  );

  return (
    activeObject && (
      <div
        style={{
          position: 'fixed',
          right: 0,
          bottom: 0,
          padding: '10px',
          backgroundColor: '#333',
          color: '#fff',
        }}
      >
        <div>
          Color:{' '}
          <input
            type="color"
            value={activeObject.color}
            onChange={(e) => {
              changeColor(e.target.value);
            }}
            onKeyDown={(e) => {
              e.stopPropagation();
            }}
          />
        </div>
        <div>
          Metalness:{' '}
          <input
            type="number"
            value={activeObject.metalness}
            min={0}
            max={1}
            step={0.1}
            onChange={(e) => {
              changeMetalness(parseFloat(e.target.value));
            }}
            onKeyDown={(e) => {
              e.stopPropagation();
            }}
          />
        </div>
        <div>
          Roughness:{' '}
          <input
            type="number"
            value={activeObject.roughness}
            min={0}
            max={1}
            step={0.1}
            onChange={(e) => {
              changeRoughness(parseFloat(e.target.value));
            }}
            onKeyDown={(e) => {
              e.stopPropagation();
            }}
          />
        </div>
      </div>
    )
  );
}
