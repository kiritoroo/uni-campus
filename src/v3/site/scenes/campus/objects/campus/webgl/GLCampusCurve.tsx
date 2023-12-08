import { TGLTFReference } from "@Types/three.type";
import { Line } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { MODELS_ASSETS } from "@v3/site/assets/models";
import { RefObject, useRef } from "react";
import * as THREE from "three";
import { Line2 } from "three-stdlib";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useCampusSceneStore } from "../../../hooks/useCampuseSceneStore";
import { useCampusStore } from "../hooks/useCampusStore";

const GLCampusCurve = () => {
  const campusSceneStore = useCampusSceneStore();
  const campusStore = useCampusStore();

  const campusMode = campusSceneStore.use.campusMode();
  const campusCamera = campusSceneStore.use.campusCamera();
  const buildingPicked = campusStore.use.buildingPicked();

  const SCALE_FOLLOW_OFFSET = useRef<number>(1.5);
  const SCALE_LOOK_AT_OFFSET = useRef<number>(0.5);

  const acceleration = useRef({ v: 0.0005 });
  const progress = useRef({ v: 0 });
  const positionTarget = useRef<THREE.Vector3>(new THREE.Vector3());
  const binormalTarget = useRef<THREE.Vector3>(new THREE.Vector3());
  const directionTarget = useRef<THREE.Vector3>(new THREE.Vector3());
  const normalTarget = useRef<THREE.Vector3>(new THREE.Vector3());
  const lookAtTarget = useRef<THREE.Vector3>(new THREE.Vector3());

  const { controls: campusControls } = useThree();

  const gltf: TGLTFReference = useLoader(GLTFLoader, MODELS_ASSETS.campusCurve);
  const model = gltf.scenes[0];

  const objBoundingCurveProperty: {
    ref: RefObject<Line2 | any>;
    geometry: THREE.BufferGeometry;
    position: THREE.Vector3;
    points: THREE.Vector3[];
    curve: THREE.CatmullRomCurve3;
    tubeGeometry: THREE.TubeGeometry;
  } | null = (() => {
    const obj = model.getObjectByName("campus-curve");
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

    progress.current.v += acceleration.current.v;

    if (progress.current.v > 1) {
      progress.current.v = 0;
    }

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

    if (campusControls && campusMode === "prod") {
      (campusControls as any).target.lerp(lookAtTarget.current, 0.1);
      campusCamera.lookAt((campusControls as any).target);
      (campusControls as any).update();
    }
  };

  useFrame(() => {
    if (buildingPicked) return;

    handleUpdateCameraFollowCurve();
  });

  return (
    <group>
      {objBoundingCurveProperty && (
        <Line
          ref={objBoundingCurveProperty.ref}
          points={objBoundingCurveProperty.curve.getPoints(200)}
          color="#F50359"
          visible={campusMode === "dev" ? true : false}
          linewidth={2}
        />
      )}

      {objBoundingCurveProperty && (
        <mesh
          scale={SCALE_FOLLOW_OFFSET.current}
          geometry={objBoundingCurveProperty.tubeGeometry}
          visible={campusMode === "dev" ? true : false}
        >
          <meshBasicMaterial color="#54d184" />
        </mesh>
      )}

      {objBoundingCurveProperty && (
        <mesh
          scale={SCALE_LOOK_AT_OFFSET.current}
          geometry={objBoundingCurveProperty.tubeGeometry}
          visible={campusMode === "dev" ? true : false}
        >
          <meshBasicMaterial color="#54d184" />
        </mesh>
      )}
    </group>
  );
};

export default GLCampusCurve;
