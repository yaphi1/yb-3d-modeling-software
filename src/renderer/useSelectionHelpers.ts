import { useCallback, useContext } from 'react';
import { produce } from 'immer';
import { EditorStateContext } from './useEditorContext';

export function useSelectionHelpers() {
  const { editorState, setEditorState } = useContext(EditorStateContext);

  const selectShapeById = useCallback(
    (id: string | null) => {
      console.log({ id });
      console.log('setting uuid to:', id);
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
    if (!editorState.shouldStopPropagation) {
      console.log('setting uuid to: null');
      setEditorState(
        produce((draft) => {
          draft.selectedObjectId = null;
        }),
      );
    }

    console.log('setting shouldStopPropagation to false from canvas');
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
