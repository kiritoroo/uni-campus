import { createStore } from "zustand";
import { TClaimsSchema, claimsSchema } from "../schemas/claims-schema";
import { jwtDecode } from "jwt-decode";
import { Cookies } from "react-cookie";
import { decrypt, encrypt } from "@Utils/crypto.utils";

type TState = {
  authenticated: boolean | undefined;
  accessToken: string | undefined;
  accessTokenEncrypt: string | undefined;
  claims: TClaimsSchema | undefined;
};

type TActions = {
  auth: (token: string | undefined) => void;
  init: () => void;
  clear: () => void;
};

export interface IAuthStore extends TState {
  actions: TActions;
}

const initStore: TState = {
  authenticated: undefined,
  accessToken: undefined,
  accessTokenEncrypt: undefined,
  claims: undefined,
};

export const AuthStore = () => {
  return createStore<IAuthStore>((set, get) => {
    const cookies = new Cookies();

    return {
      authenticated: undefined,
      accessToken: undefined,
      accessTokenEncrypt: undefined,
      claims: undefined,
      actions: {
        auth: (token) => {
          const tokenData = (() => {
            try {
              return token ? claimsSchema.parse(jwtDecode<TClaimsSchema>(token)) : undefined;
            } catch (error) {
              return undefined;
            }
          })();

          if (token && tokenData) {
            const tokenEncrypt = encrypt(
              process.env.AES_KEY ?? "x",
              process.env.CBC_IV ?? "x",
              token,
            );
            set({
              authenticated: true,
              accessToken: token,
              accessTokenEncrypt: tokenEncrypt,
              claims: tokenData,
            });
            cookies.set(process.env.ACCESS_TOKEN_KEY ?? "x", tokenEncrypt, {
              expires: new Date(tokenData?.exp * 1000),
              secure: false,
              path: "/x",
              httpOnly: false,
              sameSite: "lax",
            });
          } else {
            set({ authenticated: false });
          }
        },
        init: () => {
          const { auth } = get().actions;
          const tokenEncrypt = cookies.get(process.env.ACCESS_TOKEN_KEY ?? "x");
          try {
            const tokenDecrypt = decrypt(
              process.env.AES_KEY ?? "x",
              process.env.CBC_IV ?? "x",
              tokenEncrypt ?? "",
            );
            auth(tokenDecrypt);
          } catch (e) {
            get().actions.clear();
          }
        },
        clear: () => {
          cookies.remove(process.env.ACCESS_TOKEN_KEY ?? "x");
          set({ ...initStore, authenticated: false });
        },
      },
    };
  });
};
``;
