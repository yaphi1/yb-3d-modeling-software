import { SceneObjects } from './components/contexts/SceneObjectsContext';
import { XYZ } from './components/shapes/shapeTypes';

export function xyzToArray(xyz: XYZ): [number, number, number] {
  return [xyz.x, xyz.y, xyz.z];
}

export function getSceneObjectById({
  id,
  sceneObjects,
}: {
  id: string | null;
  sceneObjects: SceneObjects;
}) {
  return id ? sceneObjects.find((sceneObject) => id === sceneObject.id) : null;
}
