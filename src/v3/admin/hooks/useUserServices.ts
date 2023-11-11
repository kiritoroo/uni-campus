import { UseMutationOptions, useMutation } from "react-query";
import { TLoginSchema } from "../schemas/login-schema";
import { postLogin } from "../services/user-services";
import { TTokenSchema } from "../schemas/token-schema";

export const useUserServices = () => {
  const login = (data: TLoginSchema, option?: UseMutationOptions<TTokenSchema>) => {
    return useMutation(["api/post-login", data], () => postLogin({ data: data }), option);
  };

  return {
    login,
  };
};
