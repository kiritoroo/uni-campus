import { StoreApi } from "zustand";
import { createContext, useRef } from "react";
import { GlobalStore, IGlobalStore } from "@v3/site/stores/global-store";

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
