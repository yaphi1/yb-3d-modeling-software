import { createContext, Dispatch, SetStateAction } from 'react';
import { v4 as generateUUID } from 'uuid';
import { AllShapeProps, SHAPE_NAMES, SHAPE_TYPES } from '../shapes/shapeTypes';

export type SceneObjects = Array<AllShapeProps>;

export function generateSceneObject(sceneObjectName: SHAPE_NAMES) {
  return {
    id: generateUUID(),
    sceneObjectName,
    position: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    rotation: { x: 0, y: 0, z: 0 },
    metalness: 0.8,
    roughness: 0.1,
    color: '#0098db',
  };
}

export const defaultSceneObjects: SceneObjects = [
  generateSceneObject(SHAPE_TYPES.CUBE),
];

export const SceneObjectsContext = createContext<{
  sceneObjects: SceneObjects;
  setSceneObjects: Dispatch<SetStateAction<SceneObjects>>;
}>({
  sceneObjects: defaultSceneObjects,
  setSceneObjects: () => {},
});
