import * as THREE from 'three';
import { useRef } from 'react';
import { CustomMeshProps } from './shapeTypes';
import { getStudioColor } from './studioColors';

export function Sphere(props: CustomMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { isActive, isHovered } = props;

  return (
    <mesh {...props} ref={meshRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color={getStudioColor({ isActive, isHovered })}
      />
    </mesh>
  );
}
