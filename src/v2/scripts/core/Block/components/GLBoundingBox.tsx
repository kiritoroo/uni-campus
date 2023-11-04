import { useCampusSceneStoreProxyInContext } from "@Scripts/webgl/scene/CampusScene/hooks/useCampusSceneStoreProxyInContext";
import { memo } from "react";
import { ThreeEvent } from "@react-three/fiber";
import * as _ from "lodash";
import { useBuildingStoreProxyInContext } from "@Scripts/core/Building/hooks/useBuildingStoreProxyInContext";
import { useBlockStoreInContext } from "../hooks/useBlockStoreInContext";
import { useBlockStoreProxyInContext } from "../hooks/useBlockStoreProxyInContext";

interface GLBoundingBoxProps {
  property: {
    geometry: THREE.BufferGeometry;
    position: THREE.Vector3;
    material: THREE.Material;
  };
}

export const GLBoundingBox = memo(({ property }: GLBoundingBoxProps) => {
  const campusSceneStoreProxy = useCampusSceneStoreProxyInContext();
  const buildingStoreProxy = useBuildingStoreProxyInContext();
  const blockStoreProxy = useBlockStoreProxyInContext();
  const blockUUID = useBlockStoreInContext().use.blockUUID();

  const handleOnPointerEnterBlock = _.throttle(
    (e: ThreeEvent<PointerEvent>) => {
      if (buildingStoreProxy.blockPicked || campusSceneStoreProxy.mouseState.isMouseSwipe) return;
      document.body.style.cursor = "pointer";
      buildingStoreProxy.blocksPointerEnter.push({
        blockUUID: blockUUID,
        distance: e.distance,
      });
    },
    200,
    { trailing: false },
  );

  const handleOnPointerLeaveBlock = () => {
    if (buildingStoreProxy.blockPicked || campusSceneStoreProxy.mouseState.isMouseSwipe) return;
    document.body.style.cursor = "auto";
    buildingStoreProxy.blocksPointerEnter = buildingStoreProxy.blocksPointerEnter.filter(
      (data) => data.blockUUID !== blockUUID,
    );
  };

  const handleOnPointerMoveBlock = () => {
    if (buildingStoreProxy.blockPicked || campusSceneStoreProxy.mouseState.isMouseSwipe) return;
    document.body.style.cursor = "pointer";
  };

  const handleOnPointerClickBlock = () => {
    if (blockStoreProxy.isPointerEnter) {
      document.body.style.cursor = "auto";
      buildingStoreProxy.blockPicked = {
        blockUUID: blockUUID,
      };
    }
  };

  return (
    <mesh
      geometry={property?.geometry}
      position={property?.position}
      material={property.material}
      visible={false}
      onPointerEnter={handleOnPointerEnterBlock}
      onPointerLeave={handleOnPointerLeaveBlock}
      onPointerMove={handleOnPointerMoveBlock}
      onClick={handleOnPointerClickBlock}
    />
  );
});
