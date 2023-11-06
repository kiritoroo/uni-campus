import { z } from "zod";

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
const modelURLField = z.string();
const previewURLField = z.string();

const buildingSchema = z.object({
  id: idField,
  name: nameField,
  space_id: spaceIDField,
  uses: usesField,
  position: positionField,
  rotation: rotationField,
  scale: scaleField,
  model_url: modelURLField,
  preview_url: previewURLField,
});

type TBuildingSchema = z.infer<typeof buildingSchema>;

export { buildingSchema };
export type { TBuildingSchema };
