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

export function useObjectMove() {
  const { editorState, editorRefs } = useContext(EditorContext);
  const { sceneObjects, setSceneObjects } = useContext(SceneObjectsContext);
  const { isPressedG } = useEditorControls();
  const { setEditingStateToMove } = useEditorStateHelpers();

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

        editorRefs.objectPositionSnapshot.current = { ...sceneObject.position };
        editorRefs.mousePositionSnapshot.current = {
          ...(editorRefs.mousePosition.current ?? { x: 0, y: 0 }),
        };

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

        const startPosition = editorRefs.objectPositionSnapshot!.current!;
        const startAlongAxis = startPosition[movementAxis];
        const distanceToMove = direction * mouseDistance * 0.01;

        selectedObject.position = {
          ...startPosition,
          ...{ [movementAxis]: startAlongAxis - distanceToMove },
        };
      }),
    );
  }, [editorRefs, editorState, setSceneObjects]);

  return {
    moveObject,
    listenForObjectMove,
  };
}
