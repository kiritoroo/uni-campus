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
    type: "academic",
    model_url: "/models/block-f1.glb",
    label: "Tòa nhà F1",
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
    label: "Tòa nhà E1",
    uses: "Academic training",
  },
  {
    name: "block-e2",
    type: "sport",
    model_url: "/models/block-e2.glb",
    label: "E2",
    uses: "Sport zone",
  },
  {
    name: "block-e3",
    type: "workshop",
    model_url: "/models/block-e3.glb",
    label: "E3",
    uses: "Workshop block",
  },
  {
    name: "block-e4",
    type: "workshop",
    model_url: "/models/block-e4.glb",
    label: "E4",
    uses: "Workshop block",
  },
  {
    name: "block-e7",
    type: "workshop",
    model_url: "/models/block-e7.glb",
    label: "E7",
    uses: "Workshop block",
  },
  {
    name: "block-e9",
    type: "workshop",
    model_url: "/models/block-e9.glb",
    label: "Tòa nhà bát giác",
    uses: "Academic training",
  },
  {
    name: "block-e10",
    type: "workshop",
    model_url: "/models/block-e10.glb",
    label: "IT Center",
    uses: "Academic training",
  },
  {
    name: "block-e13",
    type: "service",
    model_url: "/models/block-e13.glb",
    label: "E13",
    uses: "Cafeteria and dining area",
  },
  {
    name: "block-e14",
    type: "service",
    model_url: "/models/block-e14.glb",
    label: "E14",
    uses: "Cafeteria and dining area",
  },
  {
    name: "block-g",
    type: "academic",
    model_url: "/models/block-g.glb",
    label: "Trung tâm Việt Đức",
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
