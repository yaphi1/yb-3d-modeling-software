import { createContext, Dispatch, SetStateAction } from 'react';
import { v4 as generateUUID } from 'uuid';
import {
  AllShapeProps,
  SHAPE_TYPE_NAMES,
  SHAPE_TYPES,
} from '../shapes/shapeTypes';

export type SceneObjects = Array<AllShapeProps>;

let sceneObjectNumber = 0;

function generateSceneObjectName(sceneObjectType: SHAPE_TYPE_NAMES) {
  const firstLetterCapitalized =
    sceneObjectType[0] + sceneObjectType.slice(1).toLowerCase();
  sceneObjectNumber += 1;
  const numberWithLeadingZeroes = sceneObjectNumber.toString().padStart(3, '0');
  const name = `${firstLetterCapitalized}_${numberWithLeadingZeroes}`;

  return name;
}

export function generateSceneObject(sceneObjectType: SHAPE_TYPE_NAMES) {
  const sceneObject: AllShapeProps = {
    id: generateUUID(),
    sceneObjectType,
    sceneObjectName: generateSceneObjectName(sceneObjectType),
    position: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    rotation: { x: 0, y: 0, z: 0 },
    metalness: 0.8,
    roughness: 0.1,
    color: '#848586',
  };

  return sceneObject;
}

export function generateDuplicateObject(sceneObject: AllShapeProps) {
  const duplicatedObject: AllShapeProps = {
    ...sceneObject,
    id: generateUUID(),
    sceneObjectName: generateSceneObjectName(
      sceneObject.sceneObjectType
    ),
  };

  return duplicatedObject;
}

export const defaultSceneObjects: SceneObjects = [
  generateSceneObject(SHAPE_TYPES.CUBE),
];

export const SceneObjectsContext = createContext<{
  sceneObjects: SceneObjects;
  setSceneObjects: Dispatch<SetStateAction<SceneObjects>>;
  getActiveObject: (
    draftSceneObjects?: Array<AllShapeProps>,
  ) => AllShapeProps | null;
}>({
  sceneObjects: defaultSceneObjects,
  setSceneObjects: () => {},
  getActiveObject: () => null,
});
