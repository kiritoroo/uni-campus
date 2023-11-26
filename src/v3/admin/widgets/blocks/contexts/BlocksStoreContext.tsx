import { StoreApi } from "zustand";
import { createContext, useRef } from "react";
import { IBlocksStore, blocksStore } from "../stores/blocks-store";

export interface IBlocksStoreContext extends StoreApi<IBlocksStore> {}

export const BlocksStoreContext = createContext<IBlocksStoreContext | undefined>(undefined);

export const BlocksStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<IBlocksStoreContext>();
  if (!storeRef.current) {
    storeRef.current = blocksStore();
  }

  return (
    <BlocksStoreContext.Provider value={storeRef.current}>{children}</BlocksStoreContext.Provider>
  );
};
