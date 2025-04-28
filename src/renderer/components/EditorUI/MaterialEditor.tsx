import { useCallback, useContext, useMemo } from 'react';
import { produce } from 'immer';
import { SceneObjectsContext } from '../contexts/SceneObjectsContext';

export function MaterialEditor() {
  const { getActiveObject, setSceneObjects } = useContext(SceneObjectsContext);
  const activeObject = useMemo(getActiveObject, [getActiveObject]);

  const changeColor = useCallback(() => {
    setSceneObjects(
      produce((draft) => {
        const activeObjectDraft = getActiveObject(draft)!;
        activeObjectDraft.color = 'gold';
      }),
    );
  }, [setSceneObjects, getActiveObject]);

  return (
    activeObject && (
      <div
        style={{
          position: 'fixed',
          right: 0,
          bottom: 0,
          padding: '10px',
          backgroundColor: '#333',
        }}
      >
        <button type="button" onClick={changeColor}>
          Change Color
        </button>
      </div>
    )
  );
}
