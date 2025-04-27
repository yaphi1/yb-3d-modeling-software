import { useContext } from 'react';
import { CustomMeshProps } from './shapeTypes';
import {
  getSolidModeColors,
  getWireframeModeColors,
} from './getMaterialColors';
import { EditorContext, VIEWING_MODES } from '../contexts/EditorContext';

export function ShapeMaterial(props: CustomMeshProps) {
  const { editorState } = useContext(EditorContext);
  const { isActive, isHovered } = props;

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
          color={getSolidModeColors({ isActive, isHovered })}
          metalness={0.8}
          roughness={0.1}
        />
      )}
    </>
  );
}
