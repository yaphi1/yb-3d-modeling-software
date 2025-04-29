import { useContext } from 'react';
import { Environment } from '@react-three/drei';
import { EditorContext, VIEWING_MODES } from './contexts/EditorContext';

export function Lighting() {
  const { editorState } = useContext(EditorContext);

  const isMaterialPreview =
    editorState.viewingMode === VIEWING_MODES.MATERIAL_PREVIEW;

  return (
    <>
      {isMaterialPreview && (
        <>
          {/* <Sky sunPosition={1} /> */}
          {/* <Environment preset="dawn" /> */}
          <Environment
            preset="dawn"
            background
            blur={0.7}
            backgroundRotation={[0, 0.5 * Math.PI, 0]}
          />
        </>
      )}
      {/* <Environment
        preset="studio"
        {...isMaterialPreview ? { background: true } : null}
        blur={0.7}
      /> */}
      {/* <Environment preset="studio" environmentIntensity={0.7} /> */}
      {/* <Environment preset="city" resolution={16} /> */}
      {/* <Environment preset="sunset" /> */}
      {/* <Environment preset="dawn" blur={100} /> */}

      {!isMaterialPreview && (
        <>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight
            position={[10, 20, 30]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
          />
          <pointLight position={[-30, 5, -20]} decay={0} intensity={Math.PI} />
        </>
      )}
    </>
  );
}
