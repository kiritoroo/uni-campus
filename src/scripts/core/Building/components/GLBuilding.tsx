import { TCambusBuildingData } from "@Types/db.type";
import { TGLTFReference } from "@Types/three.type";
import { ThreeEvent, useFrame, useLoader, useThree } from "@react-three/fiber";
import { RefObject, memo, useEffect, useRef, useState } from "react";
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

interface GLBuildingProps {
  buildingData: TCambusBuildingData;
}

export const GLBuilding = memo(({ buildingData }: GLBuildingProps) => {
  const campusStoreProxy = useCampusStoreProxyInContext();
  const buildingStoreProxy = useBuildingStoreProxyInContext();
  const buildingUUID = useBuildingStoreInContext().use.buildingUUID();
  const playSoundFx = useSoundFx();

  const gltf: TGLTFReference = useLoader(GLTFLoader, buildingData.model_url);
  const model = gltf.scenes[0];
  const { camera } = useThree();

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

  const objFocusCurveProperty: {
    ref: RefObject<Line2>;
    curve: THREE.CubicBezierCurve3;
    points: THREE.Vector3[];
    // geometry: THREE.BufferGeometry;
    // material: THREE.LineBasicMaterial;
    // line: THREE.Line;
  } | null = (() => {
    if (objPointMarkerProperty === null) return null;
    const curve = new THREE.CubicBezierCurve3(
      objPointMarkerProperty?.position ?? new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(
        (objPointMarkerProperty?.position.x + camera.position.x) / 2,
        objPointMarkerProperty?.position.y,
        (objPointMarkerProperty?.position.z + camera.position.z) / 2,
      ),
      new THREE.Vector3(
        (objPointMarkerProperty?.position.x + camera.position.x) / 2,
        camera.position.y,
        (objPointMarkerProperty?.position.z + camera.position.z) / 2,
      ),
      camera.position,
    );

    const points = curve.getPoints(100);
    // const geometry = new THREE.BufferGeometry().setFromPoints(points);
    // const material = new THREE.LineBasicMaterial({
    //   color: 0xf50359,
    // });
    // const line = new THREE.Line(geometry, material);

    return {
      ref: useRef(null),
      curve,
      points,
      // geometry,
      // material,
      // line,
    };
  })();

  const handleUpdateFocusCurveFollowCamera = () => {
    if (!objFocusCurveProperty || !objPointMarkerProperty) return;
    const cameraPosition = camera.position.clone();
    objFocusCurveProperty.curve.v1 = new THREE.Vector3(
      (objPointMarkerProperty?.position.x + camera.position.x) / 2,
      objPointMarkerProperty?.position.y,
      (objPointMarkerProperty?.position.z + camera.position.z) / 2,
    );
    (objFocusCurveProperty.curve.v2 = new THREE.Vector3(
      (objPointMarkerProperty?.position.x + camera.position.x) / 2,
      camera.position.y,
      (objPointMarkerProperty?.position.z + camera.position.z) / 2,
    )),
      objFocusCurveProperty?.curve.v3.copy(cameraPosition);
    objFocusCurveProperty?.curve.updateArcLengths();

    // const points = objFocusCurveProperty?.curve.getPoints(100);
    // const newGeo = new THREE.BufferGeometry().setFromPoints(points);
    // scene.remove(objFocusCurveProperty.line);
    // const line = new THREE.Line(newGeo, objFocusCurveProperty.material);
    // objFocusCurveProperty.line.geometry = newGeo;
    // console.log(objFocusCurveProperty.ref.current?.geometry);
    // console.log(objFocusCurveProperty.line.geometry.attributes["position"]);
    // const positions = objFocusCurveProperty.geometry.attributes.position.array;
    // const numPoints = points.length;
    // for (let i = 0; i < numPoints; i++) {
    //   positions[i * 3] = positions[i * 3] + 0.4;
    //   positions[i * 3 + 1] = points[i].y;
    //   positions[i * 3 + 2] = points[i].z;
    // }
    // objFocusCurveProperty.geometry.attributes.position.needsUpdate = true;
    // objFocusCurveProperty.line.geometry.setFromPoints(points);
    // objFocusCurveProperty.line.geometry.computeBoundingBox();
    // objFocusCurveProperty.line.geometry.computeBoundingSphere();
    // objFocusCurveProperty.line.geometry.getAttribute("position").needsUpdate = true;
    // if (objFocusCurveProperty.ref.current) {
    //   const points = objFocusCurveProperty?.curve.getPoints(100);
    //   const pValues = points.map((p) => {
    //     return [p.x, p.y, p.z];
    //   });
    //   objFocusCurveProperty.ref.current.geometry.setPositions(pValues.flat());
    // }
  };

  const handleOnPointerEnterBuilding = _.throttle(
    (e: ThreeEvent<PointerEvent>) => {
      if (campusStoreProxy.buildingPicked) return;
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
    if (campusStoreProxy.buildingPicked) return;
    document.body.style.cursor = "auto";
    campusStoreProxy.buildingsPointerEnter = campusStoreProxy.buildingsPointerEnter.filter(
      (data) => data.buildingUUID !== buildingUUID,
    );
  };

  const handleOnPointerMoveBuilding = () => {
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
    playSoundFx.mouseover1();
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
    playSoundFx.mouseover1();
  };

  const handleOnBuidingUnPicking = () => {
    buildingStoreProxy.isPicked = false;
  };

  useFrame(() => {
    handleUpdateFocusCurveFollowCamera();

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
    // objFocusCurveProperty && scene.add(objFocusCurveProperty.line);
  }, []);

  return (
    <group>
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
          visible={true}
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
        />
      )}
      {objFocusCurveProperty && (
        <Line
          ref={objFocusCurveProperty.ref}
          points={objFocusCurveProperty?.points}
          color="#F50359"
          linewidth={2}
        />
      )}
    </group>
  );
});
