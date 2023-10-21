import { campus_buildings_data } from "@Assets/db";
import { GLBuilding } from "@Scripts/core/Building/components/GLBuilding";
import { BuildingStoreProvider } from "@Scripts/core/Building/contexts/BuildingStoreContext";
import { BuildingStoreProxyProvider } from "@Scripts/core/Building/contexts/buildingStoreProxyContext";
import { useCampusStoreProxyInContext } from "../hooks/useCampusStoreProxyInContext";
import { minOfArray } from "@Utils/math.utils";
import { useSnapshot } from "valtio";
import { memo, useEffect } from "react";
import { GLGroundLayer } from "@Scripts/core/Campus/components/GLGroundLayer";
import { GLGrassLayer } from "@Scripts/core/Campus/components/GLGrassLayer";
import { GLBoundingCurve } from "./GLBoundingCurve";
import { GLCampusCamera } from "./GLCampusCamera";
import { GLCampusControls } from "./GLCampusControls";

export const GLCampus = memo(() => {
  const campusStoreProxy = useCampusStoreProxyInContext();
  const { buildingsPointerEnter } = useSnapshot(campusStoreProxy);

  useEffect(() => {
    if (campusStoreProxy.buildingsPointerEnter.length > 0) {
      const nearestBuilding = minOfArray(
        campusStoreProxy.buildingsPointerEnter,
        (data) => data.distance,
      );
      campusStoreProxy.buildingPointerEnterNearest = {
        buildingUUID: nearestBuilding.buildingUUID,
      };
    } else if (
      campusStoreProxy.buildingsPointerEnter.length === 0 &&
      campusStoreProxy.buildingPointerEnterNearest !== null
    ) {
      campusStoreProxy.buildingPointerEnterNearest = null;
    }
  }, [buildingsPointerEnter]);

  return (
    <group>
      <GLGroundLayer />
      <GLGrassLayer />
      <GLBoundingCurve />
      <GLCampusCamera />
      <GLCampusControls />

      {campus_buildings_data.map((building_data) => (
        <BuildingStoreProvider key={building_data.name}>
          <BuildingStoreProxyProvider>
            <GLBuilding buildingData={building_data} />
          </BuildingStoreProxyProvider>
        </BuildingStoreProvider>
      ))}
    </group>
  );
});
