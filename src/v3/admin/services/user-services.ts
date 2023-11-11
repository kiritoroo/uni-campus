import { objectToFormData } from "@Utils/common.utils";
import { TLoginSchema } from "../schemas/login-schema";
import { setupInterceptorsTo } from "./axios-interceptors";
import axios from "axios";

export const postLogin = async ({ data }: { data: TLoginSchema }): Promise<any> => {
  const form = objectToFormData<TLoginSchema>(data);

  const axiosInstance = setupInterceptorsTo(
    axios.create({
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  );

  try {
    const response = await axiosInstance.post("/login", form);
    return response;
  } catch (error) {
    throw new Error(`Failed to post api/login: ${error}`);
  }
};
