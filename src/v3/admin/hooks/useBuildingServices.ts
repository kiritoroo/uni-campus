import { useQuery, useMutation, UseMutationOptions } from "react-query";
import {
  deleteBuilding,
  getBuilding,
  getBuildings,
  postBuilding,
  putBuilding,
} from "../services/building-services";
import { TBuildingSchema } from "../schemas/building/base";
import { TBuildingCreateSchema } from "../schemas/building/create";
import { TBuildingUpdateSchema } from "../schemas/building/update";

export default function useBuildingServices() {
  const listBuildings = () => {
    return useQuery(["api/get-buildings"], () => getBuildings(), {
      staleTime: 5 * 60 * 1000,
      keepPreviousData: true,
      retry: false,
    });
  };

  const detailBuilding = (data: Pick<TBuildingSchema, "id">) => {
    return useQuery(["api/get-building", data], () => getBuilding({ data }), {
      staleTime: 5 * 60 * 100,
      keepPreviousData: true,
      retry: false,
    });
  };

  const createBuilding = (
    data: TBuildingCreateSchema,
    option?: UseMutationOptions<TBuildingSchema>,
  ) => {
    return useMutation(["api/post-building", data], () => postBuilding({ data: data }), option);
  };

  const updateBuilding = (
    data: TBuildingUpdateSchema & Pick<TBuildingSchema, "id">,
    option?: UseMutationOptions<TBuildingSchema>,
  ) => {
    return useMutation(["api/put-building", data], () => putBuilding({ data: data }), option);
  };

  const removeBuilding = (data: Pick<TBuildingSchema, "id">, option?: UseMutationOptions) => {
    return useMutation(["api/delete-building", data], () => deleteBuilding({ data }), option);
  };

  return {
    listBuildings,
    detailBuilding,
    createBuilding,
    updateBuilding,
    removeBuilding,
  };
}
