import { campus_buildings_data } from "@Assets/db";
import { GLBuilding } from "@Scripts/core/Building/components/GLBuilding";
import { BuildingStoreProvider } from "@Scripts/core/Building/contexts/BuildingStoreContext";
import { BuildingStoreProxyProvider } from "@Scripts/core/Building/contexts/buildingStoreProxyContext";
import { useCampusStoreProxyInContext } from "../hooks/useCampusStoreProxyInContext";
import { useFrame } from "@react-three/fiber";
import { minOfArray } from "@Utils/math.utils";

export const GLCampus = () => {
  const campusStoreProxy = useCampusStoreProxyInContext();

  useFrame(() => {
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
  });

  return (
    <group>
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
