import * as THREE from 'three';
import { Grid, Line } from '@react-three/drei';
import { useContext } from 'react';
import { EditorContext, VIEWING_MODES } from './contexts/EditorContext';

export function EditorGrid() {
  const { editorState } = useContext(EditorContext);

  const isMaterialPreview =
      editorState.viewingMode === VIEWING_MODES.MATERIAL_PREVIEW;

  return !isMaterialPreview && (
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
