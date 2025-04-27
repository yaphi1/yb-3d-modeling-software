import * as THREE from 'three';
import { useRef } from 'react';
import { CustomMeshProps } from './shapeTypes';
import { ShapeMaterial } from './ShapeMaterial';

export function Cube(props: CustomMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <ShapeMaterial {...props} />
    </mesh>
  );
}
