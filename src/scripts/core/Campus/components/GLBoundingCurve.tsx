import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader, Line2 } from "three-stdlib";
import * as THREE from "three";
import { RefObject, memo, useEffect, useMemo, useRef, useState } from "react";
import { TGLTFReference } from "@Types/three.type";
import { assets } from "@Assets/assets";
import { Line } from "@react-three/drei";
import { useCampusStoreInContext } from "../hooks/useCampusStoreInContext";
import { useCampusStoreProxyInContext } from "../hooks/useCampusStoreProxyInContext";
import { useSnapshot } from "valtio";
import { useCampusSceneStoreProxyInContext } from "@Scripts/webgl/scene/CampusScene/hooks/useCampusSceneStoreProxyInContext";
import gsap, { Power2 } from "gsap";
import { Expo } from "gsap";
import { clamp } from "@Utils/math.utils";

export const GLBoundingCurve = memo(() => {
  const SCALE_FOLLOW_OFFSET = useRef<number>(1.5);
  const SCALE_LOOK_AT_OFFSET = useRef<number>(0.5);

  const campusStoreProxy = useCampusStoreProxyInContext();
  const campusSceneStoreProxy = useCampusSceneStoreProxyInContext();
  const { buildingPicked } = useSnapshot(campusStoreProxy);
  const campusCamera = useCampusStoreInContext().use.campusCamera();

  const gltf: TGLTFReference = useLoader(GLTFLoader, assets.models.CAMPUS_BOUNDING_CURVE_PATH);
  const model = gltf.scenes[0];

  const { controls } = useThree();

  const isMouseDown = useRef(false);
  const isMouseMove = useRef(false);
  const isMouseSwipe = useRef(false);
  const mouseDownData = useRef({
    clientX: 0,
    clientY: 0,
  });
  const previousMouseMoveData = useRef({
    clientX: 0,
    clientY: 0,
  });
  const mouseSwipeDirection = useRef<"left" | "right">("left");
  const swipeAcceleration = useRef({
    v: 0,
  });
  const swipeAccumulate = useRef(100000);
  const swipeIntensity = useRef(0);
  const followAcceleration = useRef({
    v: 1,
  });
  const lockSwipe = useRef(false);

  const timer = useRef<any>(0);
  const animateTimeline = useMemo(() => {
    return gsap.timeline();
  }, []);
  const progress = useRef({
    v: 0,
  });
  const positionTarget = useRef<THREE.Vector3>(new THREE.Vector3());
  const binormalTarget = useRef<THREE.Vector3>(new THREE.Vector3());
  const directionTarget = useRef<THREE.Vector3>(new THREE.Vector3());
  const normalTarget = useRef<THREE.Vector3>(new THREE.Vector3());
  const lookAtTarget = useRef<THREE.Vector3>(new THREE.Vector3());

  const objBoundingCurveProperty: {
    ref: RefObject<Line2 | any>;
    geometry: THREE.BufferGeometry;
    position: THREE.Vector3;
    points: THREE.Vector3[];
    curve: THREE.CatmullRomCurve3;
    tubeGeometry: THREE.TubeGeometry;
  } | null = (() => {
    const obj = model.getObjectByName("bounding-curve");
    if (!obj || !(obj instanceof THREE.Mesh)) return null;

    const positionAttribute = (obj.geometry as THREE.BufferGeometry).getAttribute("position");
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < positionAttribute.count; i++) {
      const point = new THREE.Vector3();
      point.fromBufferAttribute(positionAttribute, i);
      point.setX(point.x + obj.position.x);
      point.setY(point.y + obj.position.y);
      point.setZ(point.z + obj.position.z);
      point.setY(100);
      points.push(point);
    }
    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal" as THREE.CurveType);
    const tubeGeometry = new THREE.TubeGeometry(curve, 200, 1, 15, true);

    return {
      ref: useRef(null),
      geometry: obj.geometry,
      position: obj.position,
      points,
      curve,
      tubeGeometry,
    };
  })();

  const handleUpdateCameraFollowCurve = () => {
    if (!objBoundingCurveProperty || !campusCamera) return;

    swipeAccumulate.current +=
      followAcceleration.current.v * 1.2 +
      swipeAcceleration.current.v *
        (clamp(swipeIntensity.current, 1, 5) + 8) *
        (mouseSwipeDirection.current === "right" ? 1 : -1);
    progress.current.v = clamp((swipeAccumulate.current % 2000) / 2000, 0, 1);

    objBoundingCurveProperty.tubeGeometry.parameters.path.getPointAt(
      progress.current.v,
      positionTarget.current,
    );
    positionTarget.current.multiplyScalar(SCALE_FOLLOW_OFFSET.current);

    const segments = objBoundingCurveProperty.tubeGeometry.tangents.length;
    const pickt = progress.current.v * segments;
    const pick = Math.floor(pickt);
    const pickNext = (pick + 1) % segments;

    binormalTarget.current.subVectors(
      objBoundingCurveProperty.tubeGeometry.binormals[pickNext],
      objBoundingCurveProperty.tubeGeometry.binormals[pick],
    );
    binormalTarget.current
      .multiplyScalar(pickt - pick)
      .add(objBoundingCurveProperty.tubeGeometry.binormals[pick]);

    objBoundingCurveProperty.tubeGeometry.parameters.path.getTangentAt(
      progress.current.v,
      directionTarget.current,
    );

    normalTarget.current.copy(binormalTarget.current).cross(directionTarget.current);
    positionTarget.current.add(
      normalTarget.current.clone().multiplyScalar(SCALE_FOLLOW_OFFSET.current),
    );

    campusCamera.position.lerp(positionTarget.current, 0.1);

    objBoundingCurveProperty.tubeGeometry.parameters.path.getPointAt(
      (progress.current.v +
        50 / objBoundingCurveProperty.tubeGeometry.parameters.path.getLength()) %
        1,
      lookAtTarget.current,
    );
    lookAtTarget.current.multiplyScalar(SCALE_LOOK_AT_OFFSET.current);

    if (controls) {
      (controls as any).target.lerp(lookAtTarget.current, 0.1);
      campusCamera.lookAt((controls as any).target);
      (controls as any).update();
    }
  };

  const handleOnMouseDownScene = (e: MouseEvent) => {
    isMouseDown.current = true;
    mouseDownData.current.clientX = e.clientX;
    mouseDownData.current.clientY = e.clientY;
  };

  const handleOnMouseUpScene = () => {
    isMouseDown.current = false;
    isMouseSwipe.current = false;
    campusSceneStoreProxy.mouseState.isMouseSwipe = false;
  };

  const handleOnMouseMoveScene = (e: MouseEvent) => {
    if (Math.abs(e.clientY - mouseDownData.current.clientY) > 20) return;

    if (isMouseDown.current && isMouseSwipe.current === false) {
      const DELTA_CHANGE_IS_SWIPE = 10;
      if (Math.abs(e.clientX - mouseDownData.current.clientX) > DELTA_CHANGE_IS_SWIPE) {
        isMouseSwipe.current = true;
        lockSwipe.current = true;
        campusSceneStoreProxy.mouseState.isMouseSwipe = true;
        animateTimeline.clear();
        animateTimeline
          .to(
            swipeAcceleration.current,
            {
              v: 1,
              duration: 0.1,
              ease: Expo.easeInOut,
            },
            "<",
          )
          .to(
            followAcceleration.current,
            {
              v: 0.1,
              duration: 0.1,
              ease: Expo.easeInOut,
            },
            "<",
          )
          .play();

        swipeIntensity.current = Math.abs(e.clientX - previousMouseMoveData.current.clientX);
        if (e.clientX - previousMouseMoveData.current.clientX > 0) {
          mouseSwipeDirection.current = "right";
        } else if (e.clientX - previousMouseMoveData.current.clientX < 0) {
          mouseSwipeDirection.current = "left";
        }
      }
    }

    if (e.clientX - previousMouseMoveData.current.clientX > 0) {
      if (isMouseSwipe.current && isMouseMove.current === false) {
        animateTimeline.clear();
        animateTimeline
          .to(
            swipeAcceleration.current,
            {
              v: 0.3,
              duration: 0.1,
              ease: Expo.easeInOut,
            },
            "<",
          )
          .to(
            followAcceleration.current,
            {
              v: 0.2,
              duration: 0.1,
              ease: Expo.easeInOut,
            },
            "<",
          )
          .play();

        lockSwipe.current = true;
        swipeIntensity.current = Math.abs(e.clientX - previousMouseMoveData.current.clientX);
        mouseSwipeDirection.current = "right";
      }
    } else if (e.clientX - previousMouseMoveData.current.clientX < 0) {
      if (isMouseSwipe.current && isMouseMove.current === false) {
        animateTimeline.clear();
        animateTimeline
          .to(
            swipeAcceleration.current,
            {
              v: 0.3,
              duration: 0.1,
              ease: Expo.easeInOut,
            },
            "<",
          )
          .to(
            followAcceleration.current,
            {
              v: 0.2,
              duration: 0.1,
              ease: Expo.easeInOut,
            },
            "<",
          )
          .play();

        lockSwipe.current = true;
        swipeIntensity.current = Math.abs(e.clientX - previousMouseMoveData.current.clientX);
        mouseSwipeDirection.current = "left";
      }
    }

    if (swipeAcceleration.current.v < 0.1) {
      if (e.clientX - previousMouseMoveData.current.clientX > 0) {
        mouseSwipeDirection.current = "right";
      } else if (e.clientX - previousMouseMoveData.current.clientX < 0) {
        mouseSwipeDirection.current = "left";
      }
    }

    isMouseMove.current = true;
    previousMouseMoveData.current.clientX = e.clientX;
    previousMouseMoveData.current.clientY = e.clientY;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      isMouseMove.current = false;

      if (lockSwipe.current) {
        lockSwipe.current = false;
        animateTimeline
          .to(swipeAcceleration.current, {
            v: 0,
            delay: 0.2,
            duration: 0.2,
            ease: Expo.easeInOut,
          })
          .to(followAcceleration.current, {
            v: 1,
            duration: 0.1,
            ease: Expo.easeInOut,
          })
          .play();
      }
    }, 20);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOnMouseDownScene);
    document.addEventListener("mouseup", handleOnMouseUpScene);
    document.addEventListener("mousemove", handleOnMouseMoveScene);

    return () => {
      document.removeEventListener("mousedown", handleOnMouseDownScene);
      document.removeEventListener("mouseup", handleOnMouseUpScene);
      document.removeEventListener("mousemove", handleOnMouseMoveScene);
    };
  });

  useFrame(() => {
    if (buildingPicked === null) {
      handleUpdateCameraFollowCurve();
    }
  });

  return (
    <group>
      {objBoundingCurveProperty && (
        <Line
          ref={objBoundingCurveProperty.ref}
          points={objBoundingCurveProperty.curve.getPoints(200)}
          color="#F50359"
          visible={false}
          linewidth={2}
        />
      )}
      {objBoundingCurveProperty && (
        <mesh
          visible={false}
          scale={SCALE_FOLLOW_OFFSET.current}
          geometry={objBoundingCurveProperty.tubeGeometry}
        >
          <meshBasicMaterial color="#54d184" />
        </mesh>
      )}
      {objBoundingCurveProperty && (
        <mesh
          visible={false}
          scale={SCALE_LOOK_AT_OFFSET.current}
          geometry={objBoundingCurveProperty.tubeGeometry}
        >
          <meshBasicMaterial color="#54d184" />
        </mesh>
      )}
    </group>
  );
});
