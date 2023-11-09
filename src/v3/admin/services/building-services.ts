import axios from "axios";
import { objectToFormData } from "@Utils/common.utils";
import { setupInterceptorsTo } from "./axios-Interceptors";
import { z } from "zod";
import { TBuildingCreateSchema } from "../schemas/building/create";
import { TBuildingSchema, buildingSchema } from "../schemas/building/base";

export const getBuildings = async (): Promise<TBuildingSchema[]> => {
  const axiosInstance = setupInterceptorsTo(axios.create());

  try {
    const response = await axiosInstance.get("/building");
    return z.array(buildingSchema).parse(response.data);
  } catch (error) {
    throw new Error(`Failed to get api/building: ${error}`);
  }
};

export const getBuilding = async ({
  data,
}: {
  data: Pick<TBuildingSchema, "id">;
}): Promise<TBuildingSchema> => {
  const path = data.id;

  const axiosInstance = setupInterceptorsTo(axios.create());

  try {
    const response = await axiosInstance.get(`/building/${path}`);
    return buildingSchema.parse(response.data);
  } catch (error) {
    throw new Error(`Failed to delete api/building: ${error}`);
  }
};

export const postBuilding = async ({
  data,
}: {
  data: TBuildingCreateSchema;
}): Promise<TBuildingSchema> => {
  const form = objectToFormData<TBuildingCreateSchema>(data);

  const axiosInstance = setupInterceptorsTo(
    axios.create({
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  );

  try {
    const response = await axiosInstance.post("/building", form);
    return buildingSchema.parse(response.data);
  } catch (error) {
    throw new Error(`Failed to post api/building: ${error}`);
  }
};

export const deleteBuilding = async ({
  data,
}: {
  data: Pick<TBuildingSchema, "id">;
}): Promise<any> => {
  const path = data.id;

  const axiosInstance = setupInterceptorsTo(axios.create());

  try {
    const response = await axiosInstance.delete(`/building/${path}`);
    return response;
  } catch (error) {
    throw new Error(`Failed to delete api/building: ${error}`);
  }
};
