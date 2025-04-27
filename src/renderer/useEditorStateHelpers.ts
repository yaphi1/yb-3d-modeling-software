import { produce } from 'immer';
import { useCallback, useContext } from 'react';
import {
  AXES,
  EDITING_STATES,
  EditorContext,
  EditorState,
  VIEWING_MODES,
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

  const setEditingStateToScale = useCallback(() => {
    setEditorState(
      produce((draft: EditorState) => {
        draft.editingState = EDITING_STATES.SCALE;
      }),
    );
  }, [setEditorState]);

  const setEditingStateToRotate = useCallback(() => {
    setEditorState(
      produce((draft: EditorState) => {
        draft.editingState = EDITING_STATES.ROTATE;
      }),
    );
  }, [setEditorState]);

  const setViewingModeToWireframe = useCallback(() => {
    setEditorState(
      produce((draft: EditorState) => {
        draft.viewingMode = VIEWING_MODES.WIREFRAME;
      }),
    );
  }, [setEditorState]);

  const setViewingModeToSolid = useCallback(() => {
    setEditorState(
      produce((draft: EditorState) => {
        draft.viewingMode = VIEWING_MODES.SOLID;
      }),
    );
  }, [setEditorState]);

  const setViewingModeToMaterialPreview = useCallback(() => {
    setEditorState(
      produce((draft: EditorState) => {
        draft.viewingMode = VIEWING_MODES.MATERIAL_PREVIEW;
      }),
    );
  }, [setEditorState]);

  return {
    setEditingStateToDefault,
    setEditingStateToMove,
    setEditingStateToScale,
    setEditingStateToRotate,
    setViewingModeToWireframe,
    setViewingModeToSolid,
    setViewingModeToMaterialPreview,
  };
}
