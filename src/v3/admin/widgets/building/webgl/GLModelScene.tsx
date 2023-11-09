import { Suspense, memo } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Html } from "@react-three/drei";
import GLBuilding from "./GLBuilding";
import { ErrorBoundary } from "react-error-boundary";
import saveAs from "file-saver";
import { FileBox, ImageDown } from "lucide-react";
import { useBuildingStore } from "../hooks/useBuildingStore";
import { SpinnerLoading } from "@v3/admin/shared/SpinnerLoading";
import { useCommonStore } from "../hooks/useCommonStore";
import { useModelUploadStore } from "../hooks/useModelUploadStore";
import DropModel from "../DropModel";

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

  return (
    <ErrorBoundary
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <div className="bg-red-100 px-5 py-2 text-sm font-medium text-red-700">
            Something went wrong
          </div>
        </div>
      }
    >
      <Canvas
        shadows="soft"
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
                <SpinnerLoading width={25} height={25} />
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
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate
        />
      </Canvas>

      <div className="absolute bottom-5 left-5 right-5 flex justify-start gap-5">
        <div className="flex items-center justify-center gap-2">
          {enableEditDetail && <DropModel />}
          <button type="button" onClick={handleSavePreview}>
            <div className="bg-gray-100 px-3 py-2">
              <ImageDown className="h-4 w-4 stroke-gray-700" />
            </div>
          </button>
        </div>
        <div className="flex grow items-center justify-start gap-3 bg-gray-100 px-4 py-2">
          <FileBox className="h-4 w-4 stroke-gray-600" />
          <p className="text-sm">
            {uploadFileName && enableEditDetail ? uploadFileName : buildingData?.model_3d.filename}
          </p>
        </div>
      </div>
    </ErrorBoundary>
  );
});

export default GLModelScene;
