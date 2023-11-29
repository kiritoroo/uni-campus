import { StoreApi } from "zustand";
import { createContext, useRef } from "react";
import { GalleryUploadStore, IGalleryUploadStore } from "../stores/gallery-upload-store";

export interface IGalleryUploadStoreContext extends StoreApi<IGalleryUploadStore> {}

export const GalleryUploadStoreContext = createContext<IGalleryUploadStoreContext | undefined>(
  undefined,
);

export const GalleryUploadStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<IGalleryUploadStoreContext>();
  if (!storeRef.current) {
    storeRef.current = GalleryUploadStore();
  }

  return (
    <GalleryUploadStoreContext.Provider value={storeRef.current}>
      {children}
    </GalleryUploadStoreContext.Provider>
  );
};
