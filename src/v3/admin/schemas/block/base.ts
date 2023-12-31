import { z } from "zod";
import { fileInfoSchema } from "../fileinfo-schema";

const idField = z.string();
const nameField = z.string();
const objNameField = z.string();
const buildingIdField = z.string();
const spaceIdField = z.string().nullable();
const usesField = z.string();
const directionUrl = z.string();
const coordinateField = z.object({
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
});
const markerPositionField = z.object({
  x: z.coerce.number(),
  y: z.coerce.number(),
  z: z.coerce.number(),
});
const galleryField = z.array(fileInfoSchema);
const orderField = z.coerce.number();
const slugField = z.string();
const isPublishField = z.boolean();
const createdAtField = z.string().transform((v) => new Date(v));
const updatedAtField = z.string().transform((v) => new Date(v));

const blockSchema = z.object({
  id: idField,
  name: nameField,
  obj_name: objNameField,
  building_id: buildingIdField,
  space_id: spaceIdField,
  uses: usesField,
  direction_url: directionUrl,
  coordinate: coordinateField,
  marker_position: markerPositionField,
  gallery: galleryField,
  order: orderField,
  slug: slugField,
  is_publish: isPublishField,
  created_at: createdAtField,
  updated_at: updatedAtField,
});

type TBlockSchema = z.infer<typeof blockSchema>;

export { blockSchema };
export type { TBlockSchema };
