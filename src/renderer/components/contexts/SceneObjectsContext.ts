import { createContext, Dispatch, SetStateAction } from 'react';
import { v4 as generateUUID } from 'uuid';
import { AllShapeProps, SHAPE_TYPES } from '../shapes/shapeTypes';

export const defaultSceneObjects: Array<AllShapeProps> = [
  {
    id: generateUUID(),
    sceneObjectName: SHAPE_TYPES.CUBE,
    position: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
  },
];

export const SceneObjectsContext = createContext<{
  sceneObjects: Array<AllShapeProps>;
  setSceneObjects: Dispatch<SetStateAction<Array<AllShapeProps>>>;
}>({
  sceneObjects: defaultSceneObjects,
  setSceneObjects: () => {},
});
