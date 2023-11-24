import { forwardRef, memo, useRef } from "react";
import { MeshProps } from "@react-three/fiber";
import * as _ from "lodash";
import * as THREE from "three";
import randomcolor from "randomcolor";

export type TGLBlockBoundingRef = {};

interface GLBlockBoundingProps extends MeshProps {
  geometry: THREE.BufferGeometry;
  position: THREE.Vector3;
}

export const GLBlockBounding = memo(
  forwardRef<TGLBlockBoundingRef, GLBlockBoundingProps>(({ geometry, position, ...props }, ref) => {
    const material = useRef<THREE.MeshBasicMaterial>(
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(
          randomcolor({
            hue: "red",
          }),
        ),
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
