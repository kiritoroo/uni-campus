import { createContext, useRef } from "react";
import { CommonStore, ICommonStore } from "../stores/common-store";
import { StoreApi } from "zustand";

export interface ICommonStoreContext extends StoreApi<ICommonStore> {}

export const CommonStoreContext = createContext<ICommonStoreContext | undefined>(undefined);

export const CommonStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<ICommonStoreContext>();
  if (!storeRef.current) {
    storeRef.current = CommonStore();
  }

  return (
    <CommonStoreContext.Provider value={storeRef.current}>{children}</CommonStoreContext.Provider>
  );
};
