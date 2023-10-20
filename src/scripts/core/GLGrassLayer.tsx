import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TGLTFReference } from "@Types/three.type";
import { useLoader } from "@react-three/fiber";
import { assets } from "@Assets/assets";
import * as THREE from "three";
import { memo, useRef } from "react";

export const GLGrassLayer = memo(() => {
  const gltf: TGLTFReference = useLoader(GLTFLoader, assets.models.GRASS_LAYER_PATH);
  const model = gltf.scenes[0];

  const objGroundMergeProperty: {
    geometry: THREE.BufferGeometry;
    position: THREE.Vector3;
  } | null = (() => {
    const obj = model.getObjectByName("grass-merge");
    if (!obj || !(obj instanceof THREE.Mesh)) return null;

    return {
      geometry: obj.geometry,
      position: obj.position,
    };
  })();

  const material = useRef<THREE.MeshStandardMaterial>(
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xc3d89e),
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
        />
      )}
    </group>
  );
});
