export type TSoundEffectData = {
  name: string;
  volume: number;
  file_url: string;
};

export interface ISpaceData {
  id: string;
  label: string;
  iconPath: string;
}

export type TCambusBuildingData = {
  name: string;
  space: string;
  label?: string;
  uses: string;
  model_url: string;
  blocks?: {
    name: string;
    space: string;
    label: string;
    uses: string;
  }[];
};
