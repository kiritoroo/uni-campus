import { StoreApi } from "zustand";
import { ModelUploadStore, IFileUploadStore } from "../stores/ModelUploadStore";
import { createContext, useRef } from "react";

export interface IFileUploadStoreContext extends StoreApi<IFileUploadStore> {}

export const ModelUploadStoreContext = createContext<IFileUploadStoreContext | undefined>(
  undefined,
);

export const ModelUploadStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<IFileUploadStoreContext>();
  if (!storeRef.current) {
    storeRef.current = ModelUploadStore();
  }

  return (
    <ModelUploadStoreContext.Provider value={storeRef.current}>
      {children}
    </ModelUploadStoreContext.Provider>
  );
};
