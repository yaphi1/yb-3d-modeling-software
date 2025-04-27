import { ThreeElements } from '@react-three/fiber';

export const SHAPE_TYPES = {
  CUBE: 'CUBE',
  SPHERE: 'SPHERE',
} as const;

export type SHAPE_NAMES = keyof typeof SHAPE_TYPES;

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
  sceneObjectName: SHAPE_NAMES;
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
