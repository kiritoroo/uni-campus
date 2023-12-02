import { useQuery } from "react-query";
import { getBuilding, getBuildings } from "../services/building-services";
import { TBuildingSchema } from "../schemas/building";

export const useBuildingServices = () => {
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

  return {
    listBuildings,
    detailBuilding,
  };
};
