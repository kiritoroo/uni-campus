import { useQuery, useMutation, UseMutationOptions } from "react-query";
import {
  getBlocks,
  getBlock,
  postBlock,
  putBlock,
  deleteBlock,
  getBlocksPopulate,
  getBlockPopulate,
} from "../services/block-services";
import { TBlockSchema } from "../schemas/block/base";
import { TBlockCreateSchema } from "../schemas/block/create";
import { TBlockUpdateSchema } from "../schemas/block/update";

export const useBlockServices = () => {
  const listBlocks = (ver: string) => {
    return useQuery(["api/get-blocks", ver], () => getBlocks(), {
      staleTime: 5 * 60 * 1000,
      keepPreviousData: true,
      retry: false,
    });
  };

  const listBlocksPopulate = (ver: string) => {
    return useQuery(["api/get-blocks-populate", ver], () => getBlocksPopulate(), {
      staleTime: 5 * 60 * 1000,
      keepPreviousData: true,
      retry: false,
    });
  };

  const detalBlock = (ver: string, data: Pick<TBlockSchema, "id">) => {
    return useQuery(["api/get-block", ver, data], () => getBlock({ data }), {
      staleTime: 5 * 60 * 100,
      keepPreviousData: true,
      retry: false,
    });
  };

  const detalBlockPopulate = (ver: string, data: Pick<TBlockSchema, "id">) => {
    return useQuery(["api/get-block-populate", ver, data], () => getBlockPopulate({ data }), {
      staleTime: 5 * 60 * 100,
      keepPreviousData: true,
      retry: false,
    });
  };

  const createBlock = (option?: UseMutationOptions<TBlockSchema, any, TBlockCreateSchema>) => {
    return useMutation(["api/post-block"], (data) => postBlock({ data: data }), option);
  };

  const updateBlock = (
    option?: UseMutationOptions<TBlockSchema, any, TBlockUpdateSchema & Pick<TBlockSchema, "id">>,
  ) => {
    return useMutation(["api/put-block"], (data) => putBlock({ data: data }), option);
  };

  const removeBlock = (data: Pick<TBlockSchema, "id">, option?: UseMutationOptions) => {
    return useMutation(["api/delete-block", data], () => deleteBlock({ data }), option);
  };

  return {
    listBlocks,
    listBlocksPopulate,
    detalBlock,
    detalBlockPopulate,
    createBlock,
    updateBlock,
    removeBlock,
  };
};
