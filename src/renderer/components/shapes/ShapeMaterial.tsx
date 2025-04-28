import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Edges } from '@react-three/drei';
import { Vector2 } from 'three';
import { CustomMeshProps } from './shapeTypes';
import { EditorContext, VIEWING_MODES } from '../contexts/EditorContext';
import { useShapeTextures } from './useShapeTextures';

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
  const { getTextureById } = useShapeTextures();
  const [isRefreshingTexture, setIsRefreshingTexture] = useState(false);

  const isWireframe = editorState.viewingMode === VIEWING_MODES.WIREFRAME;
  const isSolid = editorState.viewingMode === VIEWING_MODES.SOLID;
  const isMaterialPreview =
    editorState.viewingMode === VIEWING_MODES.MATERIAL_PREVIEW;

  const texture = useMemo(() => {
    return {
      color,
      metalness,
      roughness,
      normalScale: new Vector2(0.15, 0.15),
      ...getTextureById(props.textureId),
    };
  }, [getTextureById, props.textureId, color, metalness, roughness]);

  /**
   * Setting this state just to force rerender.
   * Threejs `needsUpdate` didn't work as expected.
   */
  const forceTextureUpdate = useCallback(() => {
    setIsRefreshingTexture(true);
    setTimeout(() => {
      setIsRefreshingTexture(false);
    }, 0);
  }, []);

  useEffect(() => {
    forceTextureUpdate();
  }, [props.textureId, forceTextureUpdate]);

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
      {isMaterialPreview && !isRefreshingTexture && (
        <>
          <meshStandardMaterial {...texture} />
          {isActive && <Highlight />}
        </>
      )}
    </>
  );
}
