import { TCambusBuildingData } from "src/v2/types/db.type";
import { TGLTFReference } from "src/v2/types/three.type";
import { ThreeEvent, useFrame, useLoader, useThree } from "@react-three/fiber";
import { RefObject, memo, useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GLBoundingEffect, TGLBoundingEffectRef } from "./GLBoundingEffect";
import * as THREE from "three";
import { GLBoundingAround, TGLBoundingAroundRef } from "./GLBoundingAround";
import { UIBuildingMarker } from "./UIBuildingMarker";
import _ from "lodash";
import { useBuildingStoreProxyInContext } from "../hooks/useBuildingStoreProxyInContext";
import { useBuildingStoreInContext } from "../hooks/useBuildingStoreInContext";
import { useCampusStoreProxyInContext } from "@Scripts/core/Campus/hooks/useCampusStoreProxyInContext";
import { useSoundFx } from "@Global/hooks/useSoundFx";
import { GLWallMerge, TGLWallMergeRef } from "./GLWallMerge";
import { Line } from "@react-three/drei";
import { Line2, LineGeometry } from "three-stdlib";
import { GLFocusCurve } from "./GLFocusCurve";
import { useCampusSceneStoreProxyInContext } from "@Scripts/webgl/scene/CampusScene/hooks/useCampusSceneStoreProxyInContext";
import { GLBlock } from "@Scripts/core/Block/components/GLBlock";
import { GLBoundingBox } from "./GLBoundingBox";
import {
  BlockStoreContext,
  BlockStoreProvider,
} from "@Scripts/core/Block/contexts/BlockStoreContext";
import { BlockStoreProxyContextProvider } from "@Scripts/core/Block/contexts/BlockStoreProxyContext";
import { useSnapshot } from "valtio";
import { minOfArray } from "@Utils/math.utils";

interface GLBuildingProps {
  buildingData: TCambusBuildingData;
}

