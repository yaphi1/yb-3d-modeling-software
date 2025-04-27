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
import { useObjectMove } from '../controls/useObjectMove';

export function Shape({ shapeProps }: { shapeProps: AllShapeProps }) {
  const [isHovered, setIsHovered] = useState(false);
  const { selectShapeById } = useSelectionHelpers();
  const { listenForObjectMove } = useObjectMove();
  const { editorState, editorRefs } = useContext(EditorContext);
  const { setSceneObjects } = useContext(SceneObjectsContext);
  const { isPressedEsc, isPressedEnter } = useEditorControls();
  const { setEditingStateToDefault } = useEditorStateHelpers();

  const isActive = useMemo(() => {
    return editorState.selectedObjectId === shapeProps.id;
  }, [editorState.selectedObjectId, shapeProps.id]);

  useEffect(() => {
    listenForObjectMove(isActive);
  }, [listenForObjectMove, isActive]);

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

        const startPosition = editorRefs.objectPositionSnapshot!.current!;
        const startScale = editorRefs.objectScaleSnapshot!.current!;
        const startRotation = editorRefs.objectRotationSnapshot!.current!;

        selectedObject.position = {
          ...startPosition,
          ...startScale,
          ...startRotation,
        };
      }),
    );
  }, [
    setSceneObjects,
    editorRefs.objectPositionSnapshot,
    editorRefs.objectScaleSnapshot,
    editorRefs.objectRotationSnapshot,
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
