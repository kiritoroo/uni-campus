import { StoreApi } from "zustand";
import { createContext, useRef } from "react";
import { CampusSceneStore, ICampusSceneStore } from "../stores/campus-scene-store";

export interface ICampusSceneStoreContext extends StoreApi<ICampusSceneStore> {}

export const CampusSceneStoreContext = createContext<ICampusSceneStoreContext | undefined>(
  undefined,
);

export const CampusSceneStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<ICampusSceneStoreContext>();
  if (!storeRef.current) {
    storeRef.current = CampusSceneStore();
  }

  return (
    <CampusSceneStoreContext.Provider value={storeRef.current}>
      {children}
    </CampusSceneStoreContext.Provider>
  );
};
