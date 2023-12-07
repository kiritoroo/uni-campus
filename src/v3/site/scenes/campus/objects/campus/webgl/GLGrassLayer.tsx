import { TGLTFReference } from "@Types/three.type";
import { useLoader } from "@react-three/fiber";
import { MODELS_ASSETS } from "@v3/site/assets/models";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const GLGrassLayer = () => {
  const gltf: TGLTFReference = useLoader(GLTFLoader, MODELS_ASSETS.grassLayer);
  const model = useMemo(() => gltf.scenes[0], []);

  const objGroundMergeProperty = useMemo<{
    geometry: THREE.BufferGeometry;
    position: THREE.Vector3;
  } | null>(() => {
    const obj = model.getObjectByName("grass-merge");
    if (!obj || !(obj instanceof THREE.Mesh)) return null;

    return {
      geometry: obj.geometry,
      position: obj.position,
    };
  }, []);

  const material = useRef<THREE.MeshStandardMaterial>(
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x91e2b4),
      transparent: true,
      side: THREE.DoubleSide,
    }),
  );

  return (
    <group>
      {objGroundMergeProperty && (
        <mesh
          geometry={objGroundMergeProperty?.geometry}
          material={material.current}
          position={objGroundMergeProperty?.position}
          castShadow
          receiveShadow
        />
      )}
    </group>
  );
};

export default GLGrassLayer;
