import { TBlockSchema } from "@v3/site/schemas/block";
import { useBlockStore } from "./hooks/useBlockStore";
import { useEffect, useMemo } from "react";
import { useBuildingStore } from "../building/hooks/useBuildingStore";
import * as THREE from "three";
import GLBoundingBox from "./webgl/GlBoundingBox";

const Entry = ({ blockData }: { blockData: TBlockSchema }) => {
  const buildingStore = useBuildingStore();
  const blockStore = useBlockStore();

  const buildingScene = buildingStore.use.buildingScene();
  const blockStoreActions = blockStore.use.actions();

  const objBoundingBoxProperty = useMemo<{
    geometry: THREE.BufferGeometry;
    position: THREE.Vector3;
  } | null>(() => {
    if (!buildingScene) return null;
    const obj = buildingScene.getObjectByName(`${blockData.obj_name}_bounding-box`);
    if (!obj || !(obj instanceof THREE.Mesh)) return null;

    return {
      geometry: obj.geometry,
      position: obj.position,
    };
  }, [buildingScene]);

  useEffect(() => {
    blockStoreActions.initBlockData({ blockData: blockData });
  }, []);

  return (
    <group>{objBoundingBoxProperty && <GLBoundingBox property={objBoundingBoxProperty} />}</group>
  );
};

export default Entry;
