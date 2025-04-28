import { MaterialEditor } from './MaterialEditor';
import { TopBar } from './TopBar';
import './EditorUI.css';

export function EditorUI() {
  return (
    <div className="EditorUI">
      <TopBar />
      <MaterialEditor />
    </div>
  );
}
