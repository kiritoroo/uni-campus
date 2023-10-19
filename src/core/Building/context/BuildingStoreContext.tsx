import { createContext, useRef } from "react";
import { StoreApi } from "zustand";
import { IBuildingStore, IBuildingStoreContext } from "../types";
import { BuildingStore } from "../stores/BuildingStore";

export const BuildingStoreContext = createContext<IBuildingStoreContext | undefined>(undefined);

export const BuildingStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<StoreApi<IBuildingStore>>();
  if (!storeRef.current) {
    storeRef.current = BuildingStore();
  }

  return (
    <BuildingStoreContext.Provider value={storeRef.current}>
      {children}
    </BuildingStoreContext.Provider>
  );
};
