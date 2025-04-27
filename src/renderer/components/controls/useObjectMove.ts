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
import { useSceneObjectUpdaters } from '../useSceneObjectUpdaters';

export function useObjectMove() {
  const { editorState, editorRefs } = useContext(EditorContext);
  const { sceneObjects, setSceneObjects } = useContext(SceneObjectsContext);
  const { isPressedG } = useEditorControls();
  const { setEditingStateToMove } = useEditorStateHelpers();
  const { storeSnapshotOfObjectAndMouse } = useSceneObjectUpdaters();

  const listenForObjectMove = useCallback(
    (isActive: boolean) => {
      const isNotAlreadyMovingObject =
        editorState.editingState !== EDITING_STATES.MOVE;

      const shouldMoveObject =
        isActive && isPressedG && isNotAlreadyMovingObject;

      if (shouldMoveObject) {
        const sceneObject = getSceneObjectById({
          id: editorState.selectedObjectId!,
          sceneObjects,
        })!;

        storeSnapshotOfObjectAndMouse({ editorRefs, sceneObject });
        setEditingStateToMove();
      }
    },
    [
      isPressedG,
      editorRefs,
      editorState.editingState,
      editorState.selectedObjectId,
      sceneObjects,
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
        const selectedObject = getSceneObjectById({
          id: editorState.selectedObjectId!,
          sceneObjects: draft,
        })!;

        // TODO: Make direction dynamic depending on camera rotation
        const shouldReverse = editorState.chosenAxis === AXES.x;
        const direction = shouldReverse ? -1 : 1;

        const startingPosition = editorRefs.objectPositionSnapshot!.current!;
        const startingPositionAlongAxis = startingPosition[movementAxis];
        const distanceToMove = direction * mouseDistance * 0.01;

        selectedObject.position = {
          ...startingPosition,
          ...{ [movementAxis]: startingPositionAlongAxis - distanceToMove },
        };
      }),
    );
  }, [editorRefs, editorState, setSceneObjects]);

  return {
    moveObject,
    listenForObjectMove,
  };
}
