import { useRef } from "react";
import * as THREE from "three";
import { useCampusSceneStore } from "../../../hooks/useCampuseSceneStore";
import { useBlockStore } from "../hooks/useBlockStore";
import { useBuildingStore } from "../../building/hooks/useBuildingStore";
import { ThreeEvent } from "@react-three/fiber";
import _ from "lodash";
import { useCampusStore } from "../../campus/hooks/useCampusStore";

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
  const blockStore = useBlockStore();

  const campusMode = campusSceneStore.use.campusMode();
  const buildingData = buildingStore.use.buildingData()!;
  const buildingStoreActions = buildingStore.use.actions();
  const blockData = blockStore.use.blockData()!;
  const isPointerEnterBlockNearest = blockStore.use.isPointerEnterBlockNearest();

  const material = useRef<THREE.MeshBasicMaterial>(
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xf45a5b),
      side: THREE.DoubleSide,
      wireframe: true,
      opacity: 1,
      visible: true,
    }),
  );

  const handleOnPointerEnterBoundingBox = _.throttle(
    (e: ThreeEvent<PointerEvent>) => {
      buildingStoreActions.addBlockPointerEnter({
        blockId: blockData.id,
        distance: e.distance,
      });
    },
    200,
    { trailing: false },
  );

  const handleOnPointerLeaveBoundingBox = () => {
    buildingStoreActions.removeBlockPointerEnter(blockData.id);
  };

  const handleOnPointerClick = () => {
    if (!isPointerEnterBlockNearest) return;

    campusStore.setState({ buildingPicked: { buildingId: buildingData.id } });
    buildingStore.setState({ isBuildingPicked: true });
    buildingStore.setState({ blockPicked: { blockId: blockData.id } });
    blockStore.setState({ isBlockPicked: true });
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
      onPointerDown={handleOnPointerClick}
      onClick={handleOnPointerClick}
    />
  );
};

export default GLBoundingBox;
