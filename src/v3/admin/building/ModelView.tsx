import { Suspense, useRef } from "react";
import { useModelUploadStore } from "./hooks/useModelUploadStore";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";

const ModelView = () => {
  const scene = useModelUploadStore().use.scene()!;
  const ref = useRef<any>();

  return (
    <Canvas
      gl={{ preserveDrawingBuffer: true }}
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 150], fov: 75 }}
      className="relative h-full w-full border border-gray-300 bg-[#EFEFEF]"
    >
      <ambientLight intensity={0.25} />
      <Suspense fallback={null}>
        <Stage preset={"rembrandt"} intensity={1} shadows adjustCamera environment={"city"}>
          <primitive object={scene} />
        </Stage>
      </Suspense>
      <OrbitControls ref={ref} autoRotate={true} />
    </Canvas>
  );
};

export default ModelView;
