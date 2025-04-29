import { GizmoHelper, GizmoViewport, Line } from '@react-three/drei';
import { useCallback, useContext, useEffect } from 'react';
import { produce } from 'immer';
import { useEditorControls } from './controls/useEditorControls';
import {
  AXES,
  AxesType,
  EDITING_STATES,
  EditorContext,
  EditorState,
  VIEWING_MODES,
} from './contexts/EditorContext';

export function Axes() {
  const { editorState, editorRefs, setEditorState } = useContext(EditorContext);
  const { isPressed } = useEditorControls();

  const toggleAxis = useCallback(
    (axis: AxesType) => {
      setEditorState(
        produce((draft: EditorState) => {
          const isThisAxisAlreadyPicked = draft.chosenAxis === axis;
          const axisToPick = isThisAxisAlreadyPicked ? AXES.DEFAULT : axis;
          draft.chosenAxis = axisToPick;
        }),
      );
    },
    [setEditorState],
  );

  useEffect(() => {
    if (isPressed.X) {
      if (editorState.editingState !== EDITING_STATES.DEFAULT) {
        toggleAxis(AXES.x);
      }
    }
  }, [isPressed.X, editorState.editingState, toggleAxis]);

  useEffect(() => {
    if (isPressed.Y) {
      if (editorState.editingState !== EDITING_STATES.DEFAULT) {
        toggleAxis(AXES.y);
      }
    }
  }, [isPressed.Y, editorState.editingState, toggleAxis]);

  useEffect(() => {
    if (isPressed.Z) {
      if (editorState.editingState !== EDITING_STATES.DEFAULT) {
        toggleAxis(AXES.z);
      }
    }
  }, [isPressed.Z, editorState.editingState, toggleAxis]);

  const isModifyingObject = editorState.editingState !== EDITING_STATES.DEFAULT;
  const isDefaultAxis = editorState.chosenAxis === AXES.DEFAULT;
  const isDefaultZ =
    editorState.editingState === EDITING_STATES.MOVE ||
    editorState.editingState === EDITING_STATES.ROTATE;

  const isModifyingOnDefaultZ =
    isModifyingObject && isDefaultAxis && isDefaultZ;

  const shouldShowX = editorState.chosenAxis === AXES.x;
  const shouldShowY = editorState.chosenAxis === AXES.y;
  const shouldShowZ =
    editorState.chosenAxis === AXES.z || isModifyingOnDefaultZ;

  const { x, y, z } = editorRefs.objectPositionSnapshot.current ?? {
    x: 0,
    y: 0,
    z: 0,
  };

  const shouldShowGizmo =
    editorState.viewingMode !== VIEWING_MODES.MATERIAL_PREVIEW;

  return (
    <>
      {shouldShowX && (
        <Line
          points={[
            [-40, y, z],
            [40, y, z],
          ]}
          color="#a16169"
          lineWidth={2}
          depthTest={false}
        />
      )}
      {shouldShowY && (
        <Line
          points={[
            [x, -40, z],
            [x, 40, z],
          ]}
          color="#0098db"
          lineWidth={2}
          depthTest={false}
        />
      )}
      {shouldShowZ && (
        <Line
          points={[
            [x, y, -40],
            [x, y, 40],
          ]}
          color="#87a259"
          lineWidth={2}
          depthTest={false}
        />
      )}
      {shouldShowGizmo && (
        <GizmoHelper
          alignment="top-right"
          margin={[60, 100]} // (x, y)
        >
          <GizmoViewport
            axisColors={['#E34957', '#7AA038', '#4780DA']}
            labelColor="black"
            axisHeadScale={0.9}
          />
        </GizmoHelper>
      )}
    </>
  );
}
