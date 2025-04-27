import { useContext, useEffect } from 'react';
import { Shape } from './shapes/Shape';
import { SceneObjectsContext } from './contexts/SceneObjectsContext';
import { useEditorControls } from './controls/useEditorControls';
import { useSceneObjectUpdaters } from './useSceneObjectUpdaters';
import { EditorContext } from './contexts/EditorContext';
import { useEditorStateHelpers } from '../useEditorStateHelpers';

export function SceneObjects() {
  const { sceneObjects } = useContext(SceneObjectsContext);
  const { editorState } = useContext(EditorContext);
  const { isPressedDelete } = useEditorControls();
  const { deleteSceneObject } = useSceneObjectUpdaters();
  const { setEditingStateToDefault } = useEditorStateHelpers();
  const { selectedObjectId } = editorState;

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
