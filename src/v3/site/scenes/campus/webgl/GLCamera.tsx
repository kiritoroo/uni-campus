import { PerspectiveCamera } from "@react-three/drei";
import { useCampusSceneStore } from "../hooks/useCampuseSceneStore";
import { memo } from "react";

export const GLCamera = memo(() => {
  const campusSceneStore = useCampusSceneStore();

  const campusMode = campusSceneStore.use.campusMode();

  return (
    <PerspectiveCamera
      makeDefault={campusMode === "dev" ? true : false}
      fov={75}
      position={[-50, 100, 200]}
      near={0.5}
      far={2000}
    />
  );
});
