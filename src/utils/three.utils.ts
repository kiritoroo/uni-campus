import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { REVISION, WebGLRenderer } from "three";

export const initializeGLTFLoader = (): GLTFLoader | undefined => {
  if (typeof window !== "undefined") {
    const THREE_PATH = `https://unpkg.com/three@0.${REVISION}.x`;
    const dracoloader = new DRACOLoader().setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.5/",
    );
    const ktx2Loader = new KTX2Loader().setTranscoderPath(`${THREE_PATH}/examples/jsm/libs/basis/`);

    const gltfLoader = new GLTFLoader()
      .setCrossOrigin("anonymous")
      .setDRACOLoader(dracoloader)
      .setKTX2Loader(ktx2Loader.detectSupport(new WebGLRenderer()))
      .setMeshoptDecoder(MeshoptDecoder);

    return gltfLoader;
  }

  return undefined;
};
