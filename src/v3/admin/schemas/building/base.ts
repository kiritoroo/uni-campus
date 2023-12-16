import { z } from "zod";
import { fileInfoSchema } from "../fileinfo-schema";

const idField = z.string();
const nameField = z.string();
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
const orderField = z.coerce.number();
const isPublishField = z.boolean();
const createdAtField = z.string().transform((v) => new Date(v));
const updatedAtField = z.string().transform((v) => new Date(v));

const buildingSchema = z.object({
  id: idField,
  name: nameField,
  position: positionField,
  rotation: rotationField,
  scale: scaleField,
  model_3d: fileInfoSchema,
  preview_img: fileInfoSchema,
  order: orderField,
  is_publish: isPublishField,
  created_at: createdAtField,
  updated_at: updatedAtField,
});

type TBuildingSchema = z.infer<typeof buildingSchema>;

export { buildingSchema };
export type { TBuildingSchema };
