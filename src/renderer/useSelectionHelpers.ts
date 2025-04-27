import { useCallback, useContext } from 'react';
import { produce } from 'immer';
import {
  EditorContext,
  EditorState,
} from './components/contexts/EditorContext';
import { useEditorStateHelpers } from './useEditorStateHelpers';

export function useSelectionHelpers() {
  const { setEditorState } = useContext(EditorContext);
  const { setEditingStateToDefault } = useEditorStateHelpers();

  const selectShapeById = useCallback(
    (id: string | null) => {
      setEditorState(
        produce((draft: EditorState) => {
          draft.selectedObjectId = id;
        }),
      );
    },
    [setEditorState],
  );

  const deselectAll = useCallback(() => {
    setEditingStateToDefault({ keepSelection: false });
  }, [setEditingStateToDefault]);

  return {
    selectShapeById,
    deselectAll,
  };
}
