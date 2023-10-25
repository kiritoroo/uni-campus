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
  model_url: string;
  label: string;
  uses: string;
};
