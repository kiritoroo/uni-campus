import { useCampusStoreInContext } from "@Scripts/core/Campus/hooks/useCampusStoreInContext";
import { randomRand } from "@Utils/math.utils";
import { Line } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { RefObject, memo, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

interface GLFocusCurveProps {
  focusPosition: THREE.Vector3;
}

export const GLFocusCurve = memo(({ focusPosition }: GLFocusCurveProps) => {
  const campusCamera = useCampusStoreInContext().use.campusCamera();
  const { scene } = useThree();

  const objFocusCurveProperty = useMemo<{
    curve: THREE.CubicBezierCurve3;
    points: THREE.Vector3[];
  }>(() => {
    const curve = new THREE.CubicBezierCurve3();
    curve.v0.copy(focusPosition);

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

  const curveV1Offset = useMemo<THREE.Vector3>(() => {
    return new THREE.Vector3(randomRand(-50, 50), 0, randomRand(-50, 50));
  }, []);

  const handleUpdateCurveFollowCamera = () => {
    if (!campusCamera) return;
    const cameraPosition = campusCamera.position.clone();
    objFocusCurveProperty.curve.v1 = new THREE.Vector3(
      (focusPosition.x + campusCamera.position.x) / 2 + curveV1Offset.x,
      focusPosition.y,
      (focusPosition.z + campusCamera.position.z) / 2 + curveV1Offset.y,
    );
    (objFocusCurveProperty.curve.v2 = new THREE.Vector3(
      (focusPosition.x + campusCamera.position.x) / 2,
      campusCamera.position.y,
      (focusPosition.z + campusCamera.position.z) / 2,
    )),
      objFocusCurveProperty.curve.v3.copy(cameraPosition);
    objFocusCurveProperty.curve.updateArcLengths();
    objFocusCurveProperty.points = objFocusCurveProperty.curve.getPoints(200);
    objLine.geometry.setFromPoints(objFocusCurveProperty.points);
  };

  useEffect(() => {
    if (campusCamera) {
      scene.add(objLine);
    }
  }, [campusCamera]);

  useFrame(() => {
    handleUpdateCurveFollowCamera();
  });

  return null;
});
