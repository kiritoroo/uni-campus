import gsap, { Expo } from "gsap";
import { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import * as THREE from "three";
import { useBuildingStoreProxyInContext } from "../hooks/useBuildingStoreProxyInContext";
import { useSnapshot } from "valtio";
import { useBuildingStoreInContext } from "../hooks/useBuildingStoreInContext";
import { useCampusStoreProxyInContext } from "@Scripts/core/Campus/hooks/useCampusStoreProxyInContext";

export type TGLBoundingAroundRef = {
  object: THREE.Mesh;
  onPointerEnterBuilding: () => void;
  onPointerLeaveBuilding: () => void;
};

interface IGlBoundingArroundProps {
  position: THREE.Vector3;
  geometry: THREE.BufferGeometry;
}

export const GLBoundingAround = memo(
  forwardRef<TGLBoundingAroundRef, IGlBoundingArroundProps>(({ geometry, position }, ref) => {
    const campusStoreProxy = useCampusStoreProxyInContext();
    const buildingStoreProxy = useBuildingStoreProxyInContext();
    const { isPicked } = useSnapshot(buildingStoreProxy);
    const { buildingPicked } = useSnapshot(campusStoreProxy);
    const buildingUUID = useBuildingStoreInContext().use.buildingUUID();

    const boundingArroundRef = useRef<THREE.Mesh | any>(null);
    const animateTimeline = useMemo(() => {
      return gsap.timeline();
    }, []);

    const material = useRef<THREE.MeshBasicMaterial>(
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(0.21, 0.35, 0.67),
        side: THREE.DoubleSide,
        transparent: true,
        depthWrite: false,
        depthTest: true,
        opacity: 0,
        visible: false,
      }),
    );

    const handleOnPointerEnterBuilding = () => {
      animateTimeline.clear();
      material.current.visible = true;
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
          .to(
            (boundingArroundRef.current as THREE.Mesh).position,
            {
              y: position.y + 0.5,
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
          .to(
            (boundingArroundRef.current as THREE.Mesh).position,
            {
              y: position.y - 0.5,
              ease: Expo.easeInOut,
              duration: 0.3,
              onComplete: () => {
                material.current.visible = false;
              },
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

    useEffect(() => {
      if (isPicked) {
        animateTimeline.clear();
        animateTimeline
          .to(
            material.current,
            {
              opacity: 0,
              ease: Expo.easeInOut,
              duration: 0.5,
              onComplete: () => {
                (boundingArroundRef.current as THREE.Mesh).visible = false;
              },
            },
            "<",
          )
          .play();
      }
    }, [isPicked]);

    useEffect(() => {
      if (buildingPicked !== null && buildingPicked.buildingUUID !== buildingUUID && !isPicked) {
        (boundingArroundRef.current as THREE.Mesh).visible = false;
      }
    }, [buildingPicked, isPicked]);

    return (
      <mesh
        ref={boundingArroundRef}
        castShadow={false}
        receiveShadow={false}
        position={position}
        geometry={geometry}
        material={material.current}
        scale={[0.8, 1, 0.8]}
        renderOrder={999}
        onBeforeRender={(gl) => {
          // gl.clearDepth();
        }}
      />
    );
  }),
);
