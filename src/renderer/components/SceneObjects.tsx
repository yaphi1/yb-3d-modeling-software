import { useState } from 'react';
import { v4 as generateUUID } from 'uuid';
import { AllShapeProps, SHAPE_TYPES } from './shapes/shapeTypes';
import { Shape } from './shapes/Shape';

const defaultShapes: Array<AllShapeProps> = [
  {
    id: generateUUID(),
    shapeName: SHAPE_TYPES.CUBE,
    position: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
  },
];

export function SceneObjects() {
  const [shapes, setShapes] = useState(defaultShapes);
  return (
    <>
      {shapes.map((shape) => (
        <Shape key={shape.id} shapeProps={shape} />
      ))}
    </>
  );
}
