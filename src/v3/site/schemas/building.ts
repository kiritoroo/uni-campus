import { z } from "zod";

const buildingSchema = z.object({
  id: z.string(),
  name: z.string(),
  position: z.object({
    x: z.coerce.number(),
    y: z.coerce.number(),
    z: z.coerce.number(),
  }),
  rotation: z.object({
    x: z.coerce.number(),
    y: z.coerce.number(),
    z: z.coerce.number(),
  }),
  scale: z.object({
    x: z.coerce.number(),
    y: z.coerce.number(),
    z: z.coerce.number(),
  }),
  model_3d: z.object({
    id: z.string(),
    url: z.string(),
    filename: z.string(),
    extension: z.string(),
    length: z.number(),
    content_type: z.string(),
  }),
  preview_img: z.object({
    id: z.string(),
    url: z.string(),
    filename: z.string(),
    extension: z.string(),
    length: z.number(),
    content_type: z.string(),
  }),
  order: z.number(),
  blocks: z.array(
    z.object({
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
          is_publish: z.boolean(),
          created_at: z.string().transform((v) => new Date(v)),
          updated_at: z.string().transform((v) => new Date(v)),
        })
        .nullable(),
      is_publish: z.boolean(),
      created_at: z.string().transform((v) => new Date(v)),
      updated_at: z.string().transform((v) => new Date(v)),
    }),
  ),
  is_publish: z.boolean(),
  created_at: z.string().transform((v) => new Date(v)),
  updated_at: z.string().transform((v) => new Date(v)),
});

type TBuildingSchema = z.infer<typeof buildingSchema>;

export { buildingSchema };
export type { TBuildingSchema };
