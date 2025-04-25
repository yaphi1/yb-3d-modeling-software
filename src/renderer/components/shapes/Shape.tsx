import { JSX } from 'react';
import { Cube } from './Cube';
import { AllShapeProps, SHAPE_NAMES, SHAPE_TYPES, XYZ } from './shapeTypes';
import { Sphere } from './Sphere';

function xyzToArray(xyz: XYZ): [number, number, number] {
  return [xyz.x, xyz.y, xyz.z];
}

export function Shape({ shapeProps } : {
  shapeProps: AllShapeProps,
}) {
  const shapeComponentList: Record<SHAPE_NAMES, JSX.Element> = {
    [SHAPE_TYPES.CUBE]: (
      <Cube
        position={xyzToArray(shapeProps.position)}
        scale={xyzToArray(shapeProps.scale)}
      />
    ),
    [SHAPE_TYPES.SPHERE]: (
      <Sphere
        position={xyzToArray(shapeProps.position)}
        scale={xyzToArray(shapeProps.scale)}
      />
    ),
  };
  const chosenShape = shapeComponentList[shapeProps.shapeName];

  return chosenShape;
}
