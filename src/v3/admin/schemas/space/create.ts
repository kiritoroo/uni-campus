import z from "zod";

const nameField = z.string();
const colorField = z.string().min(4).max(9).regex(/^#/);
const iconFileField = z.instanceof(File);

const spaceCreateSchema = z.object({
  name: nameField,
  color: colorField,
  icon_file: iconFileField,
});

type TSpaceCreateSchema = z.infer<typeof spaceCreateSchema>;

export { spaceCreateSchema };
export type { TSpaceCreateSchema };