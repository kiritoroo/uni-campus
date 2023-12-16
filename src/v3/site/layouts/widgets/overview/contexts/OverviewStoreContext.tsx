import { StoreApi } from "zustand";
import { createContext, useRef } from "react";
import { IOverviewStore, OVerviewStore } from "../stores/overview-store";

export interface IOverviewStoreContext extends StoreApi<IOverviewStore> {}

export const OverviewStoreContext = createContext<IOverviewStoreContext | undefined>(undefined);

export const OverviewStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<IOverviewStoreContext>();
  if (!storeRef.current) {
    storeRef.current = OVerviewStore();
  }

  return (
    <OverviewStoreContext.Provider value={storeRef.current}>
      {children}
    </OverviewStoreContext.Provider>
  );
};
