import { useEffect, useRef } from "react";
import * as THREE from "three";

export const GLLights = () => {
  const sunRef = useRef<THREE.DirectionalLight | any>(undefined);

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
