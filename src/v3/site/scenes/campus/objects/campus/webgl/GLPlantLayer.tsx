import { TGLTFReference } from "@Types/three.type";
import { useLoader } from "@react-three/fiber";
import { MODELS_ASSETS } from "@v3/site/assets/models";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const GLPlantLayer = () => {
  const gltf: TGLTFReference = useLoader(GLTFLoader, MODELS_ASSETS.plantLayer);
  const model = useMemo(() => gltf.scenes[0], []);

  useEffect(() => {
    model.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.receiveShadow = true;
        obj.castShadow = true;
      }
    });
  }, []);

  console.log(model);

  return (
    <group>
      <primitive object={model} />
    </group>
  );
};

export default GLPlantLayer;
