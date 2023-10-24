import { TCambusBuildingData, TSoundEffectData } from "@Types/db.type";

export const sounds_effect_data: TSoundEffectData[] = [
  {
    name: "mouseover",
    volume: 1,
    file_url: "/sounds/mouseover.mp3",
  },
  {
    name: "mouseclick",
    volume: 1,
    file_url: "/sounds/mouseclick.wav",
  },
];

export const campus_buildings_data: TCambusBuildingData[] = [
  {
    name: "block-f1",
    type: "academic",
    model_url: "/models/block-f1.glb",
    label: "F1",
    uses: "Classroom and workshop block",
  },
  {
    name: "dome-courtyard",
    type: "sport",
    model_url: "/models/dome-courtyard.glb",
    label: "Sân mái vòm",
    uses: "Outdoor courtyard space",
  },
  {
    name: "block-e1",
    type: "academic",
    model_url: "/models/block-e1.glb",
    label: "E1",
    uses: "Academic training",
  },
  {
    name: "block-e2",
    type: "sport",
    model_url: "/models/block-e2.glb",
    label: "Nhà thi đấu",
    uses: "Sport zone",
  },
  {
    name: "block-e3",
    type: "workshop",
    model_url: "/models/block-e3.glb",
    label: "Xưởng in",
    uses: "Workshop block",
  },
  {
    name: "block-e4",
    type: "workshop",
    model_url: "/models/block-e4.glb",
    label: "Xưởng hàn",
    uses: "Workshop block",
  },
  {
    name: "block-e7",
    type: "workshop",
    model_url: "/models/block-e7.glb",
    label: "E3",
    uses: "Workshop block",
  },
  {
    name: "block-e9",
    type: "academic",
    model_url: "/models/block-e9.glb",
    label: "E4",
    uses: "Academic training",
  },
  {
    name: "block-e10",
    type: "academic",
    model_url: "/models/block-e10.glb",
    label: "IT Center",
    uses: "Academic training",
  },
  {
    name: "block-e13",
    type: "service",
    model_url: "/models/block-e13.glb",
    label: "E2",
    uses: "Cafeteria and dining area",
  },
  {
    name: "block-e14",
    type: "service",
    model_url: "/models/block-e14.glb",
    label: "E2",
    uses: "Cafeteria and dining area",
  },
  {
    name: "block-g",
    type: "academic",
    model_url: "/models/block-g.glb",
    label: "G",
    uses: "Academic training",
  },
  {
    name: "engine-workshop",
    type: "workshop",
    model_url: "/models/engine-workshop.glb",
    label: "Xưởng động cơ",
    uses: "Workshop block",
  },
  {
    name: "parking-zone-a",
    type: "parking",
    model_url: "/models/parking-zone-a.glb",
    label: "Parking Zone",
    uses: "Pakring zone for students",
  },
  {
    name: "parking-zone-center",
    type: "parking",
    model_url: "/models/parking-zone-center.glb",
    label: "Parking Zone",
    uses: "Pakring zone for teachers",
  },
];
