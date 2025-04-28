import { useContext } from 'react';
import { Edges } from '@react-three/drei';
import { CustomMeshProps } from './shapeTypes';
import { EditorContext, VIEWING_MODES } from '../contexts/EditorContext';

const wireframeColor = '#ffffff';
const solidModeColor = '#848586';
const highlightColor = '#D28329';

function Wireframe() {
  return (
    <Edges
      linewidth={1}
      threshold={1} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
      color={wireframeColor}
    />
  );
}

function Highlight() {
  return (
    <Edges
      linewidth={2}
      threshold={1} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
      color={highlightColor}
    />
  );
}

export function ShapeMaterial(props: CustomMeshProps) {
  const { editorState } = useContext(EditorContext);
  const { isActive, color, metalness, roughness } = props;

  const isWireframe = editorState.viewingMode === VIEWING_MODES.WIREFRAME;
  const isSolid = editorState.viewingMode === VIEWING_MODES.SOLID;
  const isMaterialPreview =
    editorState.viewingMode === VIEWING_MODES.MATERIAL_PREVIEW;

  return (
    <>
      {isWireframe && (
        <>
          <meshStandardMaterial transparent opacity={0} />
          {isActive ? <Highlight /> : <Wireframe />}
        </>
      )}
      {isSolid && (
        <>
          <meshStandardMaterial color={solidModeColor} />
          {isActive && <Highlight />}
        </>
      )}
      {isMaterialPreview && (
        <>
          <meshStandardMaterial
            color={color}
            metalness={metalness}
            roughness={roughness}
          />
          {isActive && <Highlight />}
        </>
      )}
    </>
  );
}
