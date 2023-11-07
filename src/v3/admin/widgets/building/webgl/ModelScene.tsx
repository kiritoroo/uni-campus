import { Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Center, Environment, OrbitControls, Stage, Html } from "@react-three/drei";
import GLBuilding from "./GLBuilding";
import { ErrorBoundary } from "react-error-boundary";
import saveAs from "file-saver";
import { FileBox, ImageDown, Upload } from "lucide-react";
import { useBuildingStore } from "../hooks/useBuildingStore";
import { SpinnerLoading } from "@v3/admin/shared/SpinnerLoading";
import { useCommonStore } from "../hooks/useCommonStore";
import { useUniDialog } from "@v3/admin/shared/UniDialog";

const ModelScene = () => {
  const commonStore = useCommonStore();
  const enableEditDetail = commonStore.use.enableEditDetail();
  const buildingStore = useBuildingStore();
  const buildingData = buildingStore.use.buildingData();

  const uniDialog = useUniDialog();

  const handleSavePreview = () => {
    const image = document
      .getElementsByTagName("canvas")[0]
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    saveAs(image, `${buildingData?.model_url.split("/")[2].split(".")[0]}.webp`);
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
        camera={{ position: [0, 20, 60], fov: 75 }}
      >
        <Suspense
          fallback={
            <Html>
              <SpinnerLoading width={25} height={25} />
            </Html>
          }
        >
          {/* <Stage preset={"rembrandt"} intensity={1} shadows  environment={"city"}> */}
          <Center>
            <GLBuilding />
          </Center>
          {/* </Stage> */}
        </Suspense>
        <Environment files={"/v3/images/rooitou_park.hdr"} blur={0.5} />

        <OrbitControls
          makeDefault
          enableDamping
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate
        />
      </Canvas>

      <div className="absolute bottom-5 left-5 flex justify-start gap-5">
        <div className="flex items-center justify-center gap-2">
          {enableEditDetail && (
            <button type="button">
              <div className="bg-blue-100 px-3 py-2">
                <Upload className="h-4 w-4 stroke-gray-700" />
              </div>
            </button>
          )}
          <button type="button" onClick={handleSavePreview}>
            <div className="bg-gray-100 px-3 py-2">
              <ImageDown className="h-4 w-4 stroke-gray-700" />
            </div>
          </button>
        </div>
        <div className="flex items-center justify-between gap-3 bg-gray-100 px-4 py-2">
          <FileBox className="h-4 w-4 stroke-gray-600" />
          <p className="text-sm">{buildingData?.model_url.split("/")[2]}</p>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ModelScene;
