import { createStore } from "zustand";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { REVISION, WebGLRenderer } from "three";
import { GLTFReference } from "three-stdlib";
import { TGLTFReference } from "@Types/three.type";

export interface IFileUploadStore {
  fileName: string;
  buffer: string | ArrayBuffer | null;
  textOriginalFile: string;
  scene: THREE.Group | null;
  actions: {
    loadScene: () => void;
  };
}

let gltfLoader: GLTFLoader;
if (typeof window !== "undefined") {
  const THREE_PATH = `https://unpkg.com/three@0.${REVISION}.x`;
  const dracoloader = new DRACOLoader().setDecoderPath(
    "https://www.gstatic.com/draco/versioned/decoders/1.5.5/",
  );
  const ktx2Loader = new KTX2Loader().setTranscoderPath(`${THREE_PATH}/examples/jsm/libs/basis/`);

  gltfLoader = new GLTFLoader()
    .setCrossOrigin("anonymous")
    .setDRACOLoader(dracoloader)
    .setKTX2Loader(ktx2Loader.detectSupport(new WebGLRenderer()))
    .setMeshoptDecoder(MeshoptDecoder);
}

export const ModelUploadStore = () => {
  return createStore<IFileUploadStore>((set, get) => ({
    fileName: "",
    buffer: null,
    textOriginalFile: "",
    scene: null,
    actions: {
      loadScene: async () => {
        const { buffer } = get();
        const result = await new Promise((resolve, reject) =>
          gltfLoader.parse(buffer!, "", resolve, reject),
        );

        if (!get().scene) set({ scene: (result as TGLTFReference).scene });
      },
    },
  }));
};
