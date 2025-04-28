import { useContext } from 'react';
import { CustomMeshProps } from './shapeTypes';
import {
  getMaterialPreviewModeColors,
  getSolidModeColors,
  getWireframeModeColors,
} from './getMaterialColors';
import { EditorContext, VIEWING_MODES } from '../contexts/EditorContext';

export function ShapeMaterial(props: CustomMeshProps) {
  const { editorState } = useContext(EditorContext);
  const { isActive, isHovered, color, metalness, roughness } = props;

  const isWireframe = editorState.viewingMode === VIEWING_MODES.WIREFRAME;
  const isSolid = editorState.viewingMode === VIEWING_MODES.SOLID;
  const isMaterialPreview =
    editorState.viewingMode === VIEWING_MODES.MATERIAL_PREVIEW;

  return (
    <>
      {isWireframe && (
        <meshStandardMaterial
          color={getWireframeModeColors({ isActive, isHovered })}
          wireframe
        />
      )}
      {isSolid && (
        <meshStandardMaterial
          color={getSolidModeColors({ isActive, isHovered })}
        />
      )}
      {isMaterialPreview && (
        <meshStandardMaterial
          color={getMaterialPreviewModeColors({
            trueColor: color,
            isActive,
            isHovered,
          })}
          metalness={metalness}
          roughness={roughness}
        />
      )}
    </>
  );
}

/*
- material customization (texture, color, metalness, roughness)

where will this info go?
it will go in the scene objects
*/
