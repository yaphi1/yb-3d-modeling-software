import {
  createContext,
  createRef,
  Dispatch,
  RefObject,
  SetStateAction,
} from 'react';
import { XY, XYZ } from '../shapes/shapeTypes';

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

export type EditorRefs = {
  objectPositionSnapshot: RefObject<XYZ | null>;
  mousePositionSnapshot: RefObject<XY | null>;
  mousePosition: RefObject<XY | null>;
};

export const defaultEditorState: EditorState = {
  selectedObjectId: null,
  shouldStopPropagation: false,
  editingState: EDITING_STATES.DEFAULT,
};

export const defaultEditorRefs: EditorRefs = {
  objectPositionSnapshot: createRef<XYZ>(),
  mousePositionSnapshot: createRef<XY>(),
  mousePosition: createRef<XY>(),
};

export const EditorContext = createContext<{
  editorState: EditorState;
  editorRefs: EditorRefs;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
}>({
  editorState: defaultEditorState,
  editorRefs: defaultEditorRefs,
  setEditorState: () => {},
});
