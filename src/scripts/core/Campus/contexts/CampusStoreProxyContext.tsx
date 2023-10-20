import { createContext, useRef } from "react";
import { ICampusStoreProxy, ICampusStoreProxyContext } from "../types";
import { CampusStoreProxy } from "../stores/CampusStoreProxy";

export const CampusStoreProxyContext = createContext<ICampusStoreProxy | undefined>(undefined);

export const CampusStoreProxyProvider = ({ children }: { children: React.ReactNode }) => {
  const storeProxyRef = useRef<ICampusStoreProxyContext>();
  if (!storeProxyRef.current) {
    storeProxyRef.current = CampusStoreProxy();
  }

  return (
    <CampusStoreProxyContext.Provider value={storeProxyRef.current}>
      {children}
    </CampusStoreProxyContext.Provider>
  );
};
