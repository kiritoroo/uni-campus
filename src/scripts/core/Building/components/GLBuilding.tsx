import { TCambusBuildingData } from "@Types/db.type";
import { TGLTFReference } from "@Types/three.type";
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

interface GLBuildingProps {
  buildingData: TCambusBuildingData;
}

export const GLBuilding = memo(({ buildingData }: GLBuildingProps) => {
  const campusSceneStoreProxy = useCampusSceneStoreProxyInContext();
  const campusStoreProxy = useCampusStoreProxyInContext();
  const buildingStoreProxy = useBuildingStoreProxyInContext();
  const buildingUUID = useBuildingStoreInContext().use.buildingUUID();
  const setBuildingObject = useBuildingStoreInContext().use.setBuildingObject();
  const playSoundFx = useSoundFx();

  const gltf: TGLTFReference = useLoader(GLTFLoader, buildingData.model_url);
  const model = gltf.scenes[0];
  const { camera } = useThree();

  const buildngRef = useRef<THREE.Group | any>(null);

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
      campusStoreProxy.buildingPicked = {
        buidlingUUID: buildingUUID,
      };
    }
  };

  const handleOnPointerEnterBuildingIsNearest = () => {
    buildingStoreProxy.isPointerEnter = true;
    playSoundFx.mouseover();
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
    playSoundFx.mouseclick();
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
      campusStoreProxy.buildingPicked?.buidlingUUID === buildingUUID &&
      !buildingStoreProxy.isPicked
    ) {
      handleOnBuidingPicking();
    } else if (
      (campusStoreProxy.buildingPicked === null ||
        campusStoreProxy.buildingPicked?.buidlingUUID !== buildingUUID) &&
      buildingStoreProxy.isPicked
    ) {
      handleOnBuidingUnPicking();
    }
  });

  useEffect(() => {
    if (buildngRef.current) {
      setBuildingObject(buildngRef.current);
    }
    // objFocusCurveProperty && scene.add(objFocusCurveProperty.line);
  }, []);

  return (
    <group ref={buildngRef}>
      {objWallMergeProperty && (
        <GLWallMerge
          ref={objWallMergeProperty?.ref}
          geometry={objWallMergeProperty?.geometry}
          position={objWallMergeProperty?.position}
        />
      )}
      {objBoundingBoxProperty && (
        <mesh
          geometry={objBoundingBoxProperty?.geometry}
          position={objBoundingBoxProperty?.position}
          material={objBoundingBoxProperty.material}
          visible={false}
          onPointerEnter={handleOnPointerEnterBuilding}
          onPointerLeave={handleOnPointerLeaveBuilding}
          onPointerMove={handleOnPointerMoveBuilding}
          onClick={handleOnPointerClickBuilding}
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
          type={buildingData.type}
        />
      )}
      {objPointMarkerProperty && <GLFocusCurve focusPosition={objPointMarkerProperty.position} />}
    </group>
  );
});
