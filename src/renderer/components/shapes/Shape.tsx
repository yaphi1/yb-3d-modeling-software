import {
  JSX,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { produce } from 'immer';
import { Cube } from './Cube';
import { AllShapeProps, SHAPE_NAMES, SHAPE_TYPES } from './shapeTypes';
import { Sphere } from './Sphere';
import { useSelectionHelpers } from '../../useSelectionHelpers';
import {
  AXES,
  EDITING_STATES,
  EditorContext,
  EditorState,
} from '../contexts/EditorContext';
import { useEditorControls } from '../controls/useEditorControls';
import {
  SceneObjects,
  SceneObjectsContext,
} from '../contexts/SceneObjectsContext';
import { getSceneObjectById, xyzToArray } from '../../helpers';

export function Shape({ shapeProps }: { shapeProps: AllShapeProps }) {
  const [isHovered, setIsHovered] = useState(false);
  const { selectShapeById } = useSelectionHelpers();
  const { editorState, editorRefs, setEditorState } = useContext(EditorContext);
  const { setSceneObjects } = useContext(SceneObjectsContext);
  const { sceneObjects } = useContext(SceneObjectsContext);
  const { isPressedG, isPressedEsc, isPressedEnter } = useEditorControls();

  const isActive = useMemo(() => {
    return editorState.selectedObjectId === shapeProps.id;
  }, [editorState.selectedObjectId, shapeProps.id]);

  useEffect(() => {
    const isNotAlreadyMovingObject =
      editorState.editingState !== EDITING_STATES.MOVE;

    const shouldMoveObject = isActive && isPressedG && isNotAlreadyMovingObject;

    if (shouldMoveObject) {
      const sceneObject = getSceneObjectById({
        id: editorState.selectedObjectId!,
        sceneObjects,
      })!;

      editorRefs.objectPositionSnapshot.current = { ...sceneObject.position };
      editorRefs.mousePositionSnapshot.current = {
        ...(editorRefs.mousePosition.current ?? { x: 0, y: 0 }),
      };

      setEditorState(
        produce((draft: EditorState) => {
          draft.editingState = EDITING_STATES.MOVE;
        }),
      );
    }
  }, [
    isActive,
    isPressedG,
    editorRefs,
    editorState.editingState,
    editorState.selectedObjectId,
    sceneObjects,
    setEditorState,
  ]);

  const restoreDefaultEditingState = useCallback(() => {
    setEditorState(
      produce((draft: EditorState) => {
        draft.editingState = EDITING_STATES.DEFAULT;
        draft.chosenAxis = AXES.DEFAULT;
      }),
    );
  }, [setEditorState]);

  const handleShapeClick = useCallback(() => {
    selectShapeById(shapeProps.id);
    restoreDefaultEditingState();
  }, [selectShapeById, shapeProps.id, restoreDefaultEditingState]);

  useEffect(() => {
    if (isPressedEnter) {
      restoreDefaultEditingState();
    }
  }, [isPressedEnter, restoreDefaultEditingState]);

  const cancelShapeUpdates = useCallback(() => {
    setSceneObjects(
      produce((draft: SceneObjects) => {
        const selectedObject = getSceneObjectById({
          id: editorState.selectedObjectId!,
          sceneObjects: draft,
        })!;

        // TODO: Do this for rotation and scale too
        const startPosition = editorRefs.objectPositionSnapshot!.current!;

        selectedObject.position = { ...startPosition };
      }),
    );
  }, [
    setSceneObjects,
    editorRefs.objectPositionSnapshot,
    editorState.selectedObjectId,
  ]);

  useEffect(() => {
    if (isPressedEsc) {
      const isNotDefaultEditingState =
        editorState.editingState !== EDITING_STATES.DEFAULT;

      if (isNotDefaultEditingState) {
        cancelShapeUpdates();
        restoreDefaultEditingState();
      }
    }
  }, [
    isPressedEsc,
    restoreDefaultEditingState,
    cancelShapeUpdates,
    editorState.editingState,
  ]);

  const commonProps = {
    position: xyzToArray(shapeProps.position),
    scale: xyzToArray(shapeProps.scale),
    onClick: handleShapeClick,
    onPointerOver: () => setIsHovered(true),
    onPointerOut: () => setIsHovered(false),
    isHovered,
    isActive,
  };

  const shapeComponentList: Record<SHAPE_NAMES, JSX.Element> = {
    [SHAPE_TYPES.CUBE]: <Cube {...commonProps} />,
    [SHAPE_TYPES.SPHERE]: <Sphere {...commonProps} />,
  };
  const chosenShape = shapeComponentList[shapeProps.sceneObjectName];

  return chosenShape;
}
