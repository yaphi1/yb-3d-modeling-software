import * as THREE from 'three';
import { ThreeElements } from '@react-three/fiber';
import { useContext, useRef, useState } from 'react';
import { EditorStateContext } from '../../useEditorContext';
import { useSelectionHelpers } from '../../useSelectionHelpers';

export function Cube(props: ThreeElements['mesh']) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { editorState } = useContext(EditorStateContext);
  const { selectShapeById } = useSelectionHelpers();

  const isActive = editorState.selectedObjectId === props.uuid;

  return (
    <mesh
      {...props}
      ref={meshRef}
      onClick={() => {
        selectShapeById(props.uuid ?? null);
      }}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={isActive ? '#0098db' : isHovered ? 'hotpink' : '#848586'}
      />
    </mesh>
  );
}
