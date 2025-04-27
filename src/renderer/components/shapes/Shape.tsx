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
import { EDITING_STATES, EditorContext } from '../contexts/EditorContext';
import { useEditorControls } from '../controls/useEditorControls';
import {
  SceneObjects,
  SceneObjectsContext,
} from '../contexts/SceneObjectsContext';
import { getSceneObjectById, xyzToArray } from '../../helpers';
import { useEditorStateHelpers } from '../../useEditorStateHelpers';

export function Shape({ shapeProps }: { shapeProps: AllShapeProps }) {
  const [isHovered, setIsHovered] = useState(false);
  const { selectShapeById } = useSelectionHelpers();
  const { editorState, editorRefs } = useContext(EditorContext);
  const { setSceneObjects } = useContext(SceneObjectsContext);
  const { sceneObjects } = useContext(SceneObjectsContext);
  const { isPressedG, isPressedEsc, isPressedEnter } = useEditorControls();
  const { setEditingStateToDefault, setEditingStateToMove } =
    useEditorStateHelpers();

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

      setEditingStateToMove();
    }
  }, [
    isActive,
    isPressedG,
    editorRefs,
    editorState.editingState,
    editorState.selectedObjectId,
    sceneObjects,
    setEditingStateToMove,
  ]);

  const handleShapeClick = useCallback(() => {
    selectShapeById(shapeProps.id);
    setEditingStateToDefault({ keepSelection: true });
  }, [selectShapeById, shapeProps.id, setEditingStateToDefault]);

  useEffect(() => {
    if (isPressedEnter) {
      setEditingStateToDefault({ keepSelection: true });
    }
  }, [isPressedEnter, setEditingStateToDefault]);

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
        setEditingStateToDefault({ keepSelection: true });
      }
    }
  }, [
    isPressedEsc,
    setEditingStateToDefault,
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
