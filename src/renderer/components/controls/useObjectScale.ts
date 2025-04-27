import { useCallback, useContext } from 'react';
import { produce } from 'immer';
import { AXES, EDITING_STATES, EditorContext } from '../contexts/EditorContext';
import {
  SceneObjects,
  SceneObjectsContext,
} from '../contexts/SceneObjectsContext';
import { getSceneObjectById } from '../../helpers';
import { useEditorControls } from './useEditorControls';
import { useEditorStateHelpers } from '../../useEditorStateHelpers';
import { getDistance2d } from '../../mathHelpers';
import { useSceneObjectUpdaters } from '../useSceneObjectUpdaters';

export function useObjectScale() {
  const { editorState, editorRefs } = useContext(EditorContext);
  const { sceneObjects, setSceneObjects } = useContext(SceneObjectsContext);
  const { isPressedS } = useEditorControls();
  const { setEditingStateToScale } = useEditorStateHelpers();
  const { storeSnapshotOfObjectAndMouse } = useSceneObjectUpdaters();

  const listenForObjectScale = useCallback(
    (isActive: boolean) => {
      const isNotAlreadyScalingObject =
        editorState.editingState !== EDITING_STATES.SCALE;

      const shouldScaleObject =
        isActive && isPressedS && isNotAlreadyScalingObject;

      if (shouldScaleObject) {
        const sceneObject = getSceneObjectById({
          id: editorState.selectedObjectId!,
          sceneObjects,
        })!;

        storeSnapshotOfObjectAndMouse({ editorRefs, sceneObject });
        setEditingStateToScale();
      }
    },
    [
      isPressedS,
      editorRefs,
      editorState.editingState,
      editorState.selectedObjectId,
      sceneObjects,
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
        const selectedObject = getSceneObjectById({
          id: editorState.selectedObjectId!,
          sceneObjects: draft,
        })!;

        const startingScale =
          editorRefs.objectScaleSnapshot.current ?? unscaledProportions;

        if (chosenAxis === AXES.DEFAULT) {
          // scale all axes
          selectedObject.scale = {
            x: scaleFactor,
            y: scaleFactor,
            z: scaleFactor,
          };
        } else {
          // scale one axis
          selectedObject.scale = {
            ...startingScale,
            ...{ [chosenAxis]: scaleFactor },
          };
        }
      }),
    );
  }, [editorRefs, editorState, setSceneObjects]);

  return {
    scaleObject,
    listenForObjectScale,
  };
}
