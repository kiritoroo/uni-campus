import { useQuery } from "react-query";
import { getSpaces } from "../services/space-services";

export const useSpaceServices = () => {
  const listSpaces = () => {
    return useQuery(["api/get-spaces"], () => getSpaces(), {
      staleTime: 5 * 60 * 1000,
      keepPreviousData: true,
      retry: false,
    });
  };

  return {
    listSpaces,
  };
};
