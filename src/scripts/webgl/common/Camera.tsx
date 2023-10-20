import { PerspectiveCamera } from "@react-three/drei";
export const Camera = () => {
  return <PerspectiveCamera makeDefault fov={75} position={[50, 80, 150]} near={0.1} far={1000} />;
};
