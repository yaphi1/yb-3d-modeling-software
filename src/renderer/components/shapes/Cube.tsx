import * as THREE from 'three';
import { useRef } from 'react';
import { CustomMeshProps } from './shapeTypes';
import { getStudioColor } from './studioColors';

export function Cube(props: CustomMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { isActive, isHovered } = props;

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={getStudioColor({ isActive, isHovered })}
      />
    </mesh>
  );
}
