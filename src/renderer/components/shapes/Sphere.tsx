import * as THREE from 'three';
import { useRef } from 'react';
import { CustomMeshProps } from './shapeTypes';
import { ShapeMaterial } from './ShapeMaterial';

export function Sphere(props: CustomMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh {...props} ref={meshRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <ShapeMaterial {...props} />
    </mesh>
  );
}
