import { JSX, useContext, useEffect, useMemo, useState } from 'react';
import { Cube } from './Cube';
import { AllShapeProps, SHAPE_NAMES, SHAPE_TYPES, XYZ } from './shapeTypes';
import { Sphere } from './Sphere';
import { useSelectionHelpers } from '../../useSelectionHelpers';
import { EDITING_STATES, EditorStateContext } from '../contexts/EditorStateContext';
import { useEditorControls } from '../controls/useEditorControls';
import { produce } from 'immer';

function xyzToArray(xyz: XYZ): [number, number, number] {
  return [xyz.x, xyz.y, xyz.z];
}

export function Shape({ shapeProps }: { shapeProps: AllShapeProps }) {
  const [isHovered, setIsHovered] = useState(false);
  const { selectShapeById } = useSelectionHelpers();
  const { editorState, setEditorState } = useContext(EditorStateContext);
  const { isPressedG, isPressedEsc } = useEditorControls();

  const isActive = useMemo(() => {
    return editorState.selectedObjectId === shapeProps.id;
  }, [editorState.selectedObjectId, shapeProps.id]);

  useEffect(() => {
    if (isActive && isPressedG) {
      setEditorState(
        produce((draft) => {
          draft.editingState = EDITING_STATES.MOVE;
          console.log('move');
          /*
          startingShapePosition
            getShapeById
              get position from shape
          startingMousePosition
            get current mouse position from editor state
          */
        }),
      );
    }
  }, [isActive, isPressedG]);

  useEffect(() => {
    if (isPressedEsc) {
      setEditorState(
        produce((draft) => {
          draft.editingState = EDITING_STATES.DEFAULT;
          console.log('default');
        }),
      );
    }
  }, [isPressedEsc]);

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
