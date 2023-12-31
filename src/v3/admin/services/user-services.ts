import { objectToFormData } from "@Utils/common.utils";
import { TLoginSchema } from "../schemas/login-schema";
import { setupInterceptorsTo } from "@v3/admin/services/axios-interceptors";
import axios, { AxiosError } from "axios";
import { TTokenSchema, tokenSchema } from "../schemas/token-schema";

export const postLogin = async ({ data }: { data: TLoginSchema }): Promise<TTokenSchema> => {
  const form = objectToFormData<TLoginSchema>(data);

  const axiosInstance = setupInterceptorsTo(
    axios.create({
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "http://localhost:9999",
      },
    }),
  );

  try {
    const response = await axiosInstance.post("/user/login", form);
    return tokenSchema.parse(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      throw new Error(response?.data?.detail);
    }
    throw new Error(`Failed to post api/login: ${error}`);
  }
};
