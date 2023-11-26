import { z } from "zod";
import { buildingSchema } from "./base";
import { blockPopulateSchema } from "../block/populate";

const buildingPopulateSchema = buildingSchema.and(
  z.object({
    blocks: blockPopulateSchema,
  }),
);

type TBuildingPopulateSchema = z.infer<typeof buildingPopulateSchema>;

export { buildingPopulateSchema };
export type { TBuildingPopulateSchema };
