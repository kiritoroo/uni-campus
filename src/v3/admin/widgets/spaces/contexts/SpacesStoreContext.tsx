import { StoreApi } from "zustand";
import { ISpacesStore, SpacesStore } from "../stores/spaces-store";
import { createContext, useRef } from "react";

export interface ISpacesStoreContext extends StoreApi<ISpacesStore> {}

export const SpacesStoreContext = createContext<ISpacesStoreContext | undefined>(undefined);

export const SpacesStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<ISpacesStoreContext>();
  if (!storeRef.current) {
    storeRef.current = SpacesStore();
  }

  return (
    <SpacesStoreContext.Provider value={storeRef.current}>{children}</SpacesStoreContext.Provider>
  );
};
