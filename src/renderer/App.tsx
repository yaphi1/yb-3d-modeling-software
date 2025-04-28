import { useCallback, useMemo, useState } from 'react';
import './App.css';
import { KeyboardControls } from '@react-three/drei';
import { MainView } from './components/MainView';
import {
  defaultEditorState,
  EditorState,
  EditorContext,
  defaultEditorRefs,
} from './components/contexts/EditorContext';
import {
  defaultSceneObjects,
  SceneObjectsContext,
} from './components/contexts/SceneObjectsContext';
import { AllShapeProps } from './components/shapes/shapeTypes';
import { EditorUI } from './components/EditorUI/EditorUI';
import { keyMap } from './components/controls/useEditorControls';

import image from '../../assets/textures/terrain-normal.jpg';

export default function App() {
  const [editorState, setEditorState] =
    useState<EditorState>(defaultEditorState);

  const [sceneObjects, setSceneObjects] =
    useState<Array<AllShapeProps>>(defaultSceneObjects);

  const getActiveObject = useCallback(
    (draftSceneObjects?: Array<AllShapeProps>) => {
      const id = editorState.selectedObjectId;
      if (!id) {
        return null;
      }
      const objectsToCheck = draftSceneObjects ?? sceneObjects;
      const activeObject = objectsToCheck.find(
        (sceneObject) => id === sceneObject.id,
      );
      return activeObject ?? null;
    },
    [editorState, sceneObjects],
  );

  const EditorContextValue = useMemo(() => {
    return {
      editorState,
      editorRefs: defaultEditorRefs,
      setEditorState,
    };
  }, [editorState, setEditorState]);

  const sceneObjectsContext = useMemo(() => {
    return { sceneObjects, setSceneObjects, getActiveObject };
  }, [sceneObjects, setSceneObjects, getActiveObject]);

  return (
    <EditorContext.Provider value={EditorContextValue}>
      <SceneObjectsContext value={sceneObjectsContext}>
        <KeyboardControls map={keyMap}>
          <div className="App">
            <MainView />
          </div>
        </KeyboardControls>
        <EditorUI />
        <div>
          <img src={image} alt="" />
        </div>
      </SceneObjectsContext>
    </EditorContext.Provider>
  );
}
