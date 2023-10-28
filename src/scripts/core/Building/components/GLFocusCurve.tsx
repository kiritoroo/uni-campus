import { useCampusStoreInContext } from "@Scripts/core/Campus/hooks/useCampusStoreInContext";
import { clamp, randomRand } from "@Utils/math.utils";
import { Line } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { RefObject, memo, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useBuildingStoreInContext } from "../hooks/useBuildingStoreInContext";
import { useBuildingStoreProxyInContext } from "../hooks/useBuildingStoreProxyInContext";
import { useSnapshot } from "valtio";
import gsap, { Expo, Power4, Linear, Quart, Power2 } from "gsap";
import { OrbitControls } from "three-stdlib";
import { useCampusSceneStoreProxyInContext } from "@Scripts/webgl/scene/CampusScene/hooks/useCampusSceneStoreProxyInContext";
import { useCampusStoreProxyInContext } from "@Scripts/core/Campus/hooks/useCampusStoreProxyInContext";

interface GLFocusCurveProps {
  focusPosition: THREE.Vector3;
}

export const GLFocusCurve = memo(({ focusPosition }: GLFocusCurveProps) => {
  const campusSceneStoreProxy = useCampusSceneStoreProxyInContext();
  const campusStoreProxy = useCampusStoreProxyInContext();
  const buildingStoreProxy = useBuildingStoreProxyInContext();
  const campusCamera = useCampusStoreInContext().use.campusCamera();
  const buildingObject = useBuildingStoreInContext().use.buildingObject();
  // const campusControls = useCampusStoreInContext().use.campusControls();
  const { cameraState } = useSnapshot(campusSceneStoreProxy);
  const { buildingPicked } = useSnapshot(campusStoreProxy);
  const { isPicked } = useSnapshot(buildingStoreProxy);

  const { scene, controls } = useThree();
  const animateCameraTimeline = useMemo(() => {
    return gsap.timeline();
  }, []);
  const animateControlsTimeline = useMemo(() => {
    return gsap.timeline();
  }, []);

  const OFFSET_FOCUS_DISTANCE = useRef(80);
  const progress = useRef({
    v: 0,
  });
  const saveLastPositionBeforefocus = useRef<THREE.Vector3>(new THREE.Vector3());
  const positionTarget = useRef<THREE.Vector3>(new THREE.Vector3());
  const binormalTarget = useRef<THREE.Vector3>(new THREE.Vector3());
  const directionTarget = useRef<THREE.Vector3>(new THREE.Vector3());
  const normalTarget = useRef<THREE.Vector3>(new THREE.Vector3());
  const lookAtTarget = useRef<THREE.Vector3>(new THREE.Vector3());
  const centerTarget = useRef<THREE.Vector3>(new THREE.Vector3());
  const boxTarget = useRef<THREE.Box3>(new THREE.Box3());
  const maxDistanceFromCameraToFocus = useRef<number>(0);

  const objFocusCurveProperty = useMemo<{
    cubicBezierCurve: THREE.CubicBezierCurve3;
    catmullRomCurve: THREE.CatmullRomCurve3;
    cubicBezierPoints: THREE.Vector3[];
    catmullRomPoints: THREE.Vector3[];
  }>(() => {
    const cubicBezierCurve = new THREE.CubicBezierCurve3();
    const cubicBezierPoints = cubicBezierCurve.getPoints(200);

    const catmullRomCurve = new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3()]);
    const catmullRomPoints = catmullRomCurve.getPoints(200);

    return {
      cubicBezierCurve,
      cubicBezierPoints,
      catmullRomCurve,
      catmullRomPoints,
    };
  }, []);

  const objCubicBezierLine = useRef<THREE.Line | null>(null);

  const objCatmullRomLine = useMemo(() => {
    return new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(objFocusCurveProperty.catmullRomPoints),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x649cf3),
      }),
    );
  }, []);

  const curveVOffset = useMemo<THREE.Vector3>(() => {
    return new THREE.Vector3(randomRand(-50, 50), 0, randomRand(-50, 50));
  }, []);

  const handleUpdateCurveFollowCamera = () => {
    // if (!campusCamera || isPicked) return;
    if (!campusCamera || !objCubicBezierLine.current) return;
    const cameraPosition = campusCamera.position.clone();

    objFocusCurveProperty.cubicBezierCurve.v0.copy(cameraPosition);
    (objFocusCurveProperty.cubicBezierCurve.v1 = new THREE.Vector3(
      (focusPosition.x + campusCamera.position.x) / 2,
      campusCamera.position.y,
      (focusPosition.z + campusCamera.position.z) / 2,
    )),
      (objFocusCurveProperty.cubicBezierCurve.v2 = new THREE.Vector3(
        (focusPosition.x + campusCamera.position.x) / 2 + curveVOffset.x,
        focusPosition.y,
        (focusPosition.z + campusCamera.position.z) / 2 + curveVOffset.y,
      ));
    objFocusCurveProperty.cubicBezierCurve.v3.copy(focusPosition);

    objFocusCurveProperty.cubicBezierCurve.updateArcLengths();
    objFocusCurveProperty.cubicBezierPoints = objFocusCurveProperty.cubicBezierCurve.getPoints(200);
    objCubicBezierLine.current.geometry.setFromPoints(objFocusCurveProperty.cubicBezierPoints);

    objFocusCurveProperty.catmullRomCurve.points = [
      objFocusCurveProperty.cubicBezierCurve.v0,
      new THREE.Vector3(
        objFocusCurveProperty.cubicBezierCurve.v1.x,
        objFocusCurveProperty.cubicBezierCurve.v1.y +
          objFocusCurveProperty.cubicBezierCurve.v1.y / 4,
        objFocusCurveProperty.cubicBezierCurve.v1.z,
      ),
      new THREE.Vector3(
        objFocusCurveProperty.cubicBezierCurve.v2.x -
          objFocusCurveProperty.cubicBezierCurve.v2.x / 2,
        objFocusCurveProperty.cubicBezierCurve.v2.y +
          objFocusCurveProperty.cubicBezierCurve.v1.y / 2,
        objFocusCurveProperty.cubicBezierCurve.v2.z -
          objFocusCurveProperty.cubicBezierCurve.v2.z / 2,
      ),
      // new THREE.Vector3(
      //   (objFocusCurveProperty.cubicBezierCurve.v2.x -
      //     objFocusCurveProperty.cubicBezierCurve.v2.x / 2 +
      //     objFocusCurveProperty.cubicBezierCurve.v3.x) /
      //     2,
      //   objFocusCurveProperty.cubicBezierCurve.v3.y -
      //     objFocusCurveProperty.cubicBezierCurve.v3.y / 4,
      //   (objFocusCurveProperty.cubicBezierCurve.v2.z -
      //     objFocusCurveProperty.cubicBezierCurve.v2.z / 2 +
      //     objFocusCurveProperty.cubicBezierCurve.v3.z) /
      //     2,
      // ),
      objFocusCurveProperty.cubicBezierCurve.v3,
    ];
    objFocusCurveProperty.catmullRomPoints = objFocusCurveProperty.catmullRomCurve.getPoints(200);
    objCatmullRomLine.geometry.setFromPoints(objFocusCurveProperty.catmullRomPoints);
  };

  const handleUpdateCameraFollowCurve = () => {
    if (!campusCamera) return;
    const tubeGeometry = new THREE.TubeGeometry(
      objFocusCurveProperty.cubicBezierCurve,
      200,
      1,
      15,
      false,
    );

    // scene.add(
    //   new THREE.Mesh(
    //     tubeGeometry,
    //     new THREE.MeshBasicMaterial({
    //       color: "#54d184",
    //     }),
    //   ),
    // );

    maxDistanceFromCameraToFocus.current =
      objFocusCurveProperty.cubicBezierCurve.v0.distanceTo(focusPosition) -
      OFFSET_FOCUS_DISTANCE.current;

    progress.current.v = 0;
    animateCameraTimeline.clear();
    animateCameraTimeline
      .to(progress.current, {
        v:
          (maxDistanceFromCameraToFocus.current - OFFSET_FOCUS_DISTANCE.current) /
          maxDistanceFromCameraToFocus.current,
        duration: 2,
        ease: Power2.easeInOut,
        onStart: () => {
          positionTarget.current.copy(campusCamera.position);
        },
        onUpdate: () => {
          tubeGeometry.parameters.path.getPointAt(
            clamp(progress.current.v, 0, 1),
            positionTarget.current,
          );
          positionTarget.current.multiplyScalar(1);

          const segments = tubeGeometry.tangents.length;
          const pickt = clamp(progress.current.v, 0, 1) * segments;
          const pick = Math.floor(pickt);
          const pickNext = (pick + 1) % segments;

          binormalTarget.current.subVectors(
            tubeGeometry.binormals[pickNext],
            tubeGeometry.binormals[pick],
          );
          binormalTarget.current.multiplyScalar(pickt - pick).add(tubeGeometry.binormals[pick]);

          tubeGeometry.parameters.path.getTangentAt(
            clamp(progress.current.v, 0, 1),
            directionTarget.current,
          );

          normalTarget.current.copy(binormalTarget.current).cross(directionTarget.current);
          positionTarget.current.add(normalTarget.current.clone().multiplyScalar(1));

          campusCamera.position.lerp(positionTarget.current, 0.5);

          tubeGeometry.parameters.path.getPointAt(
            (clamp(progress.current.v, 0, 1) + 2 / tubeGeometry.parameters.path.getLength()) % 1,
            lookAtTarget.current,
          );
          lookAtTarget.current.multiplyScalar(1);

          lookAtTarget.current.copy(positionTarget.current).add(directionTarget.current);
          campusCamera.matrix.lookAt(
            campusCamera.position,
            lookAtTarget.current,
            normalTarget.current,
          );
          campusCamera.quaternion.setFromRotationMatrix(campusCamera.matrix);
        },
        onComplete: () => {
          (controls as OrbitControls).autoRotate = true;
          campusSceneStoreProxy.cameraState.isFocusBuilding = true;
        },
      })
      .play();
  };

  const handleUpdateControlsFollowObject = () => {
    if (buildingObject) {
      boxTarget.current.makeEmpty();
      boxTarget.current.expandByObject(buildingObject);
      // boxTarget.current.getSize(sizeTarget.current);
      boxTarget.current.getCenter(centerTarget.current);

      animateControlsTimeline.clear();
      animateControlsTimeline
        .to((controls as any).target, {
          x: centerTarget.current.x,
          y: centerTarget.current.y,
          z: centerTarget.current.z,
          duration: 1,
          ease: Power2.easeInOut,
          onUpdate: () => {
            (controls as any).update();
          },
        })
        .play();
    }
  };

  const handleUpdateCurveFollowCameraReverse = () => {
    // if (!campusCamera || isPicked) return;
    if (!campusCamera || !objCubicBezierLine.current) return;
    const cameraPosition = campusCamera.position.clone();

    objFocusCurveProperty.cubicBezierCurve.v0.copy(cameraPosition);
    (objFocusCurveProperty.cubicBezierCurve.v1 = new THREE.Vector3(
      (saveLastPositionBeforefocus.current.x + campusCamera.position.x) / 2,
      campusCamera.position.y,
      (saveLastPositionBeforefocus.current.z + campusCamera.position.z) / 2,
    )),
      (objFocusCurveProperty.cubicBezierCurve.v2 = new THREE.Vector3(
        (saveLastPositionBeforefocus.current.x + campusCamera.position.x) / 2 + curveVOffset.x,
        saveLastPositionBeforefocus.current.y,
        (saveLastPositionBeforefocus.current.z + campusCamera.position.z) / 2 + curveVOffset.y,
      ));
    objFocusCurveProperty.cubicBezierCurve.v3.copy(saveLastPositionBeforefocus.current);

    objFocusCurveProperty.cubicBezierCurve.updateArcLengths();
    objFocusCurveProperty.cubicBezierPoints = objFocusCurveProperty.cubicBezierCurve.getPoints(200);
    objCubicBezierLine.current.geometry.setFromPoints(objFocusCurveProperty.cubicBezierPoints);

    objFocusCurveProperty.catmullRomCurve.points = [
      objFocusCurveProperty.cubicBezierCurve.v0,
      new THREE.Vector3(
        objFocusCurveProperty.cubicBezierCurve.v1.x,
        objFocusCurveProperty.cubicBezierCurve.v1.y +
          objFocusCurveProperty.cubicBezierCurve.v1.y / 4,
        objFocusCurveProperty.cubicBezierCurve.v1.z,
      ),
      new THREE.Vector3(
        objFocusCurveProperty.cubicBezierCurve.v2.x -
          objFocusCurveProperty.cubicBezierCurve.v2.x / 2,
        objFocusCurveProperty.cubicBezierCurve.v2.y +
          objFocusCurveProperty.cubicBezierCurve.v1.y / 2,
        objFocusCurveProperty.cubicBezierCurve.v2.z -
          objFocusCurveProperty.cubicBezierCurve.v2.z / 2,
      ),
      objFocusCurveProperty.cubicBezierCurve.v3,
    ];
    objFocusCurveProperty.catmullRomPoints = objFocusCurveProperty.catmullRomCurve.getPoints(200);
    objCatmullRomLine.geometry.setFromPoints(objFocusCurveProperty.catmullRomPoints);
  };

  const handleUpdateCameraFollowCurveReverse = () => {
    if (!campusCamera) return;
    const tubeGeometry = new THREE.TubeGeometry(
      objFocusCurveProperty.cubicBezierCurve,
      200,
      1,
      15,
      false,
    );

    // scene.add(
    //   new THREE.Mesh(
    //     tubeGeometry,
    //     new THREE.MeshBasicMaterial({
    //       color: "#54d184",
    //     }),
    //   ),
    // );

    progress.current.v = 0;
    animateCameraTimeline.clear();
    animateCameraTimeline
      .to(progress.current, {
        v: 0.95,
        duration: 1.5,
        ease: Power2.easeInOut,
        onStart: () => {
          positionTarget.current.copy(campusCamera.position);
        },
        onUpdate: () => {
          tubeGeometry.parameters.path.getPointAt(
            clamp(progress.current.v, 0, 1),
            positionTarget.current,
          );
          positionTarget.current.multiplyScalar(1);

          const segments = tubeGeometry.tangents.length;
          const pickt = clamp(progress.current.v, 0, 1) * segments;
          const pick = Math.floor(pickt);
          const pickNext = (pick + 1) % segments;

          binormalTarget.current.subVectors(
            tubeGeometry.binormals[pickNext],
            tubeGeometry.binormals[pick],
          );
          binormalTarget.current.multiplyScalar(pickt - pick).add(tubeGeometry.binormals[pick]);

          tubeGeometry.parameters.path.getTangentAt(
            clamp(progress.current.v, 0, 1),
            directionTarget.current,
          );

          normalTarget.current.copy(binormalTarget.current).cross(directionTarget.current);
          positionTarget.current.add(normalTarget.current.clone().multiplyScalar(1));

          campusCamera.position.lerp(positionTarget.current, 0.5);

          tubeGeometry.parameters.path.getPointAt(
            clamp((progress.current.v + 2 / tubeGeometry.parameters.path.getLength()) % 1, 0, 1),
            lookAtTarget.current,
          );
          lookAtTarget.current.multiplyScalar(1);

          lookAtTarget.current.copy(positionTarget.current).add(directionTarget.current);
          campusCamera.matrix.lookAt(
            campusCamera.position,
            lookAtTarget.current,
            normalTarget.current,
          );
          campusCamera.quaternion.setFromRotationMatrix(campusCamera.matrix);
        },
        onComplete: () => {
          campusSceneStoreProxy.cameraState.isFlyAroundcampus = true;
          if (objCubicBezierLine.current) {
            scene.remove(objCubicBezierLine.current);
            objCubicBezierLine.current = null;
          }
        },
      })
      .play();
  };

  useEffect(() => {
    if (campusCamera) {
      // scene.add(objCatmullRomLine);
    }
  }, [campusCamera]);

  useEffect(() => {
    if (isPicked && !cameraState.isFocusBuilding) {
      campusSceneStoreProxy.cameraState.isFlyAroundcampus = false;
      saveLastPositionBeforefocus.current.copy(campusCamera?.position!);

      objCubicBezierLine.current = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(objFocusCurveProperty.cubicBezierPoints),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(0xf50359),
        }),
      );
      // scene.add(objCubicBezierLine.current);

      handleUpdateCurveFollowCamera();
      handleUpdateCameraFollowCurve();
      handleUpdateControlsFollowObject();
    }
  }, [isPicked]);

  useEffect(() => {
    if (!buildingPicked && cameraState.isFocusBuilding && objCubicBezierLine.current) {
      campusSceneStoreProxy.cameraState.isFocusBuilding = false;
      (controls as OrbitControls).autoRotate = false;
      handleUpdateCurveFollowCameraReverse();
      handleUpdateCameraFollowCurveReverse();
    }
  }, [buildingPicked]);

  useFrame(() => {
    // if ((controls as OrbitControls).autoRotate) {
    //   (controls as OrbitControls).update();
    // }
    // handleUpdateCurveFollowCamera();
  });

  return null;
});
