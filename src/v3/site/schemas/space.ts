import { z } from "zod";

const spaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string().min(4).max(9).regex(/^#/),
  icon: z.object({
    id: z.string(),
    url: z.string(),
    filename: z.string(),
    extension: z.string(),
    length: z.number(),
    content_type: z.string(),
  }),
  order: z.number(),
  is_publish: z.boolean(),
  created_at: z.string().transform((v) => new Date(v)),
  updated_at: z.string().transform((v) => new Date(v)),
});

type TSpaceSchema = z.infer<typeof spaceSchema>;

export { spaceSchema };
export type { TSpaceSchema };
