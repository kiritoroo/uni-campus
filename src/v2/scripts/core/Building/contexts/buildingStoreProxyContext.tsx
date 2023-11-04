import { createContext, useRef } from "react";
import { IBuildingStoreProxy, IBuildingStoreProxyContext } from "../types";
import { BuildingStoreProxy } from "../stores/BuildingStoreProxy";

export const BuildingStoreProxyContext = createContext<IBuildingStoreProxyContext | undefined>(
  undefined,
);

export const BuildingStoreProxyProvider = ({ children }: { children: React.ReactNode }) => {
  const storeProxyRef = useRef<IBuildingStoreProxy>();
  if (!storeProxyRef.current) {
    storeProxyRef.current = BuildingStoreProxy();
  }

  return (
    <BuildingStoreProxyContext.Provider value={storeProxyRef.current}>
      {children}
    </BuildingStoreProxyContext.Provider>
  );
};
