import gsap, { Expo } from "gsap";
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import * as THREE from "three";

export type TGLBoundingAroundRef = {
  object: THREE.Mesh;
  onPointerEnterBuilding: () => void;
  onPointerLeaveBuilding: () => void;
};

interface IGlBoundingArroundProps {
  position: THREE.Vector3;
  geometry: THREE.BufferGeometry;
}

export const GLBoundingAround = forwardRef<TGLBoundingAroundRef, IGlBoundingArroundProps>(
  ({ geometry, position }, ref) => {
    const boundingArroundRef = useRef<THREE.Mesh | any>(null);
    const animateTimeline = useMemo(() => {
      return gsap.timeline();
    }, []);

    const material = useRef<THREE.MeshBasicMaterial>(
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(0.21, 0.35, 0.67),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0,
      }),
    );

    const handleOnPointerEnterBuilding = () => {
      animateTimeline.clear();
      boundingArroundRef.current &&
        animateTimeline
          .to(
            material.current,
            {
              opacity: 1,
              ease: Expo.easeInOut,
              duration: 0.3,
            },
            "<",
          )
          .to(
            (boundingArroundRef.current as THREE.Mesh).scale,
            {
              x: 1,
              y: 1,
              z: 1,
              ease: Expo.easeInOut,
              duration: 0.3,
            },
            "<",
          )
          .play();
    };

    const handleOnPointerLeaveBuilding = () => {
      animateTimeline.clear();
      boundingArroundRef.current &&
        animateTimeline
          .to(
            material.current,
            {
              opacity: 0,
              ease: Expo.easeInOut,
              duration: 0.3,
            },
            "<",
          )
          .to(
            (boundingArroundRef.current as THREE.Mesh).scale,
            {
              x: 0.8,
              y: 1,
              z: 0.8,
              ease: Expo.easeInOut,
              duration: 0.3,
            },
            "<",
          )
          .play();
    };

    useImperativeHandle(ref, () => ({
      object: boundingArroundRef.current,
      onPointerEnterBuilding: handleOnPointerEnterBuilding,
      onPointerLeaveBuilding: handleOnPointerLeaveBuilding,
    }));

    return (
      <mesh
        ref={boundingArroundRef}
        castShadow={false}
        receiveShadow={false}
        position={position}
        geometry={geometry}
        material={material.current}
        scale={[0.8, 1, 0.8]}
      />
    );
  },
);
