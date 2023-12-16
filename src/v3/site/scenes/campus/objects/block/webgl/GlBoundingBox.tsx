import { memo, useEffect, useRef } from "react";
import * as THREE from "three";
import { useCampusSceneStore } from "../../../hooks/useCampuseSceneStore";
import { useBlockStore } from "../hooks/useBlockStore";
import { useBuildingStore } from "../../building/hooks/useBuildingStore";
import { ThreeEvent } from "@react-three/fiber";
import _ from "lodash";
import { useCampusStore } from "../../campus/hooks/useCampusStore";
import { useSoundFx } from "@v3/site/hooks/useSoundFx";
import { useSpacesStore } from "@v3/site/layouts/widgets/spaces/hooks/useSpacesStore";
import { useNavigate } from "react-router-dom";

interface GLBoundingBoxProps {
  property: {
    geometry: THREE.BufferGeometry;
    position: THREE.Vector3;
  };
}

const GLBoundingBox = memo(({ property }: GLBoundingBoxProps) => {
  const spacesStore = useSpacesStore();
  const campusSceneStore = useCampusSceneStore();
  const campusStore = useCampusStore();
  const buildingStore = useBuildingStore();
  const blockStore = useBlockStore();

  const spacePicked = spacesStore.use.spacePicked();
  const campusMode = campusSceneStore.use.campusMode();
  const blockMode = campusSceneStore.use.blockMode();
  const spaceMode = campusSceneStore.use.spaceMode();
  const buildingData = buildingStore.use.buildingData()!;
  const buildingStoreActions = buildingStore.use.actions();
  const blockData = blockStore.use.blockData()!;
  const isBlockShowInfo = blockStore.use.isBlockShowInfo();
  const isPointerEnterBlockNearest = blockStore.use.isPointerEnterBlockNearest();

  const navigate = useNavigate();
  const playSoundFx = useSoundFx();

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
      if (spacePicked && blockData.space?.id !== spacePicked.spaceId) {
        return;
      }

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

    document.body.style.cursor = "auto";
    playSoundFx.mouseclick();

    if (blockMode) {
      if (isBlockShowInfo) {
        campusStore.setState({ buildingShowInfo: null });
        buildingStore.setState({ isBuildingShowInfo: false });
        buildingStore.setState({ blockShowInfo: null });
        blockStore.setState({ isBlockShowInfo: false });
      } else {
        campusStore.setState({ buildingShowInfo: { buildingId: buildingData.id } });
        buildingStore.setState({ isBuildingShowInfo: true });
        buildingStore.setState({ blockShowInfo: { blockId: blockData.id } });
        blockStore.setState({ isBlockShowInfo: true });
      }
    }

    if (spaceMode) {
      navigate(`${blockData.slug}`);

      campusStore.setState({ buildingPicked: { buildingId: buildingData.id } });
      buildingStore.setState({ isBuildingPicked: true });
      buildingStore.setState({ blockPicked: { blockId: blockData.id } });
      blockStore.setState({ isBlockPicked: true });
    }
  };

  useEffect(() => {
    if (!isPointerEnterBlockNearest) return;
    playSoundFx.mouseover();
  }, [isPointerEnterBlockNearest]);

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
      onClick={handleOnPointerClick}
    />
  );
});

export default GLBoundingBox;
