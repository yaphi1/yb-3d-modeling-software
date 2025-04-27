import { XY } from './components/shapes/shapeTypes';

export function getDistance2d(start: XY, end: XY) {
  const horizontalDistance = end.x - start.x;
  const verticalDistance = end.y - start.y;
  const diagonalDistance = Math.sqrt(
    horizontalDistance ** 2 + verticalDistance ** 2
  );

  return diagonalDistance;
}
