import { StoreApi } from "zustand";
import { createContext, memo, useRef } from "react";
import { BuildingStore, IBuildingStore } from "../stores/building-store";

export interface IBuildingStoreContext extends StoreApi<IBuildingStore> {}

export const BuildingStoreContext = createContext<IBuildingStoreContext | undefined>(undefined);

export const BuildingStoreProvider = memo(({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<IBuildingStoreContext>();
  if (!storeRef.current) {
    storeRef.current = BuildingStore();
  }

  return (
    <BuildingStoreContext.Provider value={storeRef.current}>
      {children}
    </BuildingStoreContext.Provider>
  );
});
