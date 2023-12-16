import { TBlockSchema } from "@v3/site/schemas/block";
import { useBlockStore } from "./hooks/useBlockStore";
import { memo, useEffect, useMemo } from "react";
import { useBuildingStore } from "../building/hooks/useBuildingStore";
import * as THREE from "three";
import { useCampusSceneStore } from "../../hooks/useCampuseSceneStore";
import { useFrame } from "@react-three/fiber";
import GLBlockMarkerOverview from "./webgl/GLBlockMarkerOverview";
import { useNavigate, useParams } from "react-router-dom";
import { useCampusStore } from "../campus/hooks/useCampusStore";
import GLBoundingBox from "./webgl/GlBoundingBox";
import GLBlockMarkerBySpace from "./webgl/GLBlockMarkerBySpace";

const Entry = memo(({ blockData }: { blockData: TBlockSchema }) => {
  const campusSceneStore = useCampusSceneStore();
  const campusStore = useCampusStore();
  const buildingStore = useBuildingStore();
  const blockStore = useBlockStore();

  const campusCamera = campusSceneStore.use.campusCamera();
  const blockMode = campusSceneStore.use.blockMode();
  const spaceMode = campusSceneStore.use.spaceMode();
  const blockShowInfo = buildingStore.use.blockShowInfo();
  const buildingObject = buildingStore.use.buildingObject();
  const buildingData = buildingStore.use.buildingData()!;
  const buildingModelScene = buildingStore.use.buildingModelScene();
  const blockPointerEnterNearest = buildingStore.use.blockPointerEnterNearest();
  const isPointerEnterBuildingNearest = buildingStore.use.isPointerEnterBuildingNearest();
  const blockStoreActions = blockStore.use.actions();
  const isPointerEnterBlockNearest = blockStore.use.isPointerEnterBlockNearest();
  const isBlockPicked = blockStore.use.isBlockPicked();

  const params = useParams();
  const navigate = useNavigate();

  const objBoundingBoxProperty = useMemo<{
    geometry: THREE.BufferGeometry;
    position: THREE.Vector3;
  } | null>(() => {
    if (!buildingModelScene) return null;
    const obj = buildingModelScene.getObjectByName(`${blockData.obj_name}_bounding-box`);
    if (!obj || !(obj instanceof THREE.Mesh)) return null;

    return {
      geometry: obj.geometry,
      position: obj.position,
    };
  }, [buildingModelScene]);

  useEffect(() => {
    blockStoreActions.initBlockData({ blockData: blockData });
  }, []);

  useEffect(() => {
    if (blockPointerEnterNearest) {
      if (blockPointerEnterNearest.blockId === blockData.id && isPointerEnterBuildingNearest) {
        blockStore.setState({ isPointerEnterBlockNearest: true });
      }

      if (blockPointerEnterNearest.blockId !== blockData.id && isPointerEnterBlockNearest) {
        blockStore.setState({ isPointerEnterBlockNearest: false });
      }

      if (!isPointerEnterBuildingNearest && isPointerEnterBlockNearest) {
        blockStore.setState({ isPointerEnterBlockNearest: false });
      }
    }

    if (!blockPointerEnterNearest) {
      if (isPointerEnterBlockNearest) {
        blockStore.setState({ isPointerEnterBlockNearest: false });
      }
    }
  }, [isPointerEnterBuildingNearest, blockPointerEnterNearest]);

  useFrame(() => {
    if (!campusCamera) return;
    if (!buildingData) return;

    const cameraPosition = campusCamera.getWorldPosition(new THREE.Vector3());
    const distanceToBlock = cameraPosition.distanceTo(
      new THREE.Vector3(
        blockData.marker_position.x + buildingData?.position.x,
        blockData.marker_position.y + buildingData?.position.y,
        blockData.marker_position.z + buildingData?.position.z,
      ),
    );
    blockStore.setState({ distanceFromCameraToBlock: distanceToBlock });
  });

  useEffect(() => {
    if (blockShowInfo?.blockId === blockData.id) return;

    blockStore.setState({ isBlockShowInfo: false });
  }, [blockShowInfo]);

  useEffect(() => {
    if (!buildingData) return;
    if (!blockData) return;
    if (!campusCamera) return;
    if (!buildingObject) return;

    if (`/${params["*"]}` === blockData.slug) {
      setTimeout(() => {
        campusStore.setState({ buildingPicked: { buildingId: buildingData.id } });
        buildingStore.setState({ isBuildingPicked: true });
        buildingStore.setState({ blockPicked: { blockId: blockData.id } });
        blockStore.setState({ isBlockPicked: true });
      }, 500);
    }
  }, [buildingObject, campusCamera, buildingData, blockData, params]);

  useEffect(() => {
    if (!params["*"]) {
      if (isBlockPicked) {
        campusStore.setState({ buildingPicked: null });
        buildingStore.setState({ isBuildingPicked: false });
        buildingStore.setState({ blockPicked: null });
        blockStore.setState({ isBlockPicked: false });
        blockStore.setState({ isBlockShowInfo: false });
      }
    }
  }, [params, isBlockPicked]);

  return (
    <group>
      {objBoundingBoxProperty && <GLBoundingBox property={objBoundingBoxProperty} />}
      {/* {buildingModelScene && <GLBlockMarkerBySpace blockData={blockData} />} */}
      {buildingModelScene && blockMode && <GLBlockMarkerOverview blockData={blockData} />}
      {buildingModelScene && spaceMode && <GLBlockMarkerBySpace blockData={blockData} />}
    </group>
  );
});

export default Entry;
