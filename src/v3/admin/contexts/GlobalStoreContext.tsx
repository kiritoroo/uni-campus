import { StoreApi } from "zustand";
import { GlobalStore, IGlobalStore } from "../stores/global-store";
import { createContext, useRef } from "react";

export interface IGlobalStoreContext extends StoreApi<IGlobalStore> {}

export const GlobalStoreContext = createContext<IGlobalStoreContext | undefined>(undefined);

export const GlobalStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<IGlobalStoreContext>();
  if (!storeRef.current) {
    storeRef.current = GlobalStore();
  }

  return (
    <GlobalStoreContext.Provider value={storeRef.current}>{children}</GlobalStoreContext.Provider>
  );
};
