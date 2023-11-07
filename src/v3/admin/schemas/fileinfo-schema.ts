import { z } from "zod";

const idField = z.string();
const urlField = z.string();
const filenameField = z.string();
const extensionField = z.string();
const lengthField = z.number();
const contentTypeField = z.string();

const fileInfoSchema = z.object({
  id: idField,
  url: urlField,
  filename: filenameField,
  extension: extensionField,
  length: lengthField,
  content_type: contentTypeField,
});

type TFileInfoSchema = z.infer<typeof fileInfoSchema>;

export { fileInfoSchema };
export type { TFileInfoSchema };
