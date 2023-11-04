import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TGLTFReference } from "src/v2/types/three.type";
import { useLoader } from "@react-three/fiber";
import { assets } from "@Assets/assets";
import * as THREE from "three";
import { memo, useMemo, useRef } from "react";
import { useTexture } from "@react-three/drei";

export const GLTestLayer = memo(() => {
  const gltf: TGLTFReference = useLoader(GLTFLoader, "test-bake.glb");
  const model = useMemo(() => gltf.scenes[0], []);
  // const texture = useTexture("/test-bake.png");
  console.log(model);
  const objGroundMergeProperty = useMemo<{
    geometry: THREE.BufferGeometry;
    position: THREE.Vector3;
  } | null>(() => {
    const obj = model.getObjectByName("merge");
    if (!obj || !(obj instanceof THREE.Mesh)) return null;

    return {
      geometry: obj.geometry,
      position: obj.position,
    };
  }, []);

  const material = useMemo<THREE.MeshStandardMaterial>(() => {
    const mat = (model.getObjectByName("merge") as THREE.Mesh)
      .material! as THREE.MeshStandardMaterial;
    mat.transparent = true;
    mat.opacity = 1;
    // mat.roughness = 0.8;
    mat.side = THREE.DoubleSide;
    mat.depthWrite = true;
    mat.depthTest = true;
    0;
    return mat;
  }, []);

  return (
    <group>
      {objGroundMergeProperty && (
        <mesh
          geometry={objGroundMergeProperty?.geometry}
          material={material}
          position={objGroundMergeProperty?.position}
          castShadow
          receiveShadow
        />
      )}
      {/* <primitive object={model} /> */}
    </group>
  );
});
