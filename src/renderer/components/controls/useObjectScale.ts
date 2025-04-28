import { useCallback, useContext } from 'react';
import { produce } from 'immer';
import { AXES, EDITING_STATES, EditorContext } from '../contexts/EditorContext';
import {
  SceneObjects,
  SceneObjectsContext,
} from '../contexts/SceneObjectsContext';
import { useEditorControls } from './useEditorControls';
import { useEditorStateHelpers } from '../../useEditorStateHelpers';
import { getDistance2d } from '../../mathHelpers';
import { useSceneObjectUpdaters } from '../useSceneObjectUpdaters';

export function useObjectScale() {
  const { editorState, editorRefs } = useContext(EditorContext);
  const { setSceneObjects, getActiveObject } = useContext(SceneObjectsContext);
  const { isPressed } = useEditorControls();
  const { setEditingStateToScale } = useEditorStateHelpers();
  const { storeSnapshotOfObjectAndMouse } = useSceneObjectUpdaters();

  const listenForObjectScale = useCallback(
    (isActive: boolean) => {
      const isNotAlreadyScalingObject =
        editorState.editingState !== EDITING_STATES.SCALE;

      const shouldScaleObject =
        isActive && isPressed.S && isNotAlreadyScalingObject;

      if (shouldScaleObject) {
        const sceneObject = getActiveObject()!;

        storeSnapshotOfObjectAndMouse({ editorRefs, sceneObject });
        setEditingStateToScale();
      }
    },
    [
      isPressed.S,
      editorRefs,
      editorState.editingState,
      getActiveObject,
      setEditingStateToScale,
      storeSnapshotOfObjectAndMouse,
    ],
  );

  const scaleObject = useCallback(() => {
    const objectCenter = editorRefs.objectCoordsIn2DViewport.current!;
    const unscaledProportions = { x: 1, y: 1, z: 1 };
    const mouseStart = editorRefs.mousePositionSnapshot?.current ?? {
      x: 0,
      y: 0,
    };
    const mouseEnd = editorRefs.mousePosition.current!;
    const mouseStartDistanceFromObject = getDistance2d(
      objectCenter,
      mouseStart,
    );
    const mouseEndDistanceFromObject = getDistance2d(objectCenter, mouseEnd);

    const scaleFactor =
      mouseEndDistanceFromObject / mouseStartDistanceFromObject;

    const { chosenAxis } = editorState;

    setSceneObjects(
      produce((draft: SceneObjects) => {
        const selectedObject = getActiveObject(draft)!;

        const startingScale =
          editorRefs.objectScaleSnapshot.current ?? unscaledProportions;

        if (chosenAxis === AXES.DEFAULT) {
          // scale all axes
          selectedObject.scale = {
            x: startingScale.x * scaleFactor,
            y: startingScale.y * scaleFactor,
            z: startingScale.z * scaleFactor,
          };
        } else {
          // scale one axis
          selectedObject.scale = {
            ...startingScale,
            ...{ [chosenAxis]: startingScale[chosenAxis] * scaleFactor },
          };
        }
      }),
    );
  }, [editorRefs, editorState, setSceneObjects, getActiveObject]);

  return {
    scaleObject,
    listenForObjectScale,
  };
}
