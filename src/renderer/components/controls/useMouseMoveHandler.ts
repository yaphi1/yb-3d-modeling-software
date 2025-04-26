import { MouseEventHandler, useCallback, useContext } from 'react';
import { produce } from 'immer';
import { AXES, EDITING_STATES, EditorContext } from '../contexts/EditorContext';
import { getSceneObjectById } from '../../helpers';
import {
  SceneObjects,
  SceneObjectsContext,
} from '../contexts/SceneObjectsContext';

export function useMouseMoveHandler() {
  const { editorState, editorRefs } = useContext(EditorContext);
  const { setSceneObjects } = useContext(SceneObjectsContext);

  const onMouseMove = useCallback<MouseEventHandler<HTMLDivElement>>(
    (event) => {
      editorRefs.mousePosition.current = {
        x: event.clientX,
        y: event.clientY,
      };

      if (editorState.editingState === EDITING_STATES.MOVE) {
        const isChosenAxisVertical = editorState.chosenAxis === AXES.y;

        const mouseAxis = isChosenAxisVertical ? 'y' : 'x';
        const mouseStart =
          editorRefs.mousePositionSnapshot?.current?.[mouseAxis] ?? 0;
        const mouseEnd = editorRefs.mousePosition.current[mouseAxis];
        const mouseDistance = mouseEnd - mouseStart;

        const movementAxis =
          editorState.chosenAxis === AXES.DEFAULT
            ? 'z'
            : editorState.chosenAxis;
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
      }
    },
    [editorRefs, editorState, setSceneObjects],
  );

  return {
    onMouseMove,
  };
}
