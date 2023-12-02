import { StoreApi } from "zustand";
import { createContext, useRef } from "react";
import { CampusStore, ICampusStore } from "../stores/campus-store";

export interface ICampusStoreContext extends StoreApi<ICampusStore> {}

export const CampusStoreContext = createContext<ICampusStoreContext | undefined>(undefined);

export const CampusStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<ICampusStoreContext>();
  if (!storeRef.current) {
    storeRef.current = CampusStore();
  }

  return (
    <CampusStoreContext.Provider value={storeRef.current}>{children}</CampusStoreContext.Provider>
  );
};
