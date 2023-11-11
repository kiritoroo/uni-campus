import { UseMutationOptions, useMutation } from "react-query";
import { TLoginSchema } from "../schemas/login-schema";
import { postLogin } from "../services/user-services";

export const useUserServices = () => {
  const login = (data: TLoginSchema, option?: UseMutationOptions<any>) => {
    return useMutation(["api/post-login", data], () => postLogin({ data: data }), option);
  };

  return {
    login,
  };
};
