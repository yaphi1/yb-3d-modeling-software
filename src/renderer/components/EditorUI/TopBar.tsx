import { useContext } from 'react';
import { useEditorStateHelpers } from '../../useEditorStateHelpers';
import { SceneObjectsContext } from '../contexts/SceneObjectsContext';
import { SHAPE_TYPES } from '../shapes/shapeTypes';
import { useSceneObjectUpdaters } from '../useSceneObjectUpdaters';

export function TopBar() {
  const { addSceneObject } = useSceneObjectUpdaters();
  const {
    setViewingModeToWireframe,
    setViewingModeToSolid,
    setViewingModeToMaterialPreview,
  } = useEditorStateHelpers();
  const { sceneObjects, setSceneObjects } = useContext(SceneObjectsContext);

  return (
    <div className="TopBar">
      <div className="TopBar__Group">
        <button
          type="button"
          onClick={() => {
            localStorage.setItem('saved_scene', JSON.stringify(sceneObjects));
          }}
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => {
            const storedSceneData = localStorage.getItem('saved_scene');
            if (storedSceneData) {
              const storedScene = JSON.parse(storedSceneData);
              setSceneObjects(storedScene);
            }
          }}
        >
          Load
        </button>
      </div>

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
