import { setupInterceptorsTo } from "@Utils/axios.utils";
import { TBuildingCreateSchema } from "../building/schemas/create-schema";
import axios from "axios";
import { objectToFormData } from "@Utils/common.utils";

export const postBuilding = async ({ data }: { data: TBuildingCreateSchema }) => {
  const form = objectToFormData<TBuildingCreateSchema>(data);

  const axiosInstance = setupInterceptorsTo(
    axios.create({
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  );

  try {
    const response = await axiosInstance.post("/building", form);
    return "ok";
  } catch (error) {
    throw new Error(`Failed to post api/building: ${error}`);
  }
};
