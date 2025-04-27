import { produce } from 'immer';
import { useCallback, useContext } from 'react';
import {
  AXES,
  EDITING_STATES,
  EditorContext,
  EditorState,
} from './components/contexts/EditorContext';

export function useEditorStateHelpers() {
  const { setEditorState } = useContext(EditorContext);

  const setEditingStateToDefault = useCallback(
    ({ keepSelection }: { keepSelection: boolean }) => {
      setEditorState(
        produce((draft: EditorState) => {
          draft.editingState = EDITING_STATES.DEFAULT;
          draft.chosenAxis = AXES.DEFAULT;
          if (!keepSelection) {
            draft.selectedObjectId = null;
          }
        }),
      );
    },
    [setEditorState],
  );

  const setEditingStateToMove = useCallback(() => {
    setEditorState(
      produce((draft: EditorState) => {
        draft.editingState = EDITING_STATES.MOVE;
      }),
    );
  }, [setEditorState]);

  return {
    setEditingStateToDefault,
    setEditingStateToMove,
  };
}
