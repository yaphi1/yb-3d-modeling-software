import { useMemo, useState } from 'react';
import './App.css';
import { MainView } from './components/MainView';
import { defaultEditorState, EditorState, EditorStateContext } from './editorContextHelpers';
import { EditorControls } from './components/controls/EditorControls';

export default function App() {
  const [editorState, setEditorState] = useState<EditorState>(defaultEditorState);

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
