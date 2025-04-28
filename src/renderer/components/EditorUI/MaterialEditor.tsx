import { useCallback, useContext, useMemo } from 'react';
import { produce } from 'immer';
import { SceneObjectsContext } from '../contexts/SceneObjectsContext';

export function MaterialEditor() {
  const { getActiveObject, setSceneObjects } = useContext(SceneObjectsContext);
  const activeObject = useMemo(getActiveObject, [getActiveObject]);

  const changeColor = useCallback(
    (color: string) => {
      setSceneObjects(
        produce((draft) => {
          const activeObjectDraft = getActiveObject(draft)!;
          activeObjectDraft.color = color;
        }),
      );
    },
    [setSceneObjects, getActiveObject],
  );

  const changeMetalness = useCallback(
    (metalness: number) => {
      setSceneObjects(
        produce((draft) => {
          const activeObjectDraft = getActiveObject(draft)!;
          activeObjectDraft.metalness = metalness;
        }),
      );
    },
    [setSceneObjects, getActiveObject],
  );

  const changeRoughness = useCallback(
    (roughness: number) => {
      setSceneObjects(
        produce((draft) => {
          const activeObjectDraft = getActiveObject(draft)!;
          activeObjectDraft.roughness = roughness;
        }),
      );
    },
    [setSceneObjects, getActiveObject],
  );

  const changeTextureId = useCallback(
    (newTextureId: string) => {
      setSceneObjects(
        produce((draft) => {
          const activeObjectDraft = getActiveObject(draft)!;
          activeObjectDraft.textureId = newTextureId;
        }),
      );
    },
    [setSceneObjects, getActiveObject],
  );

  return (
    activeObject && (
      <div className="sidebarPanel">
        <div>Surface</div>
        <div className="propertyInputs">
          <label className="propertyInput">
            <span>Base Color</span>
            <input
              type="color"
              value={activeObject.color}
              onChange={(e) => {
                changeColor(e.target.value);
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
            />
            <span
              className="inputValue"
              style={{
                backgroundColor: activeObject.color,
              }}
            />
          </label>
          <label className="propertyInput">
            <span>Metallic</span>
            <input
              className="inputValue"
              type="number"
              value={activeObject.metalness}
              min={0}
              max={1}
              step={0.1}
              onChange={(e) => {
                changeMetalness(parseFloat(e.target.value));
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
            />
          </label>
          <label className="propertyInput">
            <span>Roughness</span>
            <input
              className="inputValue"
              type="number"
              value={activeObject.roughness}
              min={0}
              max={1}
              step={0.1}
              onChange={(e) => {
                changeRoughness(parseFloat(e.target.value));
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
            />
          </label>
          <label className="propertyInput">
            <span>Texture</span>
            <select
              className="inputValue"
              value={activeObject.textureId}
              onChange={(e) => {
                changeTextureId(e.target.value);
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
            >
              <option value="default">Default</option>
              {/* TODO: Rename to UI label to "Pavement" once there are more textures to choose from */}
              <option value="pavement">Rough</option>
            </select>
          </label>
        </div>
      </div>
    )
  );
}
