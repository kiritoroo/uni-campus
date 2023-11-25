import { z } from "zod";
import { fileInfoSchema } from "../fileinfo-schema";

const nameField = z.string();
const objNameField = z.string();
const buildingIdField = z.string();
const spaceIdField = z.string();
const usesField = z.string();
const directionUrl = z.string();
const coordinateField = z.object({
  latitude: z.number(),
  longitude: z.number(),
});
const markerPositionField = z.object({
  x: z.coerce.number(),
  y: z.coerce.number(),
  z: z.coerce.number(),
});
const galleryField = z.array(fileInfoSchema);

const blockCreateSchema = z.object({
  name: nameField,
  obj_name: objNameField,
  building_id: buildingIdField,
  space_id: spaceIdField,
  uses: usesField,
  direction_url: directionUrl,
  coordinate: coordinateField,
  marker_position: markerPositionField,
  gallery: galleryField,
});

type TBlockCreateSchema = z.infer<typeof blockCreateSchema>;

export { blockCreateSchema };
export type { TBlockCreateSchema };
