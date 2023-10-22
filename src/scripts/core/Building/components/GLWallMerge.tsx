import { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import * as THREE from "three";
import { useBuildingStoreProxyInContext } from "../hooks/useBuildingStoreProxyInContext";
import { useCampusStoreProxyInContext } from "@Scripts/core/Campus/hooks/useCampusStoreProxyInContext";
import { useSnapshot } from "valtio";
import { useBuildingStoreInContext } from "../hooks/useBuildingStoreInContext";
import gsap, { Expo, Power2 } from "gsap";

export type TGLWallMergeRef = {
  object: THREE.Mesh;
};

interface IGLWallMergeProps {
  geometry: THREE.BufferGeometry;
  position: THREE.Vector3;
}

export const GLWallMerge = memo(
  forwardRef<TGLWallMergeRef, IGLWallMergeProps>(({ geometry, position }, ref) => {
    const campusStoreProxy = useCampusStoreProxyInContext();
    const buildingStoreProxy = useBuildingStoreProxyInContext();
    const { buildingPicked } = useSnapshot(campusStoreProxy);
    const { isPicked } = useSnapshot(buildingStoreProxy);
    const buildingUUID = useBuildingStoreInContext().use.buildingUUID();

    const wallMergeRef = useRef<THREE.Mesh | any>(null);
    const animateTimeline = useMemo(() => {
      return gsap.timeline();
    }, []);

    const material = useRef<THREE.MeshStandardMaterial>(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xffffff),
        transparent: true,
        roughness: 0.8,
        side: THREE.FrontSide,
      }),
    );

    useImperativeHandle(ref, () => ({
      object: wallMergeRef.current,
    }));

    const handleIsBuildingNotPicked = () => {
      if (!wallMergeRef.current) return;

      (wallMergeRef.current as THREE.Mesh).castShadow = false;
      (wallMergeRef.current as THREE.Mesh).receiveShadow = false;
      material.current.depthWrite = false;
      material.current.depthTest = false;
      animateTimeline.clear();
      animateTimeline
        // .to(
        //   material.current.color,
        //   {
        //     r: 0.8,
        //     g: 0.8,
        //     b: 0.8,
        //     duration: 0.4,
        //     ease: Expo.easeInOut,
        //   },
        //   "<",
        // )
        .to(
          material.current,
          {
            opacity: 0,
            ease: Power2.easeInOut,
            duration: 0.5,
            onComplete: () => {
              (wallMergeRef.current as THREE.Mesh).visible = false;
            },
          },
          "<",
        )
        .play();
    };

    useEffect(() => {
      if (buildingPicked !== null && buildingPicked.buidlingUUID !== buildingUUID && !isPicked) {
        handleIsBuildingNotPicked();
      }
    }, [buildingPicked, isPicked]);

    return (
      <mesh
        ref={wallMergeRef}
        geometry={geometry}
        position={position}
        material={material.current}
        castShadow
        receiveShadow
      />
    );
  }),
);
