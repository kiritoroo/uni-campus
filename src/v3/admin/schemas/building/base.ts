import { z } from "zod";
import { fileInfoSchema } from "../fileinfo-schema";

const idField = z.string();
const nameField = z.string();
const spaceIDField = z.string();
const usesField = z.string();
const positionField = z.object({
  x: z.coerce.number(),
  y: z.coerce.number(),
  z: z.coerce.number(),
});
const rotationField = z.object({
  x: z.coerce.number(),
  y: z.coerce.number(),
  z: z.coerce.number(),
});
const scaleField = z.object({
  x: z.coerce.number(),
  y: z.coerce.number(),
  z: z.coerce.number(),
});
const createdAtField = z.string().transform((v) => new Date(v));
const updatedAtField = z.string().transform((v) => new Date(v));

const buildingSchema = z.object({
  id: idField,
  name: nameField,
  space_id: spaceIDField,
  uses: usesField,
  position: positionField,
  rotation: rotationField,
  scale: scaleField,
  model_3d: fileInfoSchema,
  preview_img: fileInfoSchema,
  created_at: createdAtField,
  updated_at: updatedAtField,
});

type TBuildingSchema = z.infer<typeof buildingSchema>;

export { buildingSchema };
export type { TBuildingSchema };
