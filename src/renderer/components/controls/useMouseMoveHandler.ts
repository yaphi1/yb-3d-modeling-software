import { MouseEventHandler, useCallback, useContext } from 'react';
import { EDITING_STATES, EditorStateContext } from '../contexts/EditorStateContext';

export function useMouseMoveHandler() {
  const { editorState } = useContext(EditorStateContext);

  const onMouseMove = useCallback<MouseEventHandler<HTMLDivElement>>((event) => {
    if (editorState.editingState === EDITING_STATES.MOVE) {
      editorState.selectedObjectId

      console.log({
        x: event.clientX,
        y: event.clientY,
      });

      // get object by id
    }
  }, [editorState.editingState]);

  return {
    onMouseMove
  };
}
