import React, { memo } from "react";
import * as THREE from "three";
import { GLBoundingBox } from "./GLBoundingBox";
import { UIBlockMarker } from "./UIBlockMarker";
import { useBlockStoreProxyInContext } from "../hooks/useBlockStoreProxyInContext";
import { useBuildingStoreProxyInContext } from "@Scripts/core/Building/hooks/useBuildingStoreProxyInContext";
import { useFrame } from "@react-three/fiber";
import { useBlockStoreInContext } from "../hooks/useBlockStoreInContext";
import { useSoundFx } from "@Global/hooks/useSoundFx";

interface GLBlockProps {
  blockData: {
    name: string;
    space: string;
    label: string;
    uses: string;
  };
  boundingBoxProperty: {
    geometry: THREE.BufferGeometry;
    position: THREE.Vector3;
    material: THREE.Material;
  } | null;
  pointMarkerProperty: {
    position: THREE.Vector3;
  } | null;
}

export const GLBlock = memo(
  ({ blockData, boundingBoxProperty, pointMarkerProperty }: GLBlockProps) => {
    const buildingStoreProxy = useBuildingStoreProxyInContext();
    const blockStoreProxy = useBlockStoreProxyInContext();
    const blockUUID = useBlockStoreInContext().use.blockUUID();

    const playSoundFx = useSoundFx();

    const handleOnPointerEnterBlockIsNearest = () => {
      blockStoreProxy.isPointerEnter = true;
      playSoundFx.mouseover();
    };

    const handleOnPointerLeaveBlockIsNearest = () => {
      blockStoreProxy.isPointerEnter = false;
    };

    const handleOnBlockPicking = () => {
      blockStoreProxy.isPicked = true;
    };

    const handleOnBlockUnPicking = () => {
      blockStoreProxy.isPicked = false;
      playSoundFx.mouseclick();
    };

    useFrame(() => {
      if (
        buildingStoreProxy.blockPointerEnterNearest?.blockUUID === blockUUID &&
        !blockStoreProxy.isPointerEnter
      ) {
        handleOnPointerEnterBlockIsNearest();
      } else if (
        (buildingStoreProxy.blockPointerEnterNearest === null ||
          buildingStoreProxy.blockPointerEnterNearest?.blockUUID !== blockUUID) &&
        blockStoreProxy.isPointerEnter
      ) {
        handleOnPointerLeaveBlockIsNearest();
      }

      if (buildingStoreProxy.blockPicked?.blockUUID === blockUUID && !blockStoreProxy.isPicked) {
        handleOnBlockPicking();
      } else if (
        (buildingStoreProxy.blockPicked === null ||
          buildingStoreProxy.blockPicked?.blockUUID !== blockUUID) &&
        blockStoreProxy.isPicked
      ) {
        handleOnBlockUnPicking();
      }
    });

    return (
      <group>
        {boundingBoxProperty && <GLBoundingBox property={boundingBoxProperty} />}
        {pointMarkerProperty && (
          <UIBlockMarker
            position={pointMarkerProperty.position}
            label={blockData.label}
            uses={blockData.uses}
            space={blockData.space}
          />
        )}
      </group>
    );
  },
);
