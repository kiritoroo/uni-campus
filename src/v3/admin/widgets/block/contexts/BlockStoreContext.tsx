import { StoreApi } from "zustand";
import { createContext, useRef } from "react";
import { BlockStore, IBlockStore } from "../stores/block-store";

export interface IBlockStoreContext extends StoreApi<IBlockStore> {}

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
