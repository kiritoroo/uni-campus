import { useQuery } from "react-query";
import { getBlocks } from "../services/block-services";

export const useBlockService = () => {
  const listBlocks = () => {
    return useQuery(["api/get-blocks"], () => getBlocks(), {
      staleTime: 5 * 60 * 1000,
      keepPreviousData: true,
      retry: false,
    });
  };

  return {
    listBlocks,
  };
};
