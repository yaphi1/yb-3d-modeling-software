import {
  JSX,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { produce } from 'immer';
import { ThreeEvent } from '@react-three/fiber';
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
import { xyzToArray } from '../../helpers';
import { useEditorStateHelpers } from '../../useEditorStateHelpers';
import { useObjectMove } from '../controls/useObjectMove';
import { useObjectScale } from '../controls/useObjectScale';

export function Shape({ shapeProps }: { shapeProps: AllShapeProps }) {
  const [isHovered, setIsHovered] = useState(false);
  const { selectShapeById } = useSelectionHelpers();
  const { listenForObjectMove } = useObjectMove();
  const { listenForObjectScale } = useObjectScale();
  const { editorState, editorRefs } = useContext(EditorContext);
  const { setSceneObjects, getActiveObject } = useContext(SceneObjectsContext);
  const { isPressedEsc, isPressedEnter } = useEditorControls();
  const { setEditingStateToDefault } = useEditorStateHelpers();

  const isActive = useMemo(() => {
    return editorState.selectedObjectId === shapeProps.id;
  }, [editorState.selectedObjectId, shapeProps.id]);

  useEffect(() => {
    listenForObjectMove(isActive);
  }, [listenForObjectMove, isActive]);

  useEffect(() => {
    listenForObjectScale(isActive);
  }, [listenForObjectScale, isActive]);

  const handleShapeClick = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();
      selectShapeById(shapeProps.id);
      setEditingStateToDefault({ keepSelection: true });
    },
    [selectShapeById, shapeProps.id, setEditingStateToDefault],
  );

  useEffect(() => {
    if (isPressedEnter) {
      setEditingStateToDefault({ keepSelection: true });
    }
  }, [isPressedEnter, setEditingStateToDefault]);

  const cancelShapeUpdates = useCallback(() => {
    setSceneObjects(
      produce((draft: SceneObjects) => {
        const selectedObject = getActiveObject(draft)!;

        const zeroes = { x: 0, y: 0, z: 0 };
        const ones = { x: 1, y: 1, z: 1 };

        const startingPosition =
          editorRefs.objectPositionSnapshot.current ?? zeroes;
        const startingScale = editorRefs.objectScaleSnapshot.current ?? ones;
        const startingRotation =
          editorRefs.objectRotationSnapshot.current ?? zeroes;

        selectedObject.position = { ...startingPosition };
        selectedObject.scale = { ...startingScale };
        selectedObject.rotation = { ...startingRotation };
      }),
    );
  }, [
    setSceneObjects,
    getActiveObject,
    editorRefs.objectPositionSnapshot,
    editorRefs.objectScaleSnapshot,
    editorRefs.objectRotationSnapshot,
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
    onPointerOver: (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();
      setIsHovered(true);
    },
    onPointerOut: () => setIsHovered(false),
    isHovered,
    isActive,
    color: shapeProps.color,
    metalness: shapeProps.metalness,
    roughness: shapeProps.roughness,
  };

  const shapeComponentList: Record<SHAPE_NAMES, JSX.Element> = {
    [SHAPE_TYPES.CUBE]: <Cube {...commonProps} />,
    [SHAPE_TYPES.SPHERE]: <Sphere {...commonProps} />,
  };
  const chosenShape = shapeComponentList[shapeProps.sceneObjectName];

  return chosenShape;
}
