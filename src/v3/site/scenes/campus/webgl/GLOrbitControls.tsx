import { OrbitControls } from "@react-three/drei";

const GLOrbitControls = () => {
  return (
    <OrbitControls
      makeDefault
      enableDamping
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
    />
  );
};

export default GLOrbitControls;
