import { PerspectiveCamera, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { memo, useEffect, useRef } from "react";
import * as THREE from "three";
import { useCampusStoreInContext } from "../hooks/useCampusStoreInContext";

export const GLCampusCamera = memo(() => {
  const setCampusCameraStore = useCampusStoreInContext().use.setCampusCamera();

  const cameraRef = useRef<THREE.PerspectiveCamera | any>(null);
  const cameraEyeRef = useRef<THREE.Mesh | any>();

  useHelper(cameraRef, THREE.CameraHelper);

  useFrame(() => {
    if (cameraEyeRef.current && cameraRef.current) {
      (cameraEyeRef.current as THREE.Mesh).position.copy(
        (cameraRef.current as THREE.PerspectiveCamera).position,
      );
    }
  });

  useEffect(() => {
    if (cameraRef.current) {
      setCampusCameraStore(cameraRef.current);
      // campusStoreProxy.campusCamera = cameraRef.current;
    }
  }, [cameraRef.current]);

  return (
    <group>
      <mesh ref={cameraEyeRef}>
        <sphereGeometry args={[5]} />
        <meshBasicMaterial color={new THREE.Color(0xf50359)} />
      </mesh>
      <PerspectiveCamera makeDefault={false} ref={cameraRef} near={0.1} far={1200} fov={45} />
    </group>
  );
});
