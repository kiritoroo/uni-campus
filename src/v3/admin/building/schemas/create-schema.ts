import z from "zod";

const nameField = z.string();
const spaceIDField = z.string();
const fileURLField = z.string();
const previewURLField = z.string();
const usesField = z.string();
const positionField = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
});
const rotationField = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
});
const scaleField = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
});

const createBuildingSchema = z.object({
  name: nameField,
  space_id: spaceIDField,
  file_url: fileURLField,
  pewview_url: previewURLField,
  uses: usesField,
  position: positionField,
  rotation: rotationField,
  scale: scaleField,
});

type TCreateBuildingSchema = z.infer<typeof createBuildingSchema>;

export { createBuildingSchema };
export type { TCreateBuildingSchema };
