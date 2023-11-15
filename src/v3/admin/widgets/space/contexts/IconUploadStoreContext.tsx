import { StoreApi } from "zustand";
import { createContext, useRef } from "react";
import { IIconUploadStore, IconUploadStore } from "../stores/icon-upload-store";

export interface IIconUploadStoreContext extends StoreApi<IIconUploadStore> {}

export const IconUploadStoreContext = createContext<IIconUploadStoreContext | undefined>(undefined);

export const IconUploadStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<IIconUploadStoreContext>();
  if (!storeRef.current) {
    storeRef.current = IconUploadStore();
  }

  return (
    <IconUploadStoreContext.Provider value={storeRef.current}>
      {children}
    </IconUploadStoreContext.Provider>
  );
};
