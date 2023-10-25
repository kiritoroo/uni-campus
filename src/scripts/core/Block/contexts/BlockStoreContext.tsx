import { createContext, useRef } from "react";
import { IBlockStoreContext } from "../types";
import { BlockStore } from "../stores/BlockStore";

export const BlockStoreContext = createContext<IBlockStoreContext | undefined>(undefined);

export const BlockStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<IBlockStoreContext>();
  if (!storeRef.current) {
    storeRef.current = BlockStore();
  }

  return (
    <BlockStoreContext.Provider value={storeRef.current}>{children}</BlockStoreContext.Provider>
  );
};
