import { useMemo, useState } from 'react';
import './App.css';
import { MainView } from './components/MainView';
import { defaultEditorState, EditorState, EditorStateContext } from './components/contexts/EditorStateContext';
import { EditorControls } from './components/controls/EditorControls';
import { defaultSceneObjects, SceneObjectsContext } from './components/contexts/SceneObjectsContext';
import { AllShapeProps } from './components/shapes/shapeTypes';

export default function App() {
  const [editorState, setEditorState] = useState<EditorState>(defaultEditorState);
  const [sceneObjects, setSceneObjects] = useState<Array<AllShapeProps>>(defaultSceneObjects);

  const editorStateContext = useMemo(() => {
    return { editorState, setEditorState };
  }, [editorState, setEditorState]);
  
  const sceneObjectsContext = useMemo(() => {
    return { sceneObjects, setSceneObjects };
  }, [sceneObjects, setSceneObjects]);

  return (
    <EditorStateContext.Provider value={editorStateContext}>
      <SceneObjectsContext value={sceneObjectsContext}>
        <EditorControls>
          <div className="App">
            <MainView />
          </div>
        </EditorControls>
      </SceneObjectsContext>
    </EditorStateContext.Provider>
  );
}
