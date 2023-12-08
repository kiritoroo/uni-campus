import { OrbitControls } from "@react-three/drei";
import { useCampusSceneStore } from "../hooks/useCampuseSceneStore";

const GLOrbitControls = () => {
  const campusSceneStore = useCampusSceneStore();

  const campusMode = campusSceneStore.use.campusMode();

  return (
    <OrbitControls
      makeDefault={campusMode === "dev" ? true : false}
      enableDamping
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
    />
  );
};

export default GLOrbitControls;
