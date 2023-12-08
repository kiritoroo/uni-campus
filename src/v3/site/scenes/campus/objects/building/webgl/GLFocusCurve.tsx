import { useFrame, useThree } from "@react-three/fiber";
import { memo, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useCampusSceneStore } from "../../../hooks/useCampuseSceneStore";
import gsap from "gsap";
import { clamp, randomRand } from "@Utils/math.utils";
import { OrbitControls } from "three-stdlib";
import { useBuildingStore } from "../hooks/useBuildingStore";
import { Power2 } from "gsap";
import { useCampusStore } from "../../campus/hooks/useCampusStore";

const GLFocusCurve = memo(() => {
  const campusSceneStore = useCampusSceneStore();
  const campusStore = useCampusStore();
  const buildingStore = useBuildingStore();

  const campusMode = campusSceneStore.use.campusMode();
  const campusCamera = campusSceneStore.use.campusCamera();
  const buildingPicked = campusStore.use.buildingPicked();
  const buildingObject = buildingStore.use.buildingObject();
  const focusPosition = buildingStore.use.focusPostion();
  const isBuildingPicked = buildingStore.use.isBuildingPicked();

  const { scene, controls: campusControls } = useThree();

  const animateCameraTimeline = useMemo(() => {
    return gsap.timeline();
  }, []);
  const animateControlsTimeline = useMemo(() => {
    return gsap.timeline();
  }, []);

  const OFFSET_FOCUS_DISTANCE = useRef(80);

  const progress = useRef({ v: 0 });
  const curveVOffset = useRef<THREE.Vector3>(
    new THREE.Vector3(randomRand(-50, 50), 0, randomRand(-50, 50)),
  );
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

  const objCubicBezierLine = useMemo(() => {
    return new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(objFocusCurveProperty.cubicBezierPoints),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xf50359),
      }),
    );
  }, []);

  const objCatmullRomLine = useMemo(() => {
    return new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(objFocusCurveProperty.catmullRomPoints),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x649cf3),
      }),
    );
  }, []);

  const handleUpdateCurveFollowCamera = () => {
    if (!campusCamera || !objCubicBezierLine) return;

    const cameraPosition = campusCamera.position.clone();

    objFocusCurveProperty.cubicBezierCurve.v0.copy(cameraPosition);
    (objFocusCurveProperty.cubicBezierCurve.v1 = new THREE.Vector3(
      (focusPosition.x + campusCamera.position.x) / 2,
      campusCamera.position.y,
      (focusPosition.z + campusCamera.position.z) / 2,
    )),
      (objFocusCurveProperty.cubicBezierCurve.v2 = new THREE.Vector3(
        (focusPosition.x + campusCamera.position.x) / 2 + curveVOffset.current.x,
        focusPosition.y,
        (focusPosition.z + campusCamera.position.z) / 2 + curveVOffset.current.y,
      ));
    objFocusCurveProperty.cubicBezierCurve.v3.copy(focusPosition);

    objFocusCurveProperty.cubicBezierCurve.updateArcLengths();
    objFocusCurveProperty.cubicBezierPoints = objFocusCurveProperty.cubicBezierCurve.getPoints(200);
    objCubicBezierLine.geometry.setFromPoints(objFocusCurveProperty.cubicBezierPoints);

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

  const handleUpdateCameraFollowCurve = () => {
    if (!campusCamera) return;
    const tubeGeometry = new THREE.TubeGeometry(
      objFocusCurveProperty.cubicBezierCurve,
      200,
      1,
      15,
      false,
    );

    campusMode === "dev" &&
      scene.add(
        new THREE.Mesh(
          tubeGeometry,
          new THREE.MeshBasicMaterial({
            color: "#54d184",
          }),
        ),
      );

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
          if (campusMode === "prod") {
            (campusControls as OrbitControls).autoRotate = true;
          }
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
        .to((campusControls as any).target, {
          x: centerTarget.current.x,
          y: centerTarget.current.y,
          z: centerTarget.current.z,
          duration: 1,
          ease: Power2.easeInOut,
          onUpdate: () => {
            (campusControls as any).update();
          },
        })
        .play();
    }
  };

  useEffect(() => {
    if (campusCamera && campusMode === "dev") {
      scene.add(objCubicBezierLine);
      scene.add(objCatmullRomLine);
    }
  }, [campusCamera]);

  useEffect(() => {
    if (isBuildingPicked) {
      campusMode === "prod" && handleUpdateCurveFollowCamera();
      handleUpdateCameraFollowCurve();
      handleUpdateControlsFollowObject();
    }
  }, [isBuildingPicked]);

  useFrame(() => {
    campusMode === "dev" && handleUpdateCurveFollowCamera();
  });

  return null;
});

export default GLFocusCurve;
