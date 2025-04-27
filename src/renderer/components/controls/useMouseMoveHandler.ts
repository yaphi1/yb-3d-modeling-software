import { MouseEventHandler, useCallback, useContext } from 'react';
import { EDITING_STATES, EditorContext } from '../contexts/EditorContext';
import { useObjectMove } from './useObjectMove';
import { useObjectScale } from './useObjectScale';

export function useMouseMoveHandler() {
  const { editorState, editorRefs } = useContext(EditorContext);
  const { moveObject } = useObjectMove();
  const { scaleObject } = useObjectScale();

  const onMouseMove = useCallback<MouseEventHandler<HTMLDivElement>>(
    (event) => {
      editorRefs.mousePosition.current = {
        x: event.clientX,
        y: event.clientY,
      };

      if (editorState.editingState === EDITING_STATES.MOVE) {
        moveObject();
      }
      if (editorState.editingState === EDITING_STATES.SCALE) {
        scaleObject();
      }
    },
    [editorRefs, editorState, moveObject, scaleObject],
  );

  return {
    onMouseMove,
  };
}
