import { useState } from 'react';
import { AllShapeProps, SHAPE_TYPES } from './shapes/shapeTypes';
import { Shape } from './shapes/Shape';

export function SceneObjects() {
  const [shapes, setShapes] = useState<Array<AllShapeProps>>([
    {
      // todo: add uuid
      shapeName: SHAPE_TYPES.CUBE,
      position: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
    },
  ]);
  return (
    <>
      {shapes.map((shape, i) => (
        <Shape key={i} shapeProps={shape} />
      ))}
    </>
  );
}
