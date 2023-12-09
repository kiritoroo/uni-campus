import { TBlockSchema } from "@v3/site/schemas/block";
import { useBlockStore } from "./hooks/useBlockStore";
import { memo, useEffect, useMemo } from "react";
import { useBuildingStore } from "../building/hooks/useBuildingStore";
import * as THREE from "three";
import GLBoundingBox from "./webgl/GLBoundingBox";
import { useCampusSceneStore } from "../../hooks/useCampuseSceneStore";
import { useFrame } from "@react-three/fiber";
import GLBlockMarkerOverview from "./webgl/GLBlockMarkerOverview";

const Entry = memo(({ blockData }: { blockData: TBlockSchema }) => {
  const campusSceneStore = useCampusSceneStore();
  const buildingStore = useBuildingStore();
  const blockStore = useBlockStore();

  const campusCamera = campusSceneStore.use.campusCamera();
  const blockShowInfo = buildingStore.use.blockShowInfo();
  const buildingData = buildingStore.use.buildingData();
  const buildingModelScene = buildingStore.use.buildingModelScene();
  const blockPointerEnterNearest = buildingStore.use.blockPointerEnterNearest();
  const isPointerEnterBuildingNearest = buildingStore.use.isPointerEnterBuildingNearest();
  const blockStoreActions = blockStore.use.actions();
  const isPointerEnterBlockNearest = blockStore.use.isPointerEnterBlockNearest();

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

  return (
    <group>
      {objBoundingBoxProperty && <GLBoundingBox property={objBoundingBoxProperty} />}
      {/* {buildingModelScene && <GLBlockMarkerBySpace blockData={blockData} />} */}
      {buildingModelScene && <GLBlockMarkerOverview blockData={blockData} />}
    </group>
  );
});

export default Entry;
