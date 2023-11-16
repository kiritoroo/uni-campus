import { forwardRef, memo, useRef } from "react";
import { MeshProps } from "@react-three/fiber";
import * as _ from "lodash";
import * as THREE from "three";

export type TGLBoundingBoxRef = {};

interface GLBoundingBoxProps extends MeshProps {
  geometry: THREE.BufferGeometry;
  position: THREE.Vector3;
}

export const GLBoundingBox = memo(
  forwardRef<TGLBoundingBoxRef, GLBoundingBoxProps>(({ geometry, position, ...props }, ref) => {
    const material = useRef<THREE.MeshBasicMaterial>(
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x0378d4),
        side: THREE.DoubleSide,
        transparent: true,
        depthWrite: false,
        depthTest: true,
        opacity: 1,
        visible: true,
        wireframe: true,
      }),
    );

    return (
      <mesh
        geometry={geometry}
        position={position}
        material={material.current}
        visible={false}
        {...props}
      />
    );
  }),
);
