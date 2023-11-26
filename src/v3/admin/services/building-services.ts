import { objectToFormData } from "@Utils/common.utils";
import { setupInterceptorsTo } from "./axios-interceptors";
import { TBuildingCreateSchema } from "../schemas/building/create";
import { TBuildingSchema, buildingSchema } from "../schemas/building/base";
import { TBuildingUpdateSchema } from "@v3/admin/schemas/building/update";
import axios from "axios";
import { z } from "zod";
import { TBuildingPopulateSchema, buildingPopulateSchema } from "../schemas/building/populate";
import qs from "query-string";

export const getBuildings = async (): Promise<TBuildingSchema[]> => {
  const axiosInstance = setupInterceptorsTo(axios.create());

  try {
    const response = await axiosInstance.get("/building");
    return z.array(buildingSchema).parse(response.data);
  } catch (error) {
    throw new Error(`Failed to get api/building: ${error}`);
  }
};

export const getBuildingsPopulate = async (): Promise<TBuildingPopulateSchema[]> => {
  const query = qs.stringify({
    populate: true,
  });

  const axiosInstance = setupInterceptorsTo(axios.create());

  try {
    const response = await axiosInstance.get(`/building?${query}`);
    return z.array(buildingPopulateSchema).parse(response.data);
  } catch (error) {
    throw new Error(`Failed to get api/building populate: ${error}`);
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
    throw new Error(`Failed to get api/building:id: ${error}`);
  }
};

export const getBuildingPopulate = async ({
  data,
}: {
  data: Pick<TBuildingSchema, "id">;
}): Promise<TBuildingPopulateSchema> => {
  const path = data.id;
  const query = qs.stringify({
    populate: true,
  });

  const axiosInstance = setupInterceptorsTo(axios.create());

  try {
    const response = await axiosInstance.get(`/building/${path}?${query}`);
    return buildingPopulateSchema.parse(response.data);
  } catch (error) {
    throw new Error(`Failed to get api/building:id populate: ${error}`);
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

export const putBuilding = async ({
  data,
}: {
  data: TBuildingUpdateSchema & Pick<TBuildingSchema, "id">;
}): Promise<TBuildingSchema> => {
  const path = data.id;
  const form = objectToFormData<TBuildingUpdateSchema>(data);

  const axiosInstance = setupInterceptorsTo(
    axios.create({
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  );

  try {
    const response = await axiosInstance.put(`/building/${path}`, form);
    return buildingSchema.parse(response.data);
  } catch (error) {
    throw new Error(`Failed to put api/building: ${error}`);
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
