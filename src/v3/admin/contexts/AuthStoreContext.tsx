import { StoreApi } from "zustand";
import { AuthStore, IAuthStore } from "../stores/auth-store";
import { createContext, useEffect, useRef } from "react";
import { createSelectors } from "@Utils/zustand.utils";

export interface IAuthStoreContext extends StoreApi<IAuthStore> {}

export const AuthStoreContext = createContext<IAuthStoreContext | undefined>(undefined);

export const AuthStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<IAuthStoreContext>();
  if (!storeRef.current) {
    storeRef.current = AuthStore();
  }

  const storeSelectors = createSelectors(storeRef.current);
  const { init } = storeSelectors.use.actions();

  useEffect(() => {
    init();
  }, []);

  return <AuthStoreContext.Provider value={storeRef.current}>{children}</AuthStoreContext.Provider>;
};
