import { ISpaceData, TCambusBuildingData, TSoundEffectData } from "@Types/db.type";
import { assets } from "./assets";

export const sounds_effect_data: TSoundEffectData[] = [
  {
    name: "mouseover",
    volume: 1,
    file_url: assets.sounds.MOUSE_OVER_SFX_PATH,
  },
  {
    name: "mouseclick",
    volume: 1,
    file_url: assets.sounds.MOUSE_CLICK_SFX_PATH,
  },
];

export const spacesData: ISpaceData[] = [
  {
    id: "academic",
    label: "Academic",
    iconPath: assets.images.ACADEMIC_SPACE_ICON_PATH,
  },
  {
    id: "office",
    label: "Office",
    iconPath: assets.images.OFFICE_SPACE_ICON_PATH,
  },
  {
    id: "workshop",
    label: "Workshop",
    iconPath: assets.images.WORKSHOP_SPACE_ICON_PATH,
  },
  {
    id: "sport",
    label: "Sport",
    iconPath: assets.images.SPORT_SPACE_ICON_PATH,
  },
  {
    id: "service",
    label: "Service",
    iconPath: assets.images.SERVICE_SPACE_ICON_PATH,
  },
  {
    id: "parking",
    label: "Parking",
    iconPath: assets.images.PARKING_SPACE_ICON_PATH,
  },
  {
    id: "park",
    label: "Park",
    iconPath: assets.images.PARK_SPACE_ICON_PATH,
  },
];

export const campus_buildings_data: TCambusBuildingData[] = [
  {
    name: "building-a",
    space: "academic",
    model_url: "/models/building-a.glb",
    uses: "Classroom and workshop block",
    blocks: [
      {
        name: "block-a1",
        space: "office",
        label: "A1",
        uses: "Classrom block",
      },
      {
        name: "block-a2",
        space: "academic",
        label: "A2",
        uses: "Classrom block",
      },
      {
        name: "block-a3",
        space: "academic",
        label: "A3",
        uses: "Classrom block",
      },
      {
        name: "block-a4",
        space: "academic",
        label: "A4",
        uses: "Classrom block",
      },
      {
        name: "block-a5",
        space: "academic",
        label: "A5",
        uses: "Classrom block",
      },
    ],
  },
  {
    name: "block-f1",
    space: "academic",
    model_url: "/models/block-f1.glb",
    label: "F1",
    uses: "Classroom and workshop block",
  },
  {
    name: "dome-courtyard",
    space: "sport",
    model_url: "/models/dome-courtyard.glb",
    label: "Dome Courtyard",
    uses: "Outdoor courtyard space",
  },
  {
    name: "block-e1",
    space: "academic",
    model_url: "/models/block-e1.glb",
    label: "E1",
    uses: "Academic training",
  },
  {
    name: "block-e2",
    space: "sport",
    model_url: "/models/block-e2.glb",
    label: "Sports stadium",
    uses: "Sport zone",
  },
  {
    name: "block-e3",
    space: "workshop",
    model_url: "/models/block-e3.glb",
    label: "Printing workshop",
    uses: "Workshop block",
  },
  {
    name: "block-e4",
    space: "workshop",
    model_url: "/models/block-e4.glb",
    label: "Welding workshop",
    uses: "Workshop block",
  },
  {
    name: "block-e7",
    space: "workshop",
    model_url: "/models/block-e7.glb",
    label: "E3",
    uses: "Workshop block",
  },
  {
    name: "block-e9",
    space: "academic",
    model_url: "/models/block-e9.glb",
    label: "E4",
    uses: "Academic training",
  },
  {
    name: "block-e10",
    space: "academic",
    model_url: "/models/block-e10.glb",
    label: "IT Center",
    uses: "Academic training",
  },
  {
    name: "block-e13",
    space: "service",
    model_url: "/models/block-e13.glb",
    label: "E2",
    uses: "Cafeteria and dining area",
  },
  {
    name: "block-e14",
    space: "service",
    model_url: "/models/block-e14.glb",
    label: "E2",
    uses: "Cafeteria and dining area",
  },
  {
    name: "block-g",
    space: "academic",
    model_url: "/models/block-g.glb",
    label: "G",
    uses: "Academic training",
  },
  {
    name: "engine-workshop",
    space: "workshop",
    model_url: "/models/engine-workshop.glb",
    label: "Engine workshop",
    uses: "Workshop block",
  },
  {
    name: "parking-zone-a",
    space: "parking",
    model_url: "/models/parking-zone-a.glb",
    label: "P",
    uses: "Pakring zone for students",
  },
  {
    name: "parking-zone-center",
    space: "parking",
    model_url: "/models/parking-zone-center.glb",
    label: "P",
    uses: "Pakring zone for teachers",
  },
];
