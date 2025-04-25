import * as THREE from 'three';
import { useRef } from 'react';
import { CustomMeshProps } from './shapeTypes';

export function Cube(props: CustomMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={props.isActive ? '#0098db' : props.isHovered ? 'hotpink' : '#848586'}
      />
    </mesh>
  );
}
