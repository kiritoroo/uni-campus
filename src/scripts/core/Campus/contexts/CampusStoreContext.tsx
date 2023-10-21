import { createContext, useRef } from "react";
import { ICampusStoreContext } from "../types";
import { CampusStore } from "../stores/CampusStore";

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
