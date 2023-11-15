import z from "zod";

const nameField = z.optional(z.string()).nullable();
const spaceIDField = z.optional(z.string()).nullable();
const usesField = z.optional(z.string()).nullable();
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
const isPublicField = z.optional(z.boolean()).nullable();

const buildingUpdateSchema = z.object({
  name: nameField,
  space_id: spaceIDField,
  uses: usesField,
  position: positionField,
  rotation: rotationField,
  scale: scaleField,
  model_file: modelFileField,
  preview_file: previewFileField,
  is_public: isPublicField,
});

type TBuildingUpdateSchema = z.infer<typeof buildingUpdateSchema>;

export { buildingUpdateSchema };
export type { TBuildingUpdateSchema };
