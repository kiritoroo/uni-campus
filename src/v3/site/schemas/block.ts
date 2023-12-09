import { z } from "zod";

const blockSchema = z.object({
  id: z.string(),
  name: z.string(),
  obj_name: z.string(),
  building_id: z.string(),
  uses: z.string(),
  direction_url: z.string(),
  coordinate: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  marker_position: z.object({
    x: z.coerce.number(),
    y: z.coerce.number(),
    z: z.coerce.number(),
  }),
  gallery: z.array(
    z.object({
      id: z.string(),
      url: z.string(),
      filename: z.string(),
      extension: z.string(),
      length: z.number(),
      content_type: z.string(),
    }),
  ),
  order: z.number(),
  space: z
    .object({
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
    })
    .nullable(),
  is_publish: z.boolean(),
  created_at: z.string().transform((v) => new Date(v)),
  updated_at: z.string().transform((v) => new Date(v)),
});
type TBlockSchema = z.infer<typeof blockSchema>;

export { blockSchema };
export type { TBlockSchema };
