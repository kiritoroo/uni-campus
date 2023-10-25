import { useCampusStoreProxyInContext } from "@Scripts/core/Campus/hooks/useCampusStoreProxyInContext";
import { useCampusSceneStoreProxyInContext } from "@Scripts/webgl/scene/CampusScene/hooks/useCampusSceneStoreProxyInContext";
import { memo } from "react";
import { useBuildingStoreProxyInContext } from "../hooks/useBuildingStoreProxyInContext";
import { useBuildingStoreInContext } from "../hooks/useBuildingStoreInContext";
import { ThreeEvent } from "@react-three/fiber";
import * as _ from "lodash";

interface GLBoundingBoxProps {
  property: {
    geometry: THREE.BufferGeometry;
    position: THREE.Vector3;
    material: THREE.Material;
  };
}

export const GLBoundingBox = memo(({ property }: GLBoundingBoxProps) => {
  const campusSceneStoreProxy = useCampusSceneStoreProxyInContext();
  const campusStoreProxy = useCampusStoreProxyInContext();
  const buildingStoreProxy = useBuildingStoreProxyInContext();
  const buildingUUID = useBuildingStoreInContext().use.buildingUUID();

  const handleOnPointerEnterBuilding = _.throttle(
    (e: ThreeEvent<PointerEvent>) => {
      if (campusStoreProxy.buildingPicked || campusSceneStoreProxy.mouseState.isMouseSwipe) return;
      document.body.style.cursor = "pointer";
      campusStoreProxy.buildingsPointerEnter.push({
        buildingUUID: buildingUUID,
        distance: e.distance,
      });
    },
    200,
    { trailing: false },
  );

  const handleOnPointerLeaveBuilding = () => {
    if (campusStoreProxy.buildingPicked || campusSceneStoreProxy.mouseState.isMouseSwipe) return;
    document.body.style.cursor = "auto";
    campusStoreProxy.buildingsPointerEnter = campusStoreProxy.buildingsPointerEnter.filter(
      (data) => data.buildingUUID !== buildingUUID,
    );
  };

  const handleOnPointerMoveBuilding = () => {
    if (campusStoreProxy.buildingPicked || campusSceneStoreProxy.mouseState.isMouseSwipe) return;
    document.body.style.cursor = "pointer";
  };

  const handleOnPointerClickBuilding = () => {
    if (buildingStoreProxy.isPointerEnter) {
      document.body.style.cursor = "auto";
      campusStoreProxy.buildingPicked = {
        buidlingUUID: buildingUUID,
      };
    }
  };

  return (
    <mesh
      geometry={property?.geometry}
      position={property?.position}
      material={property.material}
      visible={true}
      onPointerEnter={handleOnPointerEnterBuilding}
      onPointerLeave={handleOnPointerLeaveBuilding}
      onPointerMove={handleOnPointerMoveBuilding}
      onClick={handleOnPointerClickBuilding}
    />
  );
});
