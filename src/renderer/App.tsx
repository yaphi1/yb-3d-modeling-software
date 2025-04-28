import { useCallback, useMemo, useState } from 'react';
import './App.css';
import { MainView } from './components/MainView';
import {
  defaultEditorState,
  EditorState,
  EditorContext,
  defaultEditorRefs,
} from './components/contexts/EditorContext';
import { EditorControls } from './components/controls/EditorControls';
import {
  defaultSceneObjects,
  SceneObjectsContext,
} from './components/contexts/SceneObjectsContext';
import { AllShapeProps } from './components/shapes/shapeTypes';
import { EditorUI } from './components/EditorUI/EditorUI';

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
        <EditorControls>
          <div className="App">
            <MainView />
          </div>
        </EditorControls>
        <EditorUI />
      </SceneObjectsContext>
    </EditorContext.Provider>
  );
}
