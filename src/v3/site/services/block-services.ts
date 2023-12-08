import { z } from "zod";
import { TBlockSchema, blockSchema } from "../schemas/block";
import { setupInterceptorsTo } from "./axios-interceptors";
import axios, { AxiosError } from "axios";
import qs from "query-string";

export const getBlocks = async (): Promise<TBlockSchema[]> => {
  const query = qs.stringify({
    populate: true,
  });

  const axiosInstance = setupInterceptorsTo(axios.create());

  try {
    const response = await axiosInstance.get(`/block?${query}`);
    return z.array(blockSchema).parse(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      throw new Error(response?.data?.detail);
    }
    throw new Error(`Failed to get api/block: ${error}`);
  }
};
