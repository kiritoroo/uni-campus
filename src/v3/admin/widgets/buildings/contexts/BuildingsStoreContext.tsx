import { StoreApi } from "zustand";
import { BuildingsStore, IBuildingsStore } from "../stores/buildings-store";
import { createContext, useRef } from "react";

export interface IBuildingsStoreContext extends StoreApi<IBuildingsStore> {}

export const BuildingsStoreContext = createContext<IBuildingsStoreContext | undefined>(undefined);

export const BuildingsStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<IBuildingsStoreContext>();
  if (!storeRef.current) {
    storeRef.current = BuildingsStore();
  }

  return (
    <BuildingsStoreContext.Provider value={storeRef.current}>
      {children}
    </BuildingsStoreContext.Provider>
  );
};
