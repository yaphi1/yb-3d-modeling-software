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
  ROTATE: 'ROTATE',
} as const;
type EditingStatesType = keyof typeof EDITING_STATES;

export const AXES = {
  DEFAULT: 'DEFAULT',
  x: 'x',
  y: 'y',
  z: 'z',
} as const;
export type AxesType = keyof typeof AXES;

export type EditorState = {
  selectedObjectId: string | null;
  editingState: EditingStatesType;
  chosenAxis: AxesType;
};

export type EditorRefs = {
  objectPositionSnapshot: RefObject<XYZ | null>;
  objectScaleSnapshot: RefObject<XYZ | null>;
  objectRotationSnapshot: RefObject<XYZ | null>;
  objectCoordsIn2DViewport: RefObject<XY | null>;
  mousePositionSnapshot: RefObject<XY | null>;
  mousePosition: RefObject<XY | null>;
};

export const defaultEditorState: EditorState = {
  selectedObjectId: null,
  editingState: EDITING_STATES.DEFAULT,
  chosenAxis: AXES.DEFAULT,
};

export const defaultEditorRefs: EditorRefs = {
  objectPositionSnapshot: createRef<XYZ>(),
  objectScaleSnapshot: createRef<XYZ>(),
  objectRotationSnapshot: createRef<XYZ>(),
  objectCoordsIn2DViewport: createRef<XY>(),
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
