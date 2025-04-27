import { Camera, Size } from '@react-three/fiber';
import { Vector3 } from 'three';
import { XY, XYZ } from './components/shapes/shapeTypes';

export function getDistance2d(start: XY, end: XY) {
  const horizontalDistance = end.x - start.x;
  const verticalDistance = end.y - start.y;
  const diagonalDistance = Math.sqrt(
    horizontalDistance ** 2 + verticalDistance ** 2,
  );

  return diagonalDistance;
}

/**
 * - Input: `x` and `y` are normalized from `-1` to `1`
 * - Output: `canvasCoords` will be like `{ x: 120, y: 300 }` for example
 */
function convertNormalizedCoordsToCanvasCoords(
  x: number,
  y: number,
  canvasSize: Size,
) {
  const canvasCoords = {
    x: ((x + 1) / 2) * canvasSize.width,
    y: ((1 - y) / 2) * canvasSize.height, // y is flipped
  };

  console.log(
    `2D canvas position: (${canvasCoords.x.toFixed(2)}, ${canvasCoords.y.toFixed(2)})`,
  );

  return canvasCoords;
}

export function convert3DPositionTo2DCoords({
  position,
  camera,
  canvasSize,
}: {
  position: XYZ;
  camera: Camera;
  canvasSize: Size;
}) {
  const objectPosition = new Vector3(...Object.values(position));
  objectPosition.project(camera);

  const canvasCoords = convertNormalizedCoordsToCanvasCoords(
    objectPosition.x,
    objectPosition.y,
    canvasSize,
  );

  return canvasCoords;
}
