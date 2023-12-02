import { TSpaceCreateSchema } from "../schemas/space/create";
import { TSpaceUpdateSchema } from "../schemas/space/update";
import { TSpaceSchema, spaceSchema } from "../schemas/space/base";
import { setupInterceptorsTo } from "@v3/admin/services/axios-interceptors";
import { objectToFormData } from "@Utils/common.utils";
import axios, { AxiosError } from "axios";
import { z } from "zod";

export const getSpaces = async (): Promise<TSpaceSchema[]> => {
  const axiosInstance = setupInterceptorsTo(axios.create());

  try {
    const response = await axiosInstance.get("/space");
    return z.array(spaceSchema).parse(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      throw new Error(response?.data?.detail);
    }
    throw new Error(`Failed to get api/space: ${error}`);
  }
};

export const getSpace = async ({
  data,
}: {
  data: Pick<TSpaceSchema, "id">;
}): Promise<TSpaceSchema> => {
  const path = data.id;

  const axiosInstance = setupInterceptorsTo(axios.create());

  try {
    const response = await axiosInstance.get(`/space/${path}`);
    return spaceSchema.parse(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      throw new Error(response?.data?.detail);
    }
    throw new Error(`Failed to get api/space:id: ${error}`);
  }
};

export const postSpace = async ({ data }: { data: TSpaceCreateSchema }): Promise<TSpaceSchema> => {
  const form = objectToFormData<TSpaceCreateSchema>(data);

  const axiosInstance = setupInterceptorsTo(
    axios.create({
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  );

  try {
    const response = await axiosInstance.post("/space", form);
    return spaceSchema.parse(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      throw new Error(response?.data?.detail);
    }
    throw new Error(`Failed to post api/space: ${error}`);
  }
};

export const putSpace = async ({
  data,
}: {
  data: TSpaceUpdateSchema & Pick<TSpaceSchema, "id">;
}): Promise<TSpaceSchema> => {
  const path = data.id;
  const form = objectToFormData<TSpaceUpdateSchema>(data);

  const axiosInstance = setupInterceptorsTo(
    axios.create({
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  );

  try {
    const response = await axiosInstance.put(`/space/${path}`, form);
    return spaceSchema.parse(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      throw new Error(response?.data?.detail);
    }
    throw new Error(`Failed to put api/space: ${error}`);
  }
};

export const deleteSpace = async ({ data }: { data: Pick<TSpaceSchema, "id"> }): Promise<any> => {
  const path = data.id;

  const axiosInstance = setupInterceptorsTo(axios.create());

  try {
    const response = await axiosInstance.delete(`/space/${path}`);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      throw new Error(response?.data?.detail);
    }
    throw new Error(`Failed to delete api/space: ${error}`);
  }
};
