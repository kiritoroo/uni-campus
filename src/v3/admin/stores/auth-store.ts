import { createStore } from "zustand";
import { TClaimsSchema, claimsSchema } from "../schemas/claims-schema";
import { jwtDecode } from "jwt-decode";
import { Cookies } from "react-cookie";

export interface IAuthStore {
  authenticated: boolean | undefined;
  accessToken: string | undefined;
  claims: TClaimsSchema | undefined;
  actions: {
    auth: (token: string | undefined) => void;
    init: () => void;
    clear: () => void;
  };
}

export const AuthStore = () => {
  return createStore<IAuthStore>((set, get) => {
    const cookies = new Cookies();
    return {
      authenticated: undefined,
      accessToken: undefined,
      claims: undefined,
      actions: {
        auth: (token) => {
          const tokenData = (() => {
            try {
              return token ? claimsSchema.parse(jwtDecode<TClaimsSchema>(token)) : undefined;
            } catch (error) {
              console.log(error);
              return undefined;
            }
          })();

          if (tokenData) {
            set({ authenticated: true });
          }
        },
        init: () => {},
        clear: () => {},
      },
    };
  });
};
``;
