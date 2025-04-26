import { createContext, Dispatch, SetStateAction } from 'react';

export const EDITING_STATES = {
  DEFAULT: 'DEFAULT',
  MOVE: 'MOVE',
  SCALE: 'SCALE',
} as const;

type EditingStatesType = keyof typeof EDITING_STATES;

export type EditorState = {
  selectedObjectId: string | null;
  /**
   * Since all these 3d objects are all in one canvas,
   * normal event methods don't work.
   * That's why we need to handle propagation manually.
   */
  shouldStopPropagation: boolean;
  editingState: EditingStatesType;
};

export const defaultEditorState: EditorState = {
  selectedObjectId: null,
  shouldStopPropagation: false,
  editingState: EDITING_STATES.DEFAULT,
};

export const EditorStateContext = createContext<{
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
}>({
  editorState: defaultEditorState,
  setEditorState: () => {},
});
