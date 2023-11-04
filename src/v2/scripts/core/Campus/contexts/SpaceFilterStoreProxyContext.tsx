import { createContext, useRef } from "react";

import { SpaceFilterStoreProxy } from "../stores/SpaceFilterStoreProxy";
import { ISpaceFilterStoreProxy, ISpaceFilterStoreProxyContext } from "../types";

export const SpaceFilterStoreProxyContext = createContext<
  ISpaceFilterStoreProxyContext | undefined
>(undefined);

export const SpaceFilterStoreProxyProvider = ({ children }: { children: React.ReactNode }) => {
  const storeProxyRef = useRef<ISpaceFilterStoreProxy>();
  if (!storeProxyRef.current) {
    storeProxyRef.current = SpaceFilterStoreProxy();
  }

  return (
    <SpaceFilterStoreProxyContext.Provider value={storeProxyRef.current}>
      {children}
    </SpaceFilterStoreProxyContext.Provider>
  );
};
