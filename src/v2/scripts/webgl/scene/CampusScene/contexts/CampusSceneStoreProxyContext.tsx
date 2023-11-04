import { createContext, useRef } from "react";
import { ICampusSceneStoreProxy, ICampusSceneStoreProxyContext } from "../types";
import { CampusSceneStoreProxy } from "../stores/CampusSceneStoreProxy";

export const CampusSceneStoreProxyContext = createContext<
  ICampusSceneStoreProxyContext | undefined
>(undefined);

export const CampusSceneStoreProxyProvider = ({ children }: { children: React.ReactNode }) => {
  const storeProxyRef = useRef<ICampusSceneStoreProxy>();
  if (!storeProxyRef.current) {
    storeProxyRef.current = CampusSceneStoreProxy();
  }
  return (
    <CampusSceneStoreProxyContext.Provider value={storeProxyRef.current}>
      {children}
    </CampusSceneStoreProxyContext.Provider>
  );
};
