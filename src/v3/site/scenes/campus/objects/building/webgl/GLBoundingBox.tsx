import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useCampusSceneStore } from "../../../hooks/useCampuseSceneStore";
import { useCampusStore } from "../../campus/hooks/useCampusStore";
import _ from "lodash";
import { ThreeEvent } from "@react-three/fiber";
import { useBuildingStore } from "../hooks/useBuildingStore";

interface GLBoundingBoxProps {
  property: {
    geometry: THREE.BufferGeometry;
    position: THREE.Vector3;
  };
}

const GLBoundingBox = ({ property }: GLBoundingBoxProps) => {
  const campusSceneStore = useCampusSceneStore();
  const campusStore = useCampusStore();
  const buildingStore = useBuildingStore();

  const campusMode = campusSceneStore.use.campusMode();
  const buildingPicked = campusStore.use.buildingPicked();
  const campusStoreActions = campusStore.use.actions();
  const buildingData = buildingStore.use.buildingData()!;

  const material = useRef<THREE.MeshBasicMaterial>(
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(0.21, 0.35, 0.67),
      side: THREE.DoubleSide,
      wireframe: true,
      opacity: 1,
      visible: true,
    }),
  );

  const handleOnPointerEnterBoundingBox = _.throttle(
    (e: ThreeEvent<PointerEvent>) => {
      if (buildingPicked) return;

      document.body.style.cursor = "pointer";
      campusStoreActions.addBuildingPointerEnter({
        buildingId: buildingData?.id,
        distance: e.distance,
      });
    },
    200,
    { trailing: false },
  );

  const handleOnPointerLeaveBoundingBox = () => {
    if (buildingPicked) return;

    document.body.style.cursor = "auto";
    campusStoreActions.removeBuildingPointerEnter(buildingData.id);
  };

  const handleOnPointerMoveBoundingBox = () => {
    if (buildingPicked) return;

    document.body.style.cursor = "pointer";
  };

  return (
    <mesh
      castShadow={false}
      receiveShadow={false}
      geometry={property?.geometry}
      position={property?.position}
      material={material.current}
      visible={campusMode === "dev" ? true : false}
      onPointerEnter={handleOnPointerEnterBoundingBox}
      onPointerLeave={handleOnPointerLeaveBoundingBox}
      onPointerMove={handleOnPointerMoveBoundingBox}
    />
  );
};

export default GLBoundingBox;
