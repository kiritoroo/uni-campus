import { PerspectiveCamera } from "@react-three/drei";
export const Camera = () => {
  return <PerspectiveCamera makeDefault fov={75} position={[20, 50, 50]} near={0.1} far={1000} />;
};
