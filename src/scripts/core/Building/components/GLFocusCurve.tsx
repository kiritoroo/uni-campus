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

interface GLFocusCurveProps {
  focusPosition: THREE.Vector3;
}

export const GLFocusCurve = memo(({ focusPosition }: GLFocusCurveProps) => {
  const buildingObject = useBuildingStoreInContext().use.buildingObject();
  const buildingStoreProxy = useBuildingStoreProxyInContext();
  const campusCamera = useCampusStoreInContext().use.campusCamera();
  const campusControls = useCampusStoreInContext().use.campusControls();
  const { isPicked } = useSnapshot(buildingStoreProxy);

  const { scene, controls } = useThree();

  const progress = useRef({
    v: 0,
  });
  const positionTarget = useRef<THREE.Vector3>(new THREE.Vector3());
  const binormalTarget = useRef<THREE.Vector3>(new THREE.Vector3());
  const directionTarget = useRef<THREE.Vector3>(new THREE.Vector3());
  const normalTarget = useRef<THREE.Vector3>(new THREE.Vector3());
  const lookAtTarget = useRef<THREE.Vector3>(new THREE.Vector3());
  const centerTarget = useRef<THREE.Vector3>(new THREE.Vector3());
  const boxTarget = useRef<THREE.Box3>(new THREE.Box3());

  const objFocusCurveProperty = useMemo<{
    curve: THREE.CubicBezierCurve3;
    points: THREE.Vector3[];
  }>(() => {
    const curve = new THREE.CubicBezierCurve3();
    curve.v3.copy(focusPosition);
    const points = curve.getPoints(200);

    return {
      curve,
      points,
    };
  }, []);

  const objLine = useMemo(() => {
    return new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(objFocusCurveProperty.points),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xf50359),
      }),
    );
  }, []);

  const curveVOffset = useMemo<THREE.Vector3>(() => {
    return new THREE.Vector3(randomRand(-100, 100), 0, randomRand(-100, 100));
  }, []);

  const handleUpdateCurveFollowCamera = () => {
    if (!campusCamera || isPicked) return;
    const cameraPosition = campusCamera.position.clone();
    objFocusCurveProperty.curve.v0.copy(cameraPosition);
    (objFocusCurveProperty.curve.v1 = new THREE.Vector3(
      (focusPosition.x + campusCamera.position.x) / 2,
      campusCamera.position.y,
      (focusPosition.z + campusCamera.position.z) / 2,
    )),
      (objFocusCurveProperty.curve.v2 = new THREE.Vector3(
        (focusPosition.x + campusCamera.position.x) / 2 + curveVOffset.x,
        focusPosition.y,
        (focusPosition.z + campusCamera.position.z) / 2 + curveVOffset.y,
      ));
    objFocusCurveProperty.curve.updateArcLengths();
    objFocusCurveProperty.points = objFocusCurveProperty.curve.getPoints(200);
    objLine.geometry.setFromPoints(objFocusCurveProperty.points);
  };

  const handleUpdateCameraFollowCurve = () => {
    if (!campusCamera) return;
    const tubeGeometry = new THREE.TubeGeometry(objFocusCurveProperty.curve, 200, 1, 15, false);

    scene.add(
      new THREE.Mesh(
        tubeGeometry,
        new THREE.MeshBasicMaterial({
          color: "#54d184",
        }),
      ),
    );

    gsap.to(progress.current, {
      v: 0.8,
      duration: 1.5,
      ease: Power2.easeInOut,
      onStart: () => {
        // campusCamera.lookAt(focusPosition);
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
    });
  };

  const handleUpdateControlsFollowObject = () => {
    if (buildingObject) {
      boxTarget.current.makeEmpty();
      boxTarget.current.expandByObject(buildingObject);
      // boxTarget.current.getSize(sizeTarget.current);
      boxTarget.current.getCenter(centerTarget.current);

      gsap.to((controls as any).target, {
        x: centerTarget.current.x,
        y: centerTarget.current.y,
        z: centerTarget.current.z,
        duration: 1.5,
        ease: Power2.easeInOut,
        onUpdate: () => {
          (controls as any).update();
        },
      });
    }
  };

  useEffect(() => {
    if (campusCamera) {
      scene.add(objLine);
    }
  }, [campusCamera]);

  useEffect(() => {
    if (isPicked) {
      handleUpdateCameraFollowCurve();
      handleUpdateControlsFollowObject();
    }
  }, [isPicked]);

  useFrame(() => {
    handleUpdateCurveFollowCamera();
  });

  return null;
});
