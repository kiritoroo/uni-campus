import { TCambusBuildingData, TSoundEffectData } from "@Types/db.type";

export const sounds_effect_data: TSoundEffectData[] = [
  {
    name: "mouseover1",
    volume: 2,
    file_url: "/sounds/mouseover1.mp3",
  },
  {
    name: "mouseover2",
    volume: 1,
    file_url: "/sounds/mouseover2.mp3",
  },
];

export const campus_buildings_data: TCambusBuildingData[] = [
  {
    name: "block-f1",
    model_url: "/models/block-f1.glb",
    label: "ブロック F1",
    uses: "Classroom and workshop block",
  },
  {
    name: "dome-courtyard",
    model_url: "/models/dome-courtyard.glb",
    label: "ドームの中庭",
    uses: "Outdoor courtyard space",
  },
  {
    name: "block-e1",
    model_url: "/models/block-e1.glb",
    label: "ブロック E1",
    uses: "Academic training",
  },
  {
    name: "block-e13",
    model_url: "/models/block-e13.glb",
    label: "ブロック E13",
    uses: "Cafeteria and dining area",
  },
];
