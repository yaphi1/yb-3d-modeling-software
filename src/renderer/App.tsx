import { useMemo } from 'react';
import './App.css';
import { MainView } from './components/MainView';
import { EditorStateContext, useEditorContext } from './useEditorContext';
import { EditorControls } from './components/controls/EditorControls';

export default function App() {
  const { editorState, setEditorState } = useEditorContext();

  const editorStateContext = useMemo(() => {
    return { editorState, setEditorState };
  }, [editorState, setEditorState]);

  return (
    <EditorStateContext.Provider value={editorStateContext}>
      <EditorControls>
        <div className="App">
          <MainView />
        </div>
      </EditorControls>
    </EditorStateContext.Provider>
  );
}
