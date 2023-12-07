import { TBlockSchema } from "@v3/site/schemas/block";
import { useBlockStore } from "./hooks/useBlockStore";
import { useEffect, useMemo } from "react";
import { useBuildingStore } from "../building/hooks/useBuildingStore";
import * as THREE from "three";
import GLBoundingBox from "./webgl/GLBoundingBox";
import GLBlockMarker from "./webgl/GLBlockMarker";

const Entry = ({ blockData }: { blockData: TBlockSchema }) => {
  const buildingStore = useBuildingStore();
  const blockStore = useBlockStore();

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

  return (
    <group>
      {objBoundingBoxProperty && <GLBoundingBox property={objBoundingBoxProperty} />}
      {buildingModelScene && <GLBlockMarker blockData={blockData} />}
    </group>
  );
};

export default Entry;
