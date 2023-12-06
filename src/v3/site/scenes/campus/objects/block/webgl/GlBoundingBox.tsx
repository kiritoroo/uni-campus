import { useRef } from "react";
import * as THREE from "three";
import randomcolor from "randomcolor";

interface GLBoundingBoxProps {
  property: {
    geometry: THREE.BufferGeometry;
    position: THREE.Vector3;
  };
}

const GLBoundingBox = ({ property }: GLBoundingBoxProps) => {
  const material = useRef<THREE.MeshBasicMaterial>(
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(
        randomcolor({
          hue: "red",
        }),
      ),
      side: THREE.DoubleSide,
      wireframe: true,
      opacity: 1,
      visible: true,
    }),
  );

  return (
    <mesh
      castShadow={false}
      receiveShadow={false}
      geometry={property?.geometry}
      position={property?.position}
      material={material.current}
      visible={true}
    />
  );
};

export default GLBoundingBox;
