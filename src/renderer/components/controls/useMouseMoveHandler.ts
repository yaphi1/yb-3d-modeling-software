import { MouseEventHandler, useCallback, useContext } from 'react';
import { EDITING_STATES, EditorContext } from '../contexts/EditorContext';
import { useObjectMove } from './useObjectMove';

export function useMouseMoveHandler() {
  const { editorState, editorRefs } = useContext(EditorContext);
  const { moveObject } = useObjectMove();

  const onMouseMove = useCallback<MouseEventHandler<HTMLDivElement>>(
    (event) => {
      editorRefs.mousePosition.current = {
        x: event.clientX,
        y: event.clientY,
      };

      if (editorState.editingState === EDITING_STATES.MOVE) {
        moveObject();
      }
    },
    [editorRefs, editorState, moveObject],
  );

  return {
    onMouseMove,
  };
}
