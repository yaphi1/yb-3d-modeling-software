import * as THREE from 'three';
import { ThreeElements } from '@react-three/fiber';
import { useRef, useState } from 'react';

export function Sphere(props: ThreeElements['mesh']) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <mesh
      {...props}
      ref={meshRef}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : '#848586'} />
    </mesh>
  )
}
