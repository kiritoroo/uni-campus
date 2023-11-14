import { StoreApi } from "zustand";
import { ISpaceStore, SpaceStore } from "../stores/space-store";
import { createContext, useRef } from "react";

export interface ISpaceStoreContext extends StoreApi<ISpaceStore> {}

export const SpaceStoreContext = createContext<ISpaceStoreContext | undefined>(undefined);

export const SpaceStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<ISpaceStoreContext>();
  if (!storeRef.current) {
    storeRef.current = SpaceStore();
  }

  return (
    <SpaceStoreContext.Provider value={storeRef.current}>{children}</SpaceStoreContext.Provider>
  );
};
