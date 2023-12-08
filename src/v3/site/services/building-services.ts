import { z } from "zod";
import axios, { AxiosError } from "axios";
import { TBuildingSchema, buildingSchema } from "../schemas/building";
import { setupInterceptorsTo } from "./axios-interceptors";
import qs from "query-string";

export const getBuildings = async (): Promise<TBuildingSchema[]> => {
  const query = qs.stringify({
    populate: true,
  });

  const axiosInstance = setupInterceptorsTo(axios.create());

  try {
    const response = await axiosInstance.get(`/building?${query}`);
    return z.array(buildingSchema).parse(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      throw new Error(response?.data?.detail);
    }
    throw new Error(`Failed to get api/building: ${error}`);
  }
};

export const getBuilding = async ({
  data,
}: {
  data: Pick<TBuildingSchema, "id">;
}): Promise<TBuildingSchema> => {
  const path = data.id;
  const query = qs.stringify({
    populate: true,
  });

  const axiosInstance = setupInterceptorsTo(axios.create());

  try {
    const response = await axiosInstance.get(`/building/${path}?${query}`);
    return buildingSchema.parse(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      throw new Error(response?.data?.detail);
    }
    throw new Error(`Failed to get api/building:id: ${error}`);
  }
};
