import { SHAPE_TYPES } from './shapes/shapeTypes';
import { useSceneObjectUpdaters } from './useSceneObjectUpdaters';

export function EditorUI() {
  const { addSceneObject } = useSceneObjectUpdaters();

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        padding: '10px',
        backgroundColor: '#333',
      }}
    >
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
  );
}
