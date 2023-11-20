import { MeshProps } from "@react-three/fiber";
import { forwardRef, memo, useRef } from "react";
import * as THREE from "three";

export type TGLBoundingAroundRef = {};

interface IGlBoundingArroundProps extends MeshProps {
  position: THREE.Vector3;
  geometry: THREE.BufferGeometry;
}

export const GLBoundingAround = memo(
  forwardRef<TGLBoundingAroundRef, IGlBoundingArroundProps>(
    ({ geometry, position, ...props }, ref) => {
      const boundingArroundRef = useRef<THREE.Mesh | any>(null);

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
          ref={boundingArroundRef}
          castShadow={false}
          receiveShadow={false}
          position={position}
          geometry={geometry}
          material={material.current}
          scale={[1, 1, 1]}
          renderOrder={999}
          {...props}
        />
      );
    },
  ),
);
