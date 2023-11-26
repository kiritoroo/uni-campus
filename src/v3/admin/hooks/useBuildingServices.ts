import { useQuery, useMutation, UseMutationOptions } from "react-query";
import {
  getBuildings,
  getBuilding,
  postBuilding,
  putBuilding,
  deleteBuilding,
  getBuildingsPopulate,
  getBuildingPopulate,
} from "../services/building-services";
import { TBuildingSchema } from "../schemas/building/base";
import { TBuildingCreateSchema } from "../schemas/building/create";
import { TBuildingUpdateSchema } from "../schemas/building/update";

export const useBuildingServices = () => {
  const listBuildings = (ver: string) => {
    return useQuery(["api/get-buildings", ver], () => getBuildings(), {
      staleTime: 5 * 60 * 1000,
      keepPreviousData: true,
      retry: false,
    });
  };

  const listBuildingsPopulate = (ver: string) => {
    return useQuery(["api/get-buildings-populate", ver], () => getBuildingsPopulate(), {
      staleTime: 5 * 60 * 1000,
      keepPreviousData: true,
      retry: false,
    });
  };

  const detailBuilding = (ver: string, data: Pick<TBuildingSchema, "id">) => {
    return useQuery(["api/get-building", ver, data], () => getBuilding({ data }), {
      staleTime: 5 * 60 * 100,
      keepPreviousData: true,
      retry: false,
    });
  };

  const detailBuildingPopulate = (ver: string, data: Pick<TBuildingSchema, "id">) => {
    return useQuery(["api/get-building", ver, data], () => getBuildingPopulate({ data }), {
      staleTime: 5 * 60 * 100,
      keepPreviousData: true,
      retry: false,
    });
  };

  const createBuilding = (
    option?: UseMutationOptions<TBuildingSchema, any, TBuildingCreateSchema>,
  ) => {
    return useMutation(["api/post-building"], (data) => postBuilding({ data: data }), option);
  };

  const updateBuilding = (
    option?: UseMutationOptions<
      TBuildingSchema,
      any,
      TBuildingUpdateSchema & Pick<TBuildingSchema, "id">
    >,
  ) => {
    return useMutation(["api/put-building"], (data) => putBuilding({ data: data }), option);
  };

  const removeBuilding = (data: Pick<TBuildingSchema, "id">, option?: UseMutationOptions) => {
    return useMutation(["api/delete-building", data], () => deleteBuilding({ data }), option);
  };

  return {
    listBuildings,
    listBuildingsPopulate,
    detailBuilding,
    detailBuildingPopulate,
    createBuilding,
    updateBuilding,
    removeBuilding,
  };
};
