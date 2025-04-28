import { XYZ } from './components/shapes/shapeTypes';

export function xyzToArray(xyz: XYZ): [number, number, number] {
  return [xyz.x, xyz.y, xyz.z];
}
