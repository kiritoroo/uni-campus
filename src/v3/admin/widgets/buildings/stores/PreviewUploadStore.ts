import { createStore } from "zustand";

type TState = {
  fileRaw: File | null;
  fileName: string;
  base64: string | ArrayBuffer | null;
  textOriginalFile: string;
};

type TActions = {
  resetStore: () => void;
};

export interface IPreviewUploadStore extends TState {
  actions: TActions;
}

const initStore: TState = {
  fileRaw: null,
  fileName: "",
  base64: null,
  textOriginalFile: "",
};

export const PreviewUploadStore = () => {
  return createStore<IPreviewUploadStore>((set, get) => ({
    ...initStore,
    actions: {
      resetStore: () => {
        set({ ...initStore });
      },
    },
  }));
};
