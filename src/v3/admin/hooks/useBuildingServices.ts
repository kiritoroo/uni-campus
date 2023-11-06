import { useQuery, useMutation, UseMutationOptions } from "react-query";
import { deleteBuilding, getBuildings, postBuilding } from "../services/building-services";
import { TBuildingCreateSchema } from "../widgets/building/schemas/create-schema";
import { TBuildingSchema } from "../schemas/building-schema";

export default function useBuildingServices() {
  const listBuildings = () => {
    return useQuery(["api/get-buildings"], () => getBuildings(), {
      staleTime: 5 * 60 * 1000,
      keepPreviousData: true,
      retry: false,
    });
  };

  const createBuilding = (data: TBuildingCreateSchema, option?: UseMutationOptions) => {
    return useMutation(["api/post-building", data], () => postBuilding({ data: data }), option);
  };

  const removeBuilding = (data: Pick<TBuildingSchema, "id">, option?: UseMutationOptions) => {
    return useMutation(["api/delete-building", data], () => deleteBuilding({ data }), option);
  };

  return {
    listBuildings,
    createBuilding,
    removeBuilding,
  };
}
