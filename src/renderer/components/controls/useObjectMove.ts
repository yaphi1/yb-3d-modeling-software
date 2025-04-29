import { useCallback, useContext } from 'react';
import { produce } from 'immer';
import { AXES, EDITING_STATES, EditorContext } from '../contexts/EditorContext';
import {
  SceneObjects,
  SceneObjectsContext,
} from '../contexts/SceneObjectsContext';
import { useEditorControls } from './useEditorControls';
import { useEditorStateHelpers } from '../../useEditorStateHelpers';
import { useSceneObjectUpdaters } from '../useSceneObjectUpdaters';

export function useObjectMove() {
  const { editorState, editorRefs } = useContext(EditorContext);
  const { getActiveObject, setSceneObjects } = useContext(SceneObjectsContext);
  const { isPressed } = useEditorControls();
  const { setEditingStateToMove } = useEditorStateHelpers();
  const { storeSnapshotOfObjectAndMouse } = useSceneObjectUpdaters();

  const listenForObjectMove = useCallback(
    (isActive: boolean) => {
      const isNotAlreadyMovingObject =
        editorState.editingState !== EDITING_STATES.MOVE;

      const shouldMoveObject =
        isActive && isPressed.G && isNotAlreadyMovingObject;

      if (shouldMoveObject) {
        const sceneObject = getActiveObject()!;

        storeSnapshotOfObjectAndMouse({ editorRefs, sceneObject });
        setEditingStateToMove();
      }
    },
    [
      isPressed.G,
      editorRefs,
      editorState.editingState,
      getActiveObject,
      setEditingStateToMove,
      storeSnapshotOfObjectAndMouse,
    ],
  );

  const moveObject = useCallback(() => {
    const isChosenAxisVertical = editorState.chosenAxis === AXES.y;

    const mouseAxis = isChosenAxisVertical ? 'y' : 'x';
    const mouseStart =
      editorRefs.mousePositionSnapshot?.current?.[mouseAxis] ?? 0;
    const mouseEnd = editorRefs.mousePosition.current![mouseAxis];
    const mouseDistance = mouseEnd - mouseStart;

    const movementAxis =
      editorState.chosenAxis === AXES.DEFAULT ? 'z' : editorState.chosenAxis;

    setSceneObjects(
      produce((draft: SceneObjects) => {
        const selectedObject = getActiveObject(draft)!;

        // TODO: Make direction dynamic depending on camera rotation
        const shouldReverse = editorState.chosenAxis === AXES.x;
        const direction = shouldReverse ? -1 : 1;

        const startingPosition = editorRefs.objectPositionSnapshot!.current!;
        const startingPositionAlongAxis = startingPosition[movementAxis];
        const cameraDistance = editorRefs.cameraDistance.current ?? 5;
        const movementSpeed = cameraDistance * 0.002;
        const distanceToMove = direction * mouseDistance * movementSpeed;

        selectedObject.position = {
          ...startingPosition,
          ...{ [movementAxis]: startingPositionAlongAxis - distanceToMove },
        };
      }),
    );
  }, [editorRefs, editorState, setSceneObjects, getActiveObject]);

  return {
    moveObject,
    listenForObjectMove,
  };
}
