export const SHAPE_TYPES = {
  CUBE: 'CUBE',
  SPHERE: 'SPHERE',
} as const;

export type SHAPE_NAMES = keyof typeof SHAPE_TYPES;

export type XYZ = {
  x: number,
  y: number,
  z: number,
};

export type BaseShapeProps = {
  id: string,
  shapeName: SHAPE_NAMES,
  position: XYZ,
  scale: XYZ,
};

export type SphereProps = BaseShapeProps & {
};

export type AllShapeProps = BaseShapeProps | SphereProps;
