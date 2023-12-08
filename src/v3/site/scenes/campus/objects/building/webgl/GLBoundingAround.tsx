import { memo, useRef } from "react";
import * as THREE from "three";
import { useCampusSceneStore } from "../../../hooks/useCampuseSceneStore";

interface GLBoundingArroundProps {
  property: {
    geometry: THREE.BufferGeometry;
    position: THREE.Vector3;
  };
}

const GlBoundingAround = memo(({ property }: GLBoundingArroundProps) => {
  const campusSceneStore = useCampusSceneStore();
  const campusMode = campusSceneStore.use.campusMode();

  const material = useRef<THREE.MeshBasicMaterial>(
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(0.21, 0.35, 0.67),
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
      depthTest: true,
      opacity: 1,
      visible: true,
    }),
  );

  return (
    <mesh
      castShadow={false}
      receiveShadow={false}
      geometry={property.geometry}
      position={property.position}
      material={material.current}
      scale={[1, 1, 1]}
      renderOrder={999}
      visible={campusMode === "dev" ? false : false}
    />
  );
});

export default GlBoundingAround;
