import { createContext, useRef } from "react";
import { IBlockStoreProxy, IBlockStoreProxyContext } from "../types";
import { BlockStoreProxy } from "../stores/BlockStoreProxy";

export const BlockStoreProxyContext = createContext<IBlockStoreProxyContext | undefined>(undefined);

export const BlockStoreProxyContextProvider = ({ children }: { children: React.ReactNode }) => {
  const storeProxyref = useRef<IBlockStoreProxy>();
  if (!storeProxyref.current) {
    storeProxyref.current = BlockStoreProxy();
  }

  return (
    <BlockStoreProxyContext.Provider value={storeProxyref.current}>
      {children}
    </BlockStoreProxyContext.Provider>
  );
};
