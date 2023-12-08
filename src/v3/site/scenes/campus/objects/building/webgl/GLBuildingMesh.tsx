import { memo, useRef } from "react";
import * as THREE from "three";

interface GLBuildingMeshProps {
  property: {
    geometry: THREE.BufferGeometry;
    material: THREE.MeshStandardMaterial;
    position: THREE.Vector3;
  };
}
const GLBuildingMesh = memo(({ property }: GLBuildingMeshProps) => {
  const material = useRef<THREE.MeshStandardMaterial>(property.material.clone());

  return (
    <mesh
      castShadow={true}
      receiveShadow={true}
      geometry={property?.geometry}
      position={property?.position}
      material={material.current}
    />
  );
});

export default GLBuildingMesh;
