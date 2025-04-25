import * as THREE from 'three';
import { useRef } from 'react';
import { CustomMeshProps } from './shapeTypes';

export function Sphere(props: CustomMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh {...props} ref={meshRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color={props.isActive ? '#0098db' : props.isHovered ? 'hotpink' : '#848586'}
      />
    </mesh>
  );
}
