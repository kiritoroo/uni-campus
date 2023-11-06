import { useMutation, UseMutationOptions } from "react-query";
import { TBuildingCreateSchema } from "../building/schemas/create-schema";
import { postBuilding } from "../services/building-services";

export default function useBuildingServices() {
  const createBuilding = (data: TBuildingCreateSchema, option?: UseMutationOptions) => {
    return useMutation(["api/post-building", data], () => postBuilding({ data: data }), option);
  };

  return {
    createBuilding,
  };
}
