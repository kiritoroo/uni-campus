export const Lights = () => {
  return (
    <>
      <hemisphereLight args={[0xe3b7ce, 0xe3b7ce, 0.6]} position={[0, 500, 0]} />
      <ambientLight intensity={1} />
      <directionalLight color={"#ffffff"} intensity={1} castShadow />
    </>
  );
};
