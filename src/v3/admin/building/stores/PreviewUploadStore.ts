import { createStore } from "zustand";
import computed from "zustand-computed";

type TState = {
  fileName: string;
  buffer: string | ArrayBuffer | null;
  textOriginalFile: string;
};

type TComputedState = {
  image: string | null;
};

type TActions = {
  resetStore: () => void;
};

export interface IPreviewUploadStore extends TState, TComputedState {
  actions: TActions;
}

const initStore: TState & TComputedState = {
  fileName: "",
  buffer: null,
  textOriginalFile: "",
  image: null,
};

export const PreviewUploadStore = () => {
  return createStore<IPreviewUploadStore, [["chrisvander/zustand-computed", TComputedState]]>(
    computed(
      (set, get) => ({
        ...initStore,
        actions: {
          resetStore: () => {
            set({ ...initStore });
          },
        },
      }),
      (state) => ({
        image: (() => {
          if (state.buffer) {
            const bytes = new Uint8Array(state.buffer as ArrayBuffer);
            const blob = new Blob([bytes], { type: "image/jpeg" });
            const urlCreator = window.URL || window.webkitURL;
            const imageUrl = urlCreator.createObjectURL(blob);
            return imageUrl;
          }
          return null;
        })(),
      }),
    ),
  );
};
