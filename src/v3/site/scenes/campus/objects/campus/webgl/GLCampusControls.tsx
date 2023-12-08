import { useEffect, useRef } from "react";
import { OrbitControls as TOrbitControls } from "three-stdlib";
import { OrbitControls } from "@react-three/drei";
import { useCampusSceneStore } from "../../../hooks/useCampuseSceneStore";

const GLCampusControls = () => {
  const campusSceneStore = useCampusSceneStore();

  const campusMode = campusSceneStore.use.campusMode();

  const controlsRef = useRef<TOrbitControls | any>(null);

  return (
    <group>
      <OrbitControls
        ref={controlsRef}
        makeDefault={campusMode === "prod" ? true : false}
        enableDamping
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
      />
    </group>
  );
};

export default GLCampusControls;
