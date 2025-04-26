import { useContext } from 'react';
import { Shape } from './shapes/Shape';
import { SceneObjectsContext } from './contexts/SceneObjectsContext';

export function SceneObjects() {
  const { sceneObjects } = useContext(SceneObjectsContext);

  return (
    <>
      {sceneObjects.map((sceneObject) => (
        <Shape key={sceneObject.id} shapeProps={sceneObject} />
      ))}
    </>
  );
}
