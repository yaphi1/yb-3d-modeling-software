import { ThreeElements } from '@react-three/fiber';

export const SHAPE_TYPES = {
  CUBE: 'CUBE',
  SPHERE: 'SPHERE',
} as const;

export type SHAPE_TYPE_NAMES = keyof typeof SHAPE_TYPES;

export type XYZ = {
  x: number;
  y: number;
  z: number;
};

export type XY = {
  x: number;
  y: number;
};

export type BaseShapeProps = {
  id: string;
  sceneObjectType: SHAPE_TYPE_NAMES;
  sceneObjectName: string;
  position: XYZ;
  scale: XYZ;
  rotation: XYZ;
  metalness: number;
  roughness: number;
  color: string;
};

export type SphereProps = BaseShapeProps & {
  widthSegments?: number;
  heightSegments?: number;
};

export type AllShapeProps = BaseShapeProps | SphereProps;

export type CustomMeshProps = ThreeElements['mesh'] & {
  isHovered: boolean;
  isActive: boolean;
  color: string;
  metalness: number;
  roughness: number;
};
