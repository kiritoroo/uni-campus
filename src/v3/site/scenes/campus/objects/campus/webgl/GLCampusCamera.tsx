import { PerspectiveCamera, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useCampusSceneStore } from "../../../hooks/useCampuseSceneStore";
import * as THREE from "three";

const GLCampusCamera = () => {
  const campusSceneStore = useCampusSceneStore();

  const campusMode = campusSceneStore.use.campusMode();

  const cameraRef = useRef<THREE.PerspectiveCamera | any>(null);
  const cameraEyeRef = useRef<THREE.Mesh | any>();

  campusMode === "dev" && useHelper(cameraRef, THREE.CameraHelper);

  useFrame(() => {
    if (cameraEyeRef.current && cameraRef.current) {
      (cameraEyeRef.current as THREE.Mesh).position.copy(
        (cameraRef.current as THREE.PerspectiveCamera).position,
      );
    }
  });

  return (
    <group>
      <mesh ref={cameraEyeRef} visible={campusMode === "dev" ? true : false}>
        <sphereGeometry args={[5]} />
        <meshBasicMaterial color={new THREE.Color(0xf50359)} />
      </mesh>
      <PerspectiveCamera
        makeDefault={campusMode === "prod" ? true : false}
        ref={cameraRef}
        near={0.5}
        far={5000}
        fov={45}
      />
    </group>
  );
};

export default GLCampusCamera;
