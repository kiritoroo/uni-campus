import { PerspectiveCamera } from "@react-three/drei";
export const Camera = () => {
  return (
    <PerspectiveCamera makeDefault fov={75} position={[-50, 100, 200]} near={0.5} far={2000} />
  );
};
