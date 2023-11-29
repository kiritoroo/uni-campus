import { objectToFormData } from "@Utils/common.utils";
import { setupInterceptorsTo } from "./axios-interceptors";
import { TBlockSchema, blockSchema } from "../schemas/block/base";
import { TBlockCreateSchema } from "../schemas/block/create";
import { TBlockUpdateSchema } from "../schemas/block/update";
import axios, { AxiosError } from "axios";
import { z } from "zod";
import { TBlockPopulateSchema, blockPopulateSchema } from "../schemas/block/populate";
import qs from "query-string";

export const getBlocks = async ({
  data = undefined,
}: {
  data?: Pick<TBlockSchema, "building_id">;
}): Promise<TBlockSchema[]> => {
  const query = data ? qs.stringify(data) : "";

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

export const getBlocksPopulate = async ({
  data = undefined,
}: {
  data?: Pick<TBlockSchema, "building_id">;
}): Promise<TBlockPopulateSchema[]> => {
  const query = qs.stringify({
    populate: true,
    ...(data ? data : {}),
  });

  const axiosInstance = setupInterceptorsTo(axios.create());

  try {
    const response = await axiosInstance.get(`/block?${query}`);
    return z.array(blockPopulateSchema).parse(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      throw new Error(response?.data?.detail);
    }
    throw new Error(`Failed to get api/block populate: ${error}`);
  }
};

export const getBlock = async ({
  data,
}: {
  data: Pick<TBlockSchema, "id">;
}): Promise<TBlockSchema> => {
  const path = data.id;

  const axiosInstance = setupInterceptorsTo(axios.create());

  try {
    const response = await axiosInstance.get(`/block/${path}`);
    return blockSchema.parse(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      throw new Error(response?.data?.detail);
    }
    throw new Error(`Failed to get api/block:id: ${error}`);
  }
};

export const getBlockPopulate = async ({
  data,
}: {
  data: Pick<TBlockSchema, "id">;
}): Promise<TBlockPopulateSchema> => {
  const path = data.id;
  const query = qs.stringify({
    populate: true,
  });

  const axiosInstance = setupInterceptorsTo(axios.create());

  try {
    const response = await axiosInstance.get(`/block/${path}?${query}`);
    return blockPopulateSchema.parse(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      throw new Error(response?.data?.detail);
    }
    throw new Error(`Failed to get api/block:id populate: ${error}`);
  }
};

export const postBlock = async ({ data }: { data: TBlockCreateSchema }): Promise<TBlockSchema> => {
  const form = objectToFormData<TBlockCreateSchema>(data);

  const axiosInstance = setupInterceptorsTo(
    axios.create({
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  );

  try {
    const response = await axiosInstance.post("/block", form);
    return blockSchema.parse(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      throw new Error(response?.data?.detail);
    }
    throw new Error(`Failed to post api/block: ${error}`);
  }
};

export const putBlock = async ({
  data,
}: {
  data: TBlockUpdateSchema & Pick<TBlockSchema, "id">;
}): Promise<TBlockSchema> => {
  const path = data.id;
  const form = objectToFormData<TBlockUpdateSchema>(data);

  const axiosInstance = setupInterceptorsTo(
    axios.create({
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  );

  try {
    const response = await axiosInstance.put(`/block/${path}`, form);
    return blockSchema.parse(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      throw new Error(response?.data?.detail);
    }
    throw new Error(`Failed to put api/block: ${error}`);
  }
};

export const deleteBlock = async ({ data }: { data: Pick<TBlockSchema, "id"> }): Promise<any> => {
  const path = data.id;

  const axiosInstance = setupInterceptorsTo(axios.create());

  try {
    const response = await axiosInstance.delete(`/block/${path}`);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      throw new Error(response?.data?.detail);
    }
    throw new Error(`Failed to delete api/block: ${error}`);
  }
};
