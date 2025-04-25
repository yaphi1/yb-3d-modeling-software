import { createContext, Dispatch, SetStateAction, useState } from 'react';

type EditorState = {
  selectedObjectId: string | null;
  /**
   * Since all these 3d objects are all in one canvas,
   * normal event methods don't work.
   * That's why we need to handle propagation manually.
   */
  shouldStopPropagation: boolean;
};

const defaultEditorState: EditorState = {
  selectedObjectId: null,
  shouldStopPropagation: false,
};

export const EditorStateContext = createContext<{
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
}>({
  editorState: defaultEditorState,
  setEditorState: () => {},
});

export function useEditorContext() {
  const [editorState, setEditorState] =
    useState<EditorState>(defaultEditorState);

  return { editorState, setEditorState };
}
