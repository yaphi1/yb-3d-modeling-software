import { MouseEventHandler, useCallback, useContext } from 'react';
import { produce } from 'immer';
import { EDITING_STATES, EditorContext } from '../contexts/EditorContext';
import { getSceneObjectById } from '../../helpers';
import {
  SceneObjects,
  SceneObjectsContext,
} from '../contexts/SceneObjectsContext';

export function useMouseMoveHandler() {
  const { editorState, editorRefs } = useContext(EditorContext);
  const { setSceneObjects } = useContext(SceneObjectsContext);

  const onMouseMove = useCallback<MouseEventHandler<HTMLDivElement>>(
    (event) => {
      editorRefs.mousePosition.current = {
        x: event.clientX,
        y: event.clientY,
      };

      if (editorState.editingState === EDITING_STATES.MOVE) {
        const mouseStart = editorRefs.mousePositionSnapshot?.current?.x ?? 0;
        const mouseEnd = editorRefs.mousePosition.current.x;
        const mouseDistanceHorizontal = mouseEnd - mouseStart;

        setSceneObjects(
          produce((draft: SceneObjects) => {
            const selectedObject = getSceneObjectById({
              id: editorState.selectedObjectId!,
              sceneObjects: draft,
            })!;

            const startPosition = editorRefs.objectPositionSnapshot!.current!.z;
            const distanceToMove = mouseDistanceHorizontal * 0.01;

            selectedObject.position.z = startPosition - distanceToMove;
          }),
        );
      }
    },
    [
      editorRefs.mousePosition,
      editorRefs.mousePositionSnapshot,
      editorRefs.objectPositionSnapshot,
      editorState.editingState,
      editorState.selectedObjectId,
      setSceneObjects,
    ],
  );

  return {
    onMouseMove,
  };
}
