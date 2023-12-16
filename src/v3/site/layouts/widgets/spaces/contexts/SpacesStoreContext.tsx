import { StoreApi } from "zustand";
import { createContext, useRef } from "react";
import { ISpacesStore, SpacesStore } from "../stores/spaces-store";

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
