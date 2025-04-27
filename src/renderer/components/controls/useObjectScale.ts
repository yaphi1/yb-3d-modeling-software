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

export function useObjectScale() {
  const { editorState, editorRefs } = useContext(EditorContext);
  const { sceneObjects, setSceneObjects } = useContext(SceneObjectsContext);
  const { isPressedS } = useEditorControls();
  const { setEditingStateToScale } = useEditorStateHelpers();

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

        editorRefs.objectScaleSnapshot.current = { ...sceneObject.scale };
        editorRefs.mousePositionSnapshot.current = {
          ...(editorRefs.mousePosition.current ?? { x: 0, y: 0 }),
        };

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
    ],
  );

  const scaleObject = useCallback(() => {
    const mouseStart = editorRefs.mousePositionSnapshot?.current ?? {
      x: 0,
      y: 0,
    };
    const mouseEnd = editorRefs.mousePosition.current!;
    const mouseDistance = getDistance2d(mouseStart, mouseEnd);

    const { chosenAxis } = editorState;

    setSceneObjects(
      produce((draft: SceneObjects) => {
        const selectedObject = getSceneObjectById({
          id: editorState.selectedObjectId!,
          sceneObjects: draft,
        })!;

        /* 
        - get 2D screen xy of object's 3D position. That's the origin.
        - Get the mouse's distance from origin
        - Get the mouse's distance from its starting point
        - if distFromOrigin >= distFromStart, scale up
        - else scale down
        */
        // const origin = { x: 0, y: 0 }; // wait actually we need the screen xy coords of the object's position
        const unscaled = { x: 1, y: 1, z: 1 };

        const startingScale =
          editorRefs.objectScaleSnapshot.current ?? unscaled;
        const amountToScale = mouseDistance * 0.01;

        if (chosenAxis === AXES.DEFAULT) {
          // scale all axes
          selectedObject.scale = {
            x: startingScale.x + amountToScale,
            y: startingScale.y + amountToScale,
            z: startingScale.z + amountToScale,
          };
        } else {
          // scale one axis
          const startingScaleAlongAxis = startingScale[chosenAxis];
          selectedObject.scale = {
            ...startingScale,
            ...{ [chosenAxis]: startingScaleAlongAxis + amountToScale },
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
