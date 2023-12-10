import z from "zod";

const nameField = z.optional(z.string()).nullable();
const positionField = z
  .optional(
    z.object({
      x: z.coerce.number(),
      y: z.coerce.number(),
      z: z.coerce.number(),
    }),
  )
  .nullable();
const rotationField = z
  .optional(
    z.object({
      x: z.coerce.number(),
      y: z.coerce.number(),
      z: z.coerce.number(),
    }),
  )
  .nullable();
const scaleField = z
  .optional(
    z.object({
      x: z.coerce.number(),
      y: z.coerce.number(),
      z: z.coerce.number(),
    }),
  )
  .nullable();
const modelFileField = z.optional(z.instanceof(File).nullable());
const previewFileField = z.optional(z.instanceof(File).nullable());
const orderField = z.optional(z.number()).nullable();
const isPublishField = z.optional(z.boolean()).nullable();

const buildingUpdateSchema = z.object({
  name: nameField,
  position: positionField,
  rotation: rotationField,
  scale: scaleField,
  model_file: modelFileField,
  preview_file: previewFileField,
  order: orderField,
  is_publish: isPublishField,
});

type TBuildingUpdateSchema = z.infer<typeof buildingUpdateSchema>;

export { buildingUpdateSchema };
export type { TBuildingUpdateSchema };
