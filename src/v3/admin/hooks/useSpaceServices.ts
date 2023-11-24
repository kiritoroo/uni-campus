import { useQuery, useMutation, UseMutationOptions } from "react-query";
import { getSpaces, getSpace, postSpace, putSpace, deleteSpace } from "../services/space-services";
import { TSpaceSchema } from "../schemas/space/base";
import { TSpaceCreateSchema } from "../schemas/space/create";
import { TSpaceUpdateSchema } from "../schemas/space/update";

export const useSpaceServices = () => {
  const listSpaces = (ver: string) => {
    return useQuery(["api/get-spaces", ver], () => getSpaces(), {
      staleTime: 5 * 60 * 1000,
      keepPreviousData: true,
      retry: false,
    });
  };

  const detailSpace = (ver: string, data: Pick<TSpaceSchema, "id">) => {
    return useQuery(["api/get-space", ver, data], () => getSpace({ data }), {
      staleTime: 5 * 60 * 100,
      keepPreviousData: true,
      retry: false,
    });
  };

  const createSpace = (data: TSpaceCreateSchema, option?: UseMutationOptions<TSpaceSchema>) => {
    return useMutation(["api/post-space", data], () => postSpace({ data: data }), option);
  };

  const updateSpace = (
    option?: UseMutationOptions<TSpaceSchema, any, TSpaceUpdateSchema & Pick<TSpaceSchema, "id">>,
  ) => {
    return useMutation(["api/put-space"], (data) => putSpace({ data: data }), option);
  };

  const removeSpace = (data: Pick<TSpaceSchema, "id">, option?: UseMutationOptions) => {
    return useMutation(["api/delete-space", data], () => deleteSpace({ data }), option);
  };

  return {
    listSpaces,
    detailSpace,
    createSpace,
    updateSpace,
    removeSpace,
  };
};
