import { useHelper } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const Lights = () => {
  const { scene } = useThree();

  const sunRef = useRef<THREE.DirectionalLight | any>(undefined);

  useHelper(sunRef, THREE.DirectionalLightHelper);

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
      // light.shadow.bias = -0.002;
      light.shadow.normalBias = 0.1;

      const shadowHelper = new THREE.CameraHelper(light.shadow.camera);
      scene.add(shadowHelper);
    }
  }, [sunRef.current]);

  return (
    <>
      <directionalLight
        ref={sunRef}
        color={"#ffffff"}
        intensity={1}
        castShadow
        position={[-80, 200, 20]}
      />
      <hemisphereLight args={[0xe3b7ce, 0xe3b7ce, 0.6]} position={[0, 500, 0]} />
      <ambientLight intensity={1} />
    </>
  );
};
