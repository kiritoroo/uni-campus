import { z } from "zod";

const nameField = z.optional(z.string());
const spaceIdField = z.optional(z.string());
const usesField = z.optional(z.string());
const directionUrl = z.optional(z.string());
const coordinateField = z.optional(
  z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
);
const markerPositionField = z.optional(
  z.object({
    x: z.coerce.number(),
    y: z.coerce.number(),
    z: z.coerce.number(),
  }),
);
const galleryField = z.optional(z.instanceof(File));
const orderField = z.optional(z.number()).nullable();
const slugField = z.optional(z.string()).nullable();
const isPublishField = z.optional(z.boolean()).nullable();

const blockUpdateSchema = z.object({
  name: nameField,
  space_id: spaceIdField,
  uses: usesField,
  direction_url: directionUrl,
  coordinate: coordinateField,
  marker_position: markerPositionField,
  gallery: galleryField,
  order: orderField,
  slug: slugField,
  is_publish: isPublishField,
});

type TBlockUpdateSchema = z.infer<typeof blockUpdateSchema>;

export { blockUpdateSchema };
export type { TBlockUpdateSchema };
