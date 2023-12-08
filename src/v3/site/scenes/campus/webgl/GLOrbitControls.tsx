import { OrbitControls } from "@react-three/drei";
import { useCampusSceneStore } from "../hooks/useCampuseSceneStore";
import { memo } from "react";

const GLOrbitControls = memo(() => {
  const campusSceneStore = useCampusSceneStore();
  const campusMode = campusSceneStore.use.campusMode();

  return (
    <group>
      <OrbitControls
        makeDefault
        enableDamping
        enablePan={campusMode === "dev" ? true : false}
        enableZoom={campusMode === "dev" ? true : false}
        enableRotate={campusMode === "dev" ? true : false}
      />
    </group>
  );
});

export default GLOrbitControls;
