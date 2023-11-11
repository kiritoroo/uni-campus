import { StoreApi } from "zustand";
import { createContext, useRef } from "react";
import { IPreviewUploadStore, PreviewUploadStore } from "../stores/preview-upload-store";

export interface IPreviewUploadStoreContext extends StoreApi<IPreviewUploadStore> {}

export const PreviewUploadStoreContext = createContext<IPreviewUploadStoreContext | undefined>(
  undefined,
);

export const PreviewUploadStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<IPreviewUploadStoreContext>();
  if (!storeRef.current) {
    storeRef.current = PreviewUploadStore();
  }

  return (
    <PreviewUploadStoreContext.Provider value={storeRef.current}>
      {children}
    </PreviewUploadStoreContext.Provider>
  );
};
