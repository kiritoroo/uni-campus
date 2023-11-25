import { z } from "zod";
import { fileInfoSchema } from "../fileinfo-schema";

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
const galleryField = z.optional(z.array(fileInfoSchema));
const isPublishField = z.optional(z.boolean()).nullable();

const blockCreateSchema = z.object({
  name: nameField,
  space_id: spaceIdField,
  uses: usesField,
  direction_url: directionUrl,
  coordinate: coordinateField,
  marker_position: markerPositionField,
  gallery: galleryField,
  is_publish: isPublishField,
});

type TBlockCreateSchema = z.infer<typeof blockCreateSchema>;

export { blockCreateSchema };
export type { TBlockCreateSchema };
