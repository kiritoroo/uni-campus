import { StoreApi } from "zustand";
import { AuthStore, IAuthStore } from "../stores/auth-store";
import { createContext, useEffect, useRef } from "react";
import { createSelectors } from "@Utils/zustand.utils";
import { useUniToastify } from "../shared/UniToastify";

export interface IAuthStoreContext extends StoreApi<IAuthStore> {}

export const AuthStoreContext = createContext<IAuthStoreContext | undefined>(undefined);

export const AuthStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<IAuthStoreContext>();
  if (!storeRef.current) {
    storeRef.current = AuthStore();
  }

  const storeSelectors = createSelectors(storeRef.current);
  const authenticated = storeSelectors.use.authenticated();
  const claims = storeSelectors.use.claims();
  const accessToken = storeSelectors.use.accessToken();
  const accessTokenEncrypt = storeSelectors.use.accessTokenEncrypt();

  const { init } = storeSelectors.use.actions();

  const uniToast = useUniToastify();

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (authenticated) {
      console.log(`[🔓] Authenticated\n`, claims);
      console.log(accessToken);
      console.log(accessTokenEncrypt);
      uniToast.info({
        title: `Hi ${claims?.nickname}!`,
        desc: `You are ${claims?.role}`,
      });
    } else {
      console.log(`[🔒] Unauthorized`);
    }
  }, [authenticated]);

  return <AuthStoreContext.Provider value={storeRef.current}>{children}</AuthStoreContext.Provider>;
};
