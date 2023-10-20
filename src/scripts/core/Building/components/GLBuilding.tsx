import { TCambusBuilding } from "@Types/db.type";
import { TGLTFReference } from "@Types/three.type";
import { ThreeEvent, useFrame, useLoader } from "@react-three/fiber";
import { RefObject, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GLBoundingEffect, TGLBoundingEffectRef } from "./GLBoundingEffect";
import * as THREE from "three";
import { GLBoundingAround, TGLBoundingAroundRef } from "./GLBoundingAround";
import { UIBuildingMarker } from "./UIBuildingMarker";
import _ from "lodash";
import { useBuildingStoreProxyInContext } from "../hooks/useBuildingStoreProxyInContext";
import { useBuildingStoreInContext } from "../hooks/useBuildingStoreInContext";
import { useCampusStoreProxyInContext } from "@Scripts/core/Campus/hooks/useCampusStoreProxyInContext";

interface GLBuildingProps {
  buildingData: TCambusBuilding;
}

export const GLBuilding = ({ buildingData }: GLBuildingProps) => {
  const gltf: TGLTFReference = useLoader(GLTFLoader, buildingData.model_url);
  const model = gltf.scenes[0];

  const campusStoreProxy = useCampusStoreProxyInContext();
  const buildingStoreProxy = useBuildingStoreProxyInContext();
  const buildingUUID = useBuildingStoreInContext().use.building_uuid();

  const objWallProperty: {
    ref: RefObject<THREE.Mesh | any | null>;
    geometry: THREE.BufferGeometry;
    position: THREE.Vector3;
    material: THREE.Material;
  } | null = (() => {
    const obj = model.getObjectByName("wall-merge");
    if (!obj || !(obj instanceof THREE.Mesh)) return null;

    return {
      ref: useRef(null),
      geometry: obj.geometry,
      position: obj.position,
      material: new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xffffff),
        side: THREE.DoubleSide,
      }),
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

  const handleOnpointerEnterBuildingIsNearest = () => {
    buildingStoreProxy.isPointerEnter = true;
    objBoundingFxProperty?.ref.current?.onPointerEnterBuilding();
    objBoundingArroundProperty?.ref.current?.onPointerEnterBuilding();
  };

  const handleOnpointerLeaveBuildingIsNearest = () => {
    buildingStoreProxy.isPointerEnter = false;
    objBoundingFxProperty?.ref.current?.onPointerLeaveBuilding();
    objBoundingArroundProperty?.ref.current?.onPointerLeaveBuilding();
  };

  const handleOnPointerEnterBuilding = _.throttle(
    (e: ThreeEvent<PointerEvent>) => {
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
    document.body.style.cursor = "auto";
    campusStoreProxy.buildingsPointerEnter = campusStoreProxy.buildingsPointerEnter.filter(
      (data) => data.buildingUUID !== buildingUUID,
    );
  };

  const handleOnPointerMoveBuilding = () => {
    document.body.style.cursor = "pointer";
  };

  useFrame(() => {
    if (
      campusStoreProxy.buildingPointerEnterNearest?.buildingUUID === buildingUUID &&
      !buildingStoreProxy.isPointerEnter
    ) {
      handleOnpointerEnterBuildingIsNearest();
    } else if (
      (campusStoreProxy.buildingPointerEnterNearest === null ||
        campusStoreProxy.buildingPointerEnterNearest?.buildingUUID !== buildingUUID) &&
      buildingStoreProxy.isPointerEnter
    ) {
      handleOnpointerLeaveBuildingIsNearest();
    }
  });

  return (
    <group>
      {objWallProperty && (
        <mesh
          ref={objWallProperty?.ref}
          geometry={objWallProperty?.geometry}
          position={objWallProperty?.position}
          material={objWallProperty?.material}
        />
      )}
      {objBoundingBoxProperty && (
        <mesh
          geometry={objBoundingBoxProperty?.geometry}
          position={objBoundingBoxProperty?.position}
          material={objBoundingBoxProperty.material}
          visible={true}
          onPointerEnter={handleOnPointerEnterBuilding}
          onPointerLeave={handleOnPointerLeaveBuilding}
          onPointerMove={handleOnPointerMoveBuilding}
        />
      )}
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
      {objPointMarkerProperty && (
        <UIBuildingMarker
          position={objPointMarkerProperty.position}
          label={buildingData.label}
          uses={buildingData.uses}
        />
      )}
    </group>
  );
};
