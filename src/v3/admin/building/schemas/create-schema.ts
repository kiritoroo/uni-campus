import z from "zod";

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
const modelFileField = z.instanceof(File);
const previewFileField = z.instanceof(File);

const buildingCreateSchema = z.object({
  name: nameField,
  space_id: spaceIDField,
  uses: usesField,
  position: positionField,
  rotation: rotationField,
  scale: scaleField,
  model_file: modelFileField,
  preview_file: previewFileField,
});

type TBuildingCreateSchema = z.infer<typeof buildingCreateSchema>;

export { buildingCreateSchema };
export type { TBuildingCreateSchema };
