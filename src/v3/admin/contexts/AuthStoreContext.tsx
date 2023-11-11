import { StoreApi } from "zustand";
import { AuthStore, IAuthStore } from "../stores/auth-store";
import { createContext, useRef } from "react";

export interface IAuthStoreContext extends StoreApi<IAuthStore> {}

export const AuthStoreContext = createContext<IAuthStoreContext | undefined>(undefined);

export const AuthStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<IAuthStoreContext>();
  if (!storeRef.current) {
    storeRef.current = AuthStore();
  }

  return <AuthStoreContext.Provider value={storeRef.current}>{children}</AuthStoreContext.Provider>;
};
