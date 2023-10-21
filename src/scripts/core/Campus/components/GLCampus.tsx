import { campus_buildings_data } from "@Assets/db";
import { GLBuilding } from "@Scripts/core/Building/components/GLBuilding";
import { BuildingStoreProvider } from "@Scripts/core/Building/contexts/BuildingStoreContext";
import { BuildingStoreProxyProvider } from "@Scripts/core/Building/contexts/buildingStoreProxyContext";
import { useCampusStoreProxyInContext } from "../hooks/useCampusStoreProxyInContext";
import { minOfArray } from "@Utils/math.utils";
import { useSnapshot } from "valtio";
import { useEffect } from "react";
import { GLGroundLayer } from "@Scripts/core/Campus/components/GLGroundLayer";
import { GLGrassLayer } from "@Scripts/core/Campus/components/GLGrassLayer";
import { GLBoundingCurve } from "./GLBoundingCurve";
import { GlCampusCamera } from "./GlCampusCamera";

export const GLCampus = () => {
  const campusStoreProxy = useCampusStoreProxyInContext();
  const snapCampusStoreProxy = useSnapshot(campusStoreProxy);

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
  }, [snapCampusStoreProxy.buildingsPointerEnter]);

  return (
    <group>
      <GLGroundLayer />
      <GLGrassLayer />
      <GLBoundingCurve />
      <GlCampusCamera />
      {campus_buildings_data.map((building_data) => (
        <BuildingStoreProvider key={building_data.name}>
          <BuildingStoreProxyProvider>
            <GLBuilding buildingData={building_data} />
          </BuildingStoreProxyProvider>
        </BuildingStoreProvider>
      ))}
    </group>
  );
};
