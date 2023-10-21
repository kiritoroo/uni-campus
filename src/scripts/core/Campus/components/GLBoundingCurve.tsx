import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader, Line2 } from "three-stdlib";
import * as THREE from "three";
import { RefObject, memo, useRef } from "react";
import { TGLTFReference } from "@Types/three.type";
import { assets } from "@Assets/assets";
import { Line } from "@react-three/drei";
import { useCampusStoreInContext } from "../hooks/useCampusStoreInContext";
import { useCampusStoreProxyInContext } from "../hooks/useCampusStoreProxyInContext";
import { useSnapshot } from "valtio";

export const GLBoundingCurve = memo(() => {
  const SCALE_FOLLOW_OFFSET = useRef<number>(1.5);
  const SCALE_LOOK_AT_OFFSET = useRef<number>(0.9);

  const campusStoreProxy = useCampusStoreProxyInContext();
  const { buildingPicked } = useSnapshot(campusStoreProxy);
  const campusCamera = useCampusStoreInContext().use.campusCamera();

  const gltf: TGLTFReference = useLoader(GLTFLoader, assets.models.CAMPUS_BOUNDING_CURVE_PATH);
  const model = gltf.scenes[0];

  const { controls } = useThree();

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
      point.setY(80);
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

    const time = Date.now();
    const looptime = 50 * 1000;
    const t = (time % looptime) / looptime;
    objBoundingCurveProperty.tubeGeometry.parameters.path.getPointAt(t, positionTarget.current);
    positionTarget.current.multiplyScalar(SCALE_FOLLOW_OFFSET.current);

    const segments = objBoundingCurveProperty.tubeGeometry.tangents.length;
    const pickt = t * segments;
    const pick = Math.floor(pickt);
    const pickNext = (pick + 1) % segments;

    binormalTarget.current.subVectors(
      objBoundingCurveProperty.tubeGeometry.binormals[pickNext],
      objBoundingCurveProperty.tubeGeometry.binormals[pick],
    );
    binormalTarget.current
      .multiplyScalar(pickt - pick)
      .add(objBoundingCurveProperty.tubeGeometry.binormals[pick]);

    objBoundingCurveProperty.tubeGeometry.parameters.path.getTangentAt(t, directionTarget.current);

    normalTarget.current.copy(binormalTarget.current).cross(directionTarget.current);
    positionTarget.current.add(
      normalTarget.current.clone().multiplyScalar(SCALE_FOLLOW_OFFSET.current),
    );

    campusCamera.position.lerp(positionTarget.current, 0.1);

    objBoundingCurveProperty.tubeGeometry.parameters.path.getPointAt(
      (t + 50 / objBoundingCurveProperty.tubeGeometry.parameters.path.getLength()) % 1,
      lookAtTarget.current,
    );
    lookAtTarget.current.multiplyScalar(SCALE_LOOK_AT_OFFSET.current);

    if (controls) {
      (controls as any).target.lerp(lookAtTarget.current, 0.1);
      campusCamera.lookAt((controls as any).target);
      (controls as any).update();
    }
  };

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
          linewidth={2}
        />
      )}
      {objBoundingCurveProperty && (
        <mesh scale={SCALE_FOLLOW_OFFSET.current} geometry={objBoundingCurveProperty.tubeGeometry}>
          <meshBasicMaterial color="#54d184" />
        </mesh>
      )}
      {objBoundingCurveProperty && (
        <mesh scale={SCALE_LOOK_AT_OFFSET.current} geometry={objBoundingCurveProperty.tubeGeometry}>
          <meshBasicMaterial color="#54d184" />
        </mesh>
      )}
    </group>
  );
});
