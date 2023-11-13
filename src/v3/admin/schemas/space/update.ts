import z from "zod";

const nameField = z.string();
const colorField = z.string().min(4).max(9).regex(/^#/);
const iconFileField = z.optional(z.instanceof(File).nullable());

const spaceUpdateSchema = z.object({
  name: nameField,
  color: colorField,
  icon_file: iconFileField,
});

type TSpaceUpdateSchema = z.infer<typeof spaceUpdateSchema>;

export { spaceUpdateSchema };
export type { TSpaceUpdateSchema };
