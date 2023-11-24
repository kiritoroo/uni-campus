import { Suspense, memo, useEffect, useMemo, useRef } from "react";
import { useModelUploadStore } from "../hooks/useModelUploadStore";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, Stage } from "@react-three/drei";
import { ImageDown, Trash } from "lucide-react";
import saveAs from "file-saver";
import { SpinnerLoading } from "@v3/admin/shared/SpinnerLoading";
import { ErrorBoundary } from "react-error-boundary";
import * as THREE from "three";

const GLViewModel = memo(() => {
  const modelUploadStore = useModelUploadStore();
  const scene = modelUploadStore.use.scene()!;
  const fileName = modelUploadStore.use.fileName();
  const { resetStore: resetModelUploadStore } = modelUploadStore.use.actions();

  const glBuildingObjects = useMemo<THREE.Object3D[]>(() => {
    return scene.clone().children.filter((obj) => !obj.name.includes("bounding"));
  }, [scene]);

  const sceneGroup = useRef(new THREE.Group());
  const ref = useRef<any>();

  const handleSavePreview = () => {
    const image = document
      .getElementsByTagName("canvas")[0]
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    saveAs(image, `${fileName.split(".")[0]}.webp`);
  };

  useEffect(() => {
    if (glBuildingObjects) {
      sceneGroup.current.add(...glBuildingObjects);
    }
  }, [glBuildingObjects]);

  return (
    <ErrorBoundary
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <div className="rounded-md bg-gray-100 px-5 py-2 text-sm font-medium text-gem-onyx">
            Something went wrong
          </div>
        </div>
      }
    >
      <div className="relative h-full w-full overflow-hidden rounded-md border border-gray-300 bg-[#F5F5F5]">
        <Canvas
          gl={{ preserveDrawingBuffer: true }}
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 150], fov: 75 }}
        >
          <ambientLight intensity={0.25} />
          <Suspense
            fallback={
              <Html>
                <SpinnerLoading width={25} height={25} />
              </Html>
            }
          >
            <Stage preset={"rembrandt"} intensity={1} shadows adjustCamera environment={"city"}>
              <primitive object={sceneGroup.current} />
            </Stage>
          </Suspense>
          <OrbitControls ref={ref} autoRotate={true} />
        </Canvas>
        <div className="absolute bottom-3 left-2 flex justify-start gap-5">
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={resetModelUploadStore}
              className="group cursor-pointer rounded-md border border-gem-onyx bg-gem-onyx p-2 transition-colors duration-200 hover:bg-white active:bg-gem-onyx/20"
            >
              <Trash className="h-4 w-4 stroke-white transition-colors duration-200 group-hover:stroke-gem-onyx" />
            </button>
            <button
              type="button"
              className="group cursor-pointer rounded-md border border-gem-onyx bg-gem-onyx p-2 transition-colors duration-200 hover:bg-white active:bg-gem-onyx/20"
              onClick={handleSavePreview}
            >
              <ImageDown className="h-4 w-4 stroke-white transition-colors duration-200 group-hover:stroke-gem-onyx" />
            </button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
});

export default GLViewModel;