export const GLBuilding = memo(({ buildingData }: GLBuildingProps) => {
  const campusSceneStoreProxy = useCampusSceneStoreProxyInContext();
  const campusStoreProxy = useCampusStoreProxyInContext();
  const buildingStoreProxy = useBuildingStoreProxyInContext();
  const buildingUUID = useBuildingStoreInContext().use.buildingUUID();
  const setBuildingObject = useBuildingStoreInContext().use.setBuildingObject();
  const setBuildingData = useBuildingStoreInContext().use.setBuildingData();
  const { blocksPointerEnter } = useSnapshot(buildingStoreProxy);

  const playSoundFx = useSoundFx();

  const gltf: TGLTFReference = useLoader(GLTFLoader, buildingData.model_url);
  const model = gltf.scenes[0];
  const { camera } = useThree();

  const buildingRef = useRef<THREE.Group | any>(null);

  const objWallMergeProperty: {
    ref: RefObject<TGLWallMergeRef>;
    geometry: THREE.BufferGeometry;
    position: THREE.Vector3;
  } | null = (() => {
    const obj = model.getObjectByName("wall-merge");
    if (!obj || !(obj instanceof THREE.Mesh)) return null;

    return {
      ref: useRef(null),
      geometry: obj.geometry,
      position: obj.position,
    };
  })();

  const objBoundingBoxProperty: {
    geometry: THREE.BufferGeometry;
    position: THREE.Vector3;
    material: THREE.Material;
  } | null = (() => {
    const obj = model.getObjectByName("bounding-box");
    if (!obj || !(obj instanceof THREE.Mesh)) return null;

    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xf6b2b5),
    });
    material.wireframe = true;

    return {
      geometry: obj.geometry,
      position: obj.position,
      material,
    };
  })();

  const objBoundingFxProperty: {
    ref: RefObject<TGLBoundingEffectRef>;
    geometry: THREE.BufferGeometry;
    position: THREE.Vector3;
  } | null = (() => {
    const obj = model.getObjectByName("bounding-effect");
    if (!obj || !(obj instanceof THREE.Mesh)) return null;

    return {
      ref: useRef(null),
      geometry: obj.geometry,
      position: obj.position,
    };
  })();

  const objBoundingArroundProperty: {
    ref: RefObject<TGLBoundingAroundRef>;
    geometry: THREE.BufferGeometry;
    position: THREE.Vector3;
  } | null = (() => {
    const obj = model.getObjectByName("bounding-around");
    if (!obj || !(obj instanceof THREE.Mesh)) return null;

    return {
      ref: useRef(null),
      geometry: obj.geometry,
      position: obj.position,
    };
  })();

  const objPointMarkerProperty: {
    position: THREE.Vector3;
  } | null = (() => {
    const obj = model.getObjectByName("point-marker");
    if (!obj || !(obj instanceof THREE.Object3D)) return null;

    return {
      position: obj.position,
    };
  })();

  const handleOnPointerEnterBuildingIsNearest = () => {
    buildingStoreProxy.isPointerEnter = true;
    if (!buildingData.blocks || (buildingData?.blocks ?? []).length === 0) {
      playSoundFx.mouseover();
    }
    objBoundingFxProperty?.ref.current?.onPointerEnterBuilding();
    objBoundingArroundProperty?.ref.current?.onPointerEnterBuilding();
  };

  const handleOnPointerLeaveBuildingIsNearest = () => {
    buildingStoreProxy.isPointerEnter = false;
    objBoundingFxProperty?.ref.current?.onPointerLeaveBuilding();
    objBoundingArroundProperty?.ref.current?.onPointerLeaveBuilding();
  };

  const handleOnBuidingPicking = () => {
    buildingStoreProxy.isPicked = true;
    if (!buildingData.blocks || (buildingData?.blocks ?? []).length === 0) {
      playSoundFx.mouseclick();
    }
  };

  const handleOnBuidingUnPicking = () => {
    buildingStoreProxy.isPicked = false;
  };

  useFrame(() => {
    if (
      campusStoreProxy.buildingPointerEnterNearest?.buildingUUID === buildingUUID &&
      !buildingStoreProxy.isPointerEnter
    ) {
      handleOnPointerEnterBuildingIsNearest();
    } else if (
      (campusStoreProxy.buildingPointerEnterNearest === null ||
        campusStoreProxy.buildingPointerEnterNearest?.buildingUUID !== buildingUUID) &&
      buildingStoreProxy.isPointerEnter
    ) {
      handleOnPointerLeaveBuildingIsNearest();
    }

    if (
      campusStoreProxy.buildingPicked?.buildingUUID === buildingUUID &&
      !buildingStoreProxy.isPicked
    ) {
      handleOnBuidingPicking();
    } else if (
      (campusStoreProxy.buildingPicked === null ||
        campusStoreProxy.buildingPicked?.buildingUUID !== buildingUUID) &&
      buildingStoreProxy.isPicked
    ) {
      handleOnBuidingUnPicking();
    }
  });

  useEffect(() => {
    if (buildingRef.current) {
      setBuildingObject(buildingRef.current);
    }
    // objFocusCurveProperty && scene.add(objFocusCurveProperty.line);
  }, [buildingRef.current]);

  useEffect(() => {
    setBuildingData(buildingData);
  }, []);

  useEffect(() => {
    if (buildingStoreProxy.blocksPointerEnter.length > 0) {
      const nearestBlock = minOfArray(
        buildingStoreProxy.blocksPointerEnter,
        (data) => data.distance,
      );
      buildingStoreProxy.blockPointerEnterNearest = {
        blockUUID: nearestBlock.blockUUID,
      };
    } else if (
      buildingStoreProxy.blocksPointerEnter.length === 0 &&
      buildingStoreProxy.blockPointerEnterNearest !== null
    ) {
      buildingStoreProxy.blockPointerEnterNearest = null;
    }
  }, [blocksPointerEnter]);

  useFrame(() => {
    if (campusSceneStoreProxy.mouseState.isMouseSwipe && blocksPointerEnter.length > 0) {
      buildingStoreProxy.blocksPointerEnter = [];
      buildingStoreProxy.blockPointerEnterNearest = null;
    }
  });

  return (
    <group ref={buildingRef}>
      {objWallMergeProperty && (
        <GLWallMerge
          ref={objWallMergeProperty?.ref}
          geometry={objWallMergeProperty?.geometry}
          position={objWallMergeProperty?.position}
        />
      )}
      {objBoundingBoxProperty && <GLBoundingBox property={objBoundingBoxProperty} />}
      {objBoundingFxProperty && (
        <GLBoundingEffect
          ref={objBoundingFxProperty.ref}
          geometry={objBoundingFxProperty.geometry}
          position={objBoundingFxProperty.position}
        />
      )}
      {objBoundingArroundProperty && (
        <GLBoundingAround
          ref={objBoundingArroundProperty.ref}
          geometry={objBoundingArroundProperty.geometry}
          position={objBoundingArroundProperty.position}
        />
      )}
      {objPointMarkerProperty && buildingData.label && (
        <UIBuildingMarker
          position={objPointMarkerProperty.position}
          label={buildingData.label}
          uses={buildingData.uses}
          space={buildingData.space}
        />
      )}
      {objPointMarkerProperty && <GLFocusCurve focusPosition={objPointMarkerProperty.position} />}

      {/* Building with blocks */}
      {buildingData.blocks &&
        buildingData.blocks?.map((blockData) => {
          const objBlockBoundingBoxProperty: {
            geometry: THREE.BufferGeometry;
            position: THREE.Vector3;
            material: THREE.Material;
          } | null = (() => {
            const obj = model.getObjectByName(`${blockData.name}_bounding-box`);
            if (!obj || !(obj instanceof THREE.Mesh)) return null;

            const material = new THREE.MeshBasicMaterial({
              color: new THREE.Color(0x5bad64),
            });
            material.wireframe = true;

            return {
              geometry: obj.geometry,
              position: obj.position,
              material,
            };
          })();

          const objBlockPointMarkerProperty: {
            position: THREE.Vector3;
          } | null = (() => {
            const obj = model.getObjectByName(`${blockData.name}_point-marker`);
            if (!obj || !(obj instanceof THREE.Object3D)) return null;

            return {
              position: obj.position,
            };
          })();

          return (
            <BlockStoreProvider key={blockData.name}>
              <BlockStoreProxyContextProvider>
                <GLBlock
                  blockData={blockData}
                  boundingBoxProperty={objBlockBoundingBoxProperty}
                  pointMarkerProperty={objBlockPointMarkerProperty}
                />
              </BlockStoreProxyContextProvider>
            </BlockStoreProvider>
          );
        })}
    </group>
  );
});
