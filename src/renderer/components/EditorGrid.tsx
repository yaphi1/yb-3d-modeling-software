import * as THREE from 'three';
import { Grid, Line } from '@react-three/drei';

export function EditorGrid() {
  return (
    <>
      <Grid
        infiniteGrid
        cellSize={0.5}
        cellThickness={1}
        cellColor="#777"
        sectionColor="#777"
        sectionSize={5}
        fadeDistance={200}
        fadeStrength={20}
        side={THREE.DoubleSide}
      />
      <Line
        points={[
          [-40, 0, 0],
          [40, 0, 0],
        ]}
        color="#814149"
      />
      <Line
        points={[
          [0, 0, -40],
          [0, 0, 40],
        ]}
        color="#678239"
      />
    </>
  );
}
