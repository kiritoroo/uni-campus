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
    label: "Dome Courtyard",
    uses: "Outdoor courtyard space",
  },
];
