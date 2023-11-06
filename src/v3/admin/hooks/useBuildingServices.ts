import { useQuery, useMutation, UseMutationOptions } from "react-query";
import { TBuildingCreateSchema } from "../building/schemas/create-schema";
import { getBuildings, postBuilding } from "../services/building-services";

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

  return {
    listBuildings,
    createBuilding,
  };
}
