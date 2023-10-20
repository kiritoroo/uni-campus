import { createContext, useRef } from "react";
import { IBuildingStoreContext } from "../types";
import { BuildingStore } from "../stores/BuildingStore";

export const BuildingStoreContext = createContext<IBuildingStoreContext | undefined>(undefined);

export const BuildingStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<IBuildingStoreContext>();
  if (!storeRef.current) {
    storeRef.current = BuildingStore();
  }

  return (
    <BuildingStoreContext.Provider value={storeRef.current}>
      {children}
    </BuildingStoreContext.Provider>
  );
};
