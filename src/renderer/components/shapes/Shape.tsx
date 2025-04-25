import { JSX, useContext, useState } from 'react';
import { Cube } from './Cube';
import { AllShapeProps, SHAPE_NAMES, SHAPE_TYPES, XYZ } from './shapeTypes';
import { Sphere } from './Sphere';
import { useSelectionHelpers } from '../../useSelectionHelpers';
import { EditorStateContext } from '../../useEditorContext';

function xyzToArray(xyz: XYZ): [number, number, number] {
  return [xyz.x, xyz.y, xyz.z];
}

export function Shape({ shapeProps }: { shapeProps: AllShapeProps }) {
  const [isHovered, setIsHovered] = useState(false);
  const { selectShapeById } = useSelectionHelpers();
  const { editorState } = useContext(EditorStateContext);

  const isActive = editorState.selectedObjectId === shapeProps.id;

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
  const chosenShape = shapeComponentList[shapeProps.shapeName];

  return chosenShape;
}
