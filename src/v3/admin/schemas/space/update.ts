import z from "zod";

const nameField = z.optional(z.string()).nullable();
const colorField = z.optional(z.string().min(4).max(9).regex(/^#/)).nullable();
const iconFileField = z.optional(z.instanceof(File).nullable());
const isPublicField = z.optional(z.boolean()).nullable();

const spaceUpdateSchema = z.object({
  name: nameField,
  color: colorField,
  icon_file: iconFileField,
  is_public: isPublicField,
});

type TSpaceUpdateSchema = z.infer<typeof spaceUpdateSchema>;

export { spaceUpdateSchema };
export type { TSpaceUpdateSchema };
