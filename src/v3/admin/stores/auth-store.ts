import { createStore } from "zustand";
import { TClaimsSchema, claimsSchema } from "../schemas/claims-schema";
import { jwtDecode } from "jwt-decode";
import { Cookies } from "react-cookie";
import { encrypt } from "@Utils/crypto.utils";

export interface IAuthStore {
  authenticated: boolean | undefined;
  accessToken: string | undefined;
  accessTokenEncrypt: string | undefined;
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
      accessTokenEncrypt: undefined,
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

          if (token && tokenData) {
            const tokenEncrypt = encrypt(process.env.AES_KEY ?? "uni-campus", token);
            set({
              authenticated: true,
              accessToken: token,
              accessTokenEncrypt: tokenEncrypt,
              claims: tokenData,
            });
            cookies.set(process.env.ACCESS_TOKEN_KEY ?? "_", tokenEncrypt, {
              expires: new Date(tokenData?.exp * 1000),
              secure: true,
              httpOnly: false,
              sameSite: "lax",
            });
          } else {
            set({ authenticated: false });
          }
        },
        init: () => {},
        clear: () => {},
      },
    };
  });
};
``;
