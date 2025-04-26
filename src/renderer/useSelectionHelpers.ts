import { useCallback, useContext } from 'react';
import { produce } from 'immer';
import {
  EDITING_STATES,
  EditorContext,
} from './components/contexts/EditorContext';

export function useSelectionHelpers() {
  const { editorState, setEditorState } = useContext(EditorContext);

  const selectShapeById = useCallback(
    (id: string | null) => {
      setEditorState(
        produce((draft) => {
          draft.selectedObjectId = id;
          draft.shouldStopPropagation = true;
        }),
      );
    },
    [setEditorState],
  );

  const deselectAll = useCallback(() => {
    const isClickOutsideObjects = !editorState.shouldStopPropagation;

    if (isClickOutsideObjects) {
      setEditorState(
        produce((draft) => {
          draft.selectedObjectId = null;
          draft.editingState = EDITING_STATES.DEFAULT;
        }),
      );
    }

    setEditorState(
      produce((draft) => {
        draft.shouldStopPropagation = false;
      }),
    );
  }, [setEditorState, editorState.shouldStopPropagation]);

  return {
    selectShapeById,
    deselectAll,
  };
}
