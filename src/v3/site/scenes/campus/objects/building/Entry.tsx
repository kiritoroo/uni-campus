import { TBuildingSchema } from "@v3/site/schemas/building";
import { useBuildingStore } from "./hooks/useBuildingStore";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

const Entry = ({ buildingData }: { buildingData: TBuildingSchema }) => {
  const buildingStore = useBuildingStore();

  const buildingActions = buildingStore.use.actions();
  const buildingScene = buildingStore.use.buildingScene();

  const objGroupMergeProperty = useMemo<{
    group: THREE.Group;
  } | null>(() => {
    if (!buildingScene) return null;
    const obj = buildingScene.getObjectByName("group-merge");
    if (!obj || !(obj instanceof THREE.Group)) return null;

    return {
      group: obj,
    };
  }, [buildingScene]);

  useEffect(() => {
    buildingActions.initBuildingData({ buildingData: buildingData });
  }, []);

  return (
    <group
      position={[buildingData.position.x, buildingData.position.y, buildingData.position.z]}
      rotation={[buildingData.rotation.x, buildingData.rotation.y, buildingData.rotation.z]}
      scale={[buildingData.scale.x, buildingData.scale.y, buildingData.scale.z]}
    >
      {objGroupMergeProperty && <primitive object={objGroupMergeProperty.group} />}
    </group>
  );
};

export default Entry;
