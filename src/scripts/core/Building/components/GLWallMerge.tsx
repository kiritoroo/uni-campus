import { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import * as THREE from "three";
import { useBuildingStoreProxyInContext } from "../hooks/useBuildingStoreProxyInContext";
import { useCampusStoreProxyInContext } from "@Scripts/core/Campus/hooks/useCampusStoreProxyInContext";
import { useSnapshot } from "valtio";
import { useBuildingStoreInContext } from "../hooks/useBuildingStoreInContext";
import gsap, { Expo } from "gsap";

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
        side: THREE.DoubleSide,
      }),
    );

    useImperativeHandle(ref, () => ({
      object: wallMergeRef.current,
    }));

    const handleIsBuildingNotPicked = () => {
      animateTimeline.clear();
      animateTimeline
        .to(
          material.current.color,
          {
            r: 0.4,
            g: 0.65,
            b: 0.65,
            duration: 0.4,
            ease: Expo.easeInOut,
          },
          "<",
        )
        // .to(
        //   material.current,
        //   {
        //     opacity: 0.5,
        //     ease: Expo.easeInOut,
        //   },
        //   "<",
        // )
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
