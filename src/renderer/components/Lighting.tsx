export function Lighting() {
  return (
    <>
      {/* <Environment preset="city" blur={1} /> */}
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 20, 30]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-30, 5, -20]} decay={0} intensity={Math.PI} />
    </>
  );
}
