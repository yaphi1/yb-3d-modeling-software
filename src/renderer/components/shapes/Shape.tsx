import { JSX, useContext, useEffect, useMemo, useState } from 'react';
import { produce } from 'immer';
import { Cube } from './Cube';
import { AllShapeProps, SHAPE_NAMES, SHAPE_TYPES } from './shapeTypes';
import { Sphere } from './Sphere';
import { useSelectionHelpers } from '../../useSelectionHelpers';
import { EDITING_STATES, EditorContext } from '../contexts/EditorContext';
import { useEditorControls } from '../controls/useEditorControls';
import { SceneObjectsContext } from '../contexts/SceneObjectsContext';
import { getSceneObjectById, xyzToArray } from '../../helpers';

export function Shape({ shapeProps }: { shapeProps: AllShapeProps }) {
  const [isHovered, setIsHovered] = useState(false);
  const { selectShapeById } = useSelectionHelpers();
  const { editorState, editorRefs, setEditorState } = useContext(EditorContext);
  const { sceneObjects } = useContext(SceneObjectsContext);
  const { isPressedG, isPressedEsc } = useEditorControls();

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
        produce((draft) => {
          draft.editingState = EDITING_STATES.MOVE;
        }),
      );
    }
  }, [
    isActive,
    isPressedG,
    editorRefs.mousePosition,
    editorRefs.mousePositionSnapshot,
    editorRefs.objectPositionSnapshot,
    editorState.editingState,
    editorState.selectedObjectId,
    sceneObjects,
    setEditorState,
  ]);

  useEffect(() => {
    if (isPressedEsc) {
      setEditorState(
        produce((draft) => {
          draft.editingState = EDITING_STATES.DEFAULT;
        }),
      );
    }
  }, [isPressedEsc, setEditorState]);

  const commonProps = {
    position: xyzToArray(shapeProps.position),
    scale: xyzToArray(shapeProps.scale),
    onClick: () => {
      selectShapeById(shapeProps.id);
    },
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
