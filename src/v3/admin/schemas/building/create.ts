import z from "zod";

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
const modelFileField = z.instanceof(File);
const previewFileField = z.instanceof(File);
const orderField = z.number();

const buildingCreateSchema = z.object({
  name: nameField,
  position: positionField,
  rotation: rotationField,
  scale: scaleField,
  model_file: modelFileField,
  preview_file: previewFileField,
  order: orderField,
});

type TBuildingCreateSchema = z.infer<typeof buildingCreateSchema>;

export { buildingCreateSchema };
export type { TBuildingCreateSchema };
