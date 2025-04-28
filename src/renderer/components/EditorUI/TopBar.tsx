import { useEditorStateHelpers } from '../../useEditorStateHelpers';
import { SHAPE_TYPES } from '../shapes/shapeTypes';
import { useSceneObjectUpdaters } from '../useSceneObjectUpdaters';

export function TopBar() {
  const { addSceneObject } = useSceneObjectUpdaters();
  const {
    setViewingModeToWireframe,
    setViewingModeToSolid,
    setViewingModeToMaterialPreview,
  } = useEditorStateHelpers();

  return (
    <div className="TopBar">

      <div className="TopBar__Group">
        <button
          type="button"
          onClick={() => {
            addSceneObject(SHAPE_TYPES.CUBE);
          }}
        >
          Add Cube
        </button>
        <button
          type="button"
          onClick={() => {
            addSceneObject(SHAPE_TYPES.SPHERE);
          }}
        >
          Add Sphere
        </button>
      </div>

      <div className="TopBar__Group">
        <button type="button" onClick={setViewingModeToWireframe}>
          Wireframe
        </button>
        <button type="button" onClick={setViewingModeToSolid}>
          Solid
        </button>
        <button type="button" onClick={setViewingModeToMaterialPreview}>
          Material Preview
        </button>
      </div>
    </div>
  );
}
