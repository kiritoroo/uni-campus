import { z } from "zod";
import { fileInfoSchema } from "../fileinfo-schema";

const idField = z.string();
const nameField = z.string();
const colorField = z.string().min(4).max(9).regex(/^#/);
const isPublicField = z.boolean();
const createdAtField = z.string().transform((v) => new Date(v));
const updatedAtField = z.string().transform((v) => new Date(v));

const spaceSchema = z.object({
  id: idField,
  name: nameField,
  color: colorField,
  icon: fileInfoSchema,
  is_public: isPublicField,
  created_at: createdAtField,
  updated_at: updatedAtField,
});

type TSpaceSchema = z.infer<typeof spaceSchema>;

export { spaceSchema };
export type { TSpaceSchema };