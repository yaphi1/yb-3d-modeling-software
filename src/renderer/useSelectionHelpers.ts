import { useCallback, useContext } from 'react';
import { produce } from 'immer';
import {
  AXES,
  EDITING_STATES,
  EditorContext,
  EditorState,
} from './components/contexts/EditorContext';

export function useSelectionHelpers() {
  const { editorState, setEditorState } = useContext(EditorContext);

  const selectShapeById = useCallback(
    (id: string | null) => {
      setEditorState(
        produce((draft: EditorState) => {
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
        produce((draft: EditorState) => {
          draft.selectedObjectId = null;
          draft.editingState = EDITING_STATES.DEFAULT;
          draft.chosenAxis = AXES.DEFAULT;
        }),
      );
    }

    setEditorState(
      produce((draft: EditorState) => {
        draft.shouldStopPropagation = false;
      }),
    );
  }, [setEditorState, editorState.shouldStopPropagation]);

  return {
    selectShapeById,
    deselectAll,
  };
}
