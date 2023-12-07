import { StoreApi } from "zustand";
import { createContext, useRef } from "react";
import { CampusSceneStore, ICampusSceneStore } from "../stores/campus-scene-store";

export interface ICampusSceneStoreContext extends StoreApi<ICampusSceneStore> {}

export const CampusSceneStoreContext = createContext<ICampusSceneStoreContext | undefined>(
  undefined,
);

export const CampusSceneStoreProvider = ({
  mode,
  children,
}: {
  mode: "dev" | "prod";
  children: React.ReactNode;
}) => {
  const storeRef = useRef<ICampusSceneStoreContext>();
  if (!storeRef.current) {
    storeRef.current = CampusSceneStore({ mode: mode });
  }

  return (
    <CampusSceneStoreContext.Provider value={storeRef.current}>
      {children}
    </CampusSceneStoreContext.Provider>
  );
};
