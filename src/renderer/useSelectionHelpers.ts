import { useCallback, useContext } from 'react';
import { produce } from 'immer';
import {
  EditorContext,
  EditorState,
} from './components/contexts/EditorContext';
import { useEditorStateHelpers } from './useEditorStateHelpers';

export function useSelectionHelpers() {
  const { editorState, setEditorState } = useContext(EditorContext);
  const { setEditingStateToDefault } = useEditorStateHelpers();

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
      setEditingStateToDefault({ keepSelection: false });
    }

    setEditorState(
      produce((draft: EditorState) => {
        draft.shouldStopPropagation = false;
      }),
    );
  }, [
    setEditorState,
    editorState.shouldStopPropagation,
    setEditingStateToDefault,
  ]);

  return {
    selectShapeById,
    deselectAll,
  };
}
