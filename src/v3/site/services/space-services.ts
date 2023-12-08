import axios, { AxiosError } from "axios";
import { TSpaceSchema, spaceSchema } from "../schemas/space";
import { setupInterceptorsTo } from "./axios-interceptors";
import { z } from "zod";

export const getSpaces = async (): Promise<TSpaceSchema[]> => {
  const axiosInstance = setupInterceptorsTo(axios.create());

  try {
    const response = await axiosInstance.get(`/space`);
    return z.array(spaceSchema).parse(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      throw new Error(response?.data?.detail);
    }
    throw new Error(`Failed to get api/space: ${error}`);
  }
};
