import { createStore } from "zustand";
import { TGLTFReference } from "@Types/three.type";
import { initializeGLTFLoader } from "@Utils/three.utils";

type TState = {
  fileRaw: File | null;
  fileName: string;
  buffer: string | ArrayBuffer | null;
  textOriginalFile: string;
  scene: THREE.Group | null;
};

type TActions = {
  loadScene: () => void;
  resetStore: () => void;
};

export interface IFileUploadStore extends TState {
  actions: TActions;
}

const initStore: TState = {
  fileRaw: null,
  fileName: "",
  buffer: null,
  textOriginalFile: "",
  scene: null,
};

const gltfLoader = initializeGLTFLoader();

export const ModelUploadStore = () => {
  return createStore<IFileUploadStore>((set, get) => ({
    ...initStore,
    actions: {
      loadScene: async () => {
        const { buffer } = get();
        const result = await new Promise((resolve, reject) =>
          gltfLoader!.parse(buffer!, "", resolve, reject),
        );

        set({ scene: (result as TGLTFReference).scene });
      },
      resetStore: () => {
        set({ ...initStore });
      },
    },
  }));
};
