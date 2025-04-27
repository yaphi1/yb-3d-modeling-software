import { createContext, Dispatch, SetStateAction } from 'react';
import { v4 as generateUUID } from 'uuid';
import { AllShapeProps, SHAPE_TYPES } from '../shapes/shapeTypes';

export type SceneObjects = Array<AllShapeProps>;

export const defaultSceneObjects: SceneObjects = [
  {
    id: generateUUID(),
    sceneObjectName: SHAPE_TYPES.CUBE,
    position: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    rotation: { x: 0, y: 0, z: 0 },
  },
];

export const SceneObjectsContext = createContext<{
  sceneObjects: SceneObjects;
  setSceneObjects: Dispatch<SetStateAction<SceneObjects>>;
}>({
  sceneObjects: defaultSceneObjects,
  setSceneObjects: () => {},
});
