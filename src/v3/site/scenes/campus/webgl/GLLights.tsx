import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useCampusSceneStore } from "../hooks/useCampuseSceneStore";
import { useHelper } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export const GLLights = () => {
  const campusSceneStore = useCampusSceneStore();
  const campusMode = campusSceneStore.use.campusMode();

  const sunRef = useRef<THREE.DirectionalLight | any>(undefined);
  const { scene } = useThree();

  campusMode === "dev" && useHelper(sunRef, THREE.DirectionalLightHelper);

  useEffect(() => {
    if (sunRef.current) {
      const light = sunRef.current as THREE.DirectionalLight;
      light.scale.set(1, 1, 1);
      light.castShadow = true;
      light.shadow.mapSize = new THREE.Vector2(1024 * 2, 1024 * 2);
      light.shadow.camera.top = 200;
      light.shadow.camera.bottom = -250;
      light.shadow.camera.left = -200;
      light.shadow.camera.right = 200;
      light.shadow.camera.near = 0.01;
      light.shadow.camera.far = 1000;
      light.shadow.normalBias = 0.5;

      const shadowHelper = new THREE.CameraHelper(light.shadow.camera);
      campusMode == "dev" && scene.add(shadowHelper);
    }
  }, [sunRef.current]);

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight
        ref={sunRef}
        color={"#ffffff"}
        intensity={1}
        castShadow
        position={[-80, 200, 20]}
      />
    </>
  );
};
