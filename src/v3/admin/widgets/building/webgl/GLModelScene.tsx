import { Suspense, memo } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Html } from "@react-three/drei";
import GLBuilding from "./GLBuilding";
import { ErrorBoundary } from "react-error-boundary";
import saveAs from "file-saver";
import { Box, FileDown, ImageDown } from "lucide-react";
import { useBuildingStore } from "../hooks/useBuildingStore";
import { SpinnerLoading } from "@v3/admin/shared/SpinnerLoading";
import { useCommonStore } from "../hooks/useCommonStore";
import { useModelUploadStore } from "../hooks/useModelUploadStore";
import { cn } from "@Utils/common.utils";
import DropModel from "../components/DropModel";

const GLModelScene = memo(() => {
  const commonStore = useCommonStore();
  const modelUploadStore = useModelUploadStore();
  const buildingStore = useBuildingStore();

  const uploadScene = modelUploadStore.use.scene();
  const uploadFileName = modelUploadStore.use.fileName();
  const enableEditDetail = commonStore.use.enableEditDetail();
  const buildingData = buildingStore.use.buildingData();

  const handleSavePreview = () => {
    const image = document
      .getElementsByTagName("canvas")[0]
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    saveAs(
      image,
      enableEditDetail && uploadScene
        ? `${uploadFileName.split(".")[0]}.webp`
        : `${buildingData?.model_3d.filename.split(".")[0]}.webp`,
    );
  };

  const handleSaveModel = () => {
    const model = `${process.env.UNI_CAMPUS_API_URL}/${buildingData?.model_3d.url}`;
    saveAs(model, buildingData?.model_3d.filename);
  };

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
      <Canvas
        shadows="soft"
        className={cn("relative z-[1] h-full w-full ", { "bg-[#F5F5F5]": enableEditDetail })}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          alpha: true,
          outputColorSpace: THREE.SRGBColorSpace,
          shadowMapType: THREE.PCFSoftShadowMap,
          pixelRatio: 1,
          preserveDrawingBuffer: true,
        }}
        camera={{ position: [0, 0, 60], fov: 75 }}
      >
        {!uploadScene && (
          <Suspense
            fallback={
              <Html>
                <SpinnerLoading width={35} height={35} />
              </Html>
            }
          >
            <Stage preset={"rembrandt"} intensity={1} shadows adjustCamera environment={"city"}>
              <GLBuilding />
            </Stage>
          </Suspense>
        )}

        {enableEditDetail && uploadScene && (
          <Suspense
            fallback={
              <Html>
                <SpinnerLoading width={25} height={25} />
              </Html>
            }
          >
            <Stage preset={"rembrandt"} intensity={1} shadows adjustCamera environment={"city"}>
              <primitive object={uploadScene} />
            </Stage>
          </Suspense>
        )}

        <OrbitControls
          makeDefault
          enableDamping
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          autoRotate
        />
      </Canvas>

      {!enableEditDetail && (
        <div className="absolute bottom-3 right-3 z-[2] flex items-center justify-center gap-3">
          <button
            type="button"
            className="group cursor-pointer rounded-md border border-gem-onyx bg-gem-onyx p-2 transition-colors duration-200 hover:bg-white active:bg-gem-onyx/20"
            onClick={handleSaveModel}
          >
            <FileDown className="h-4 w-4 stroke-white transition-colors duration-200 group-hover:stroke-gem-onyx" />
          </button>
          <button
            type="button"
            className="group cursor-pointer rounded-md border border-gem-onyx bg-gem-onyx p-2 transition-colors duration-200 hover:bg-white active:bg-gem-onyx/20"
            onClick={handleSavePreview}
          >
            <ImageDown className="h-4 w-4 stroke-white transition-colors duration-200 group-hover:stroke-gem-onyx" />
          </button>
        </div>
      )}

      {enableEditDetail && (
        <div className="absolute inset-0 z-[2] h-full w-full">
          <DropModel />
        </div>
      )}
    </ErrorBoundary>
  );
});

export default GLModelScene;
