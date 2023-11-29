import { createStore } from "zustand";

type TState = {
  files: File[];
  fileNames: string[];
  base64List: (string | ArrayBuffer | null)[];
  textOriginalFiles: string[];
};

type TActions = {
  resetStore: () => void;
  addFile: (
    file: File,
    fileName: string,
    base64: string | ArrayBuffer | null,
    textOriginalFile: string,
  ) => void;
  removeFile: (index: number) => void;
};

export interface IGalleryUploadStore extends TState {
  actions: TActions;
}

const initStore: TState = {
  files: [],
  fileNames: [],
  base64List: [],
  textOriginalFiles: [],
};

export const GalleryUploadStore = () => {
  return createStore<IGalleryUploadStore>((set, get) => ({
    ...initStore,
    actions: {
      resetStore: () => {
        set({ ...initStore });
      },
      addFile: (file, fileName, base64, textOriginalFile) => {
        set((state) => ({
          files: [...state.files, file],
          fileNames: [...state.fileNames, fileName],
          base64List: [...state.base64List, base64],
          textOriginalFiles: [...state.textOriginalFiles, textOriginalFile],
        }));
      },
      removeFile: (index) => {
        set((state) => {
          const newFiles = [...state.files];
          const newFileNames = [...state.fileNames];
          const newBase64List = [...state.base64List];
          const newTextOriginalFiles = [...state.textOriginalFiles];

          newFiles.splice(index, 1);
          newFileNames.splice(index, 1);
          newBase64List.splice(index, 1);
          newTextOriginalFiles.splice(index, 1);

          return {
            files: newFiles,
            fileNames: newFileNames,
            base64List: newBase64List,
            textOriginalFiles: newTextOriginalFiles,
          };
        });
      },
    },
  }));
};
