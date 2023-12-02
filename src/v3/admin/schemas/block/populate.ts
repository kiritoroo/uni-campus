import { z } from "zod";
import { blockSchema } from "./base";
import { spaceSchema } from "../space/base";

const blockPopulateSchema = blockSchema.omit({ space_id: true }).and(
  z
    .object({
      space: spaceSchema,
    })
    .nullable(),
);

type TBlockPopulateSchema = z.infer<typeof blockPopulateSchema>;

export { blockPopulateSchema };
export type { TBlockPopulateSchema };
