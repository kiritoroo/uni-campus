import z from "zod";

const nameField = z.optional(z.string()).nullable();
const colorField = z.optional(z.string().min(4).max(9).regex(/^#/)).nullable();
const iconFileField = z.optional(z.instanceof(File).nullable());
const orderField = z.optional(z.coerce.number()).nullable();
const slugField = z.optional(z.string()).nullable();
const isPublishField = z.optional(z.boolean()).nullable();

const spaceUpdateSchema = z.object({
  name: nameField,
  color: colorField,
  icon_file: iconFileField,
  order: orderField,
  slug: slugField,
  is_publish: isPublishField,
});

type TSpaceUpdateSchema = z.infer<typeof spaceUpdateSchema>;

export { spaceUpdateSchema };
export type { TSpaceUpdateSchema };
