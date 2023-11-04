import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TGLTFReference } from "src/v2/types/three.type";
import { useLoader } from "@react-three/fiber";
import { assets } from "@Assets/assets";
import * as THREE from "three";
import { memo, useEffect, useMemo, useRef } from "react";

export const GLPlaneLayer = () => {
  const gltf: TGLTFReference = useLoader(GLTFLoader, assets.models.PLANT_LAYER_PATH);
  const model = useMemo(() => gltf.scenes[0], []);

  useEffect(() => {
    model.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.receiveShadow = true;
        obj.castShadow = true;
      }
    });
  }, []);

  return (
    <group>
      <primitive object={model} />
    </group>
  );
};
