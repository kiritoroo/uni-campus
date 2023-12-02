type TSoundsEffectAsset = {
  name: string;
  volume: number;
  file_url: string;
};

export const soundsEffectAssets: TSoundsEffectAsset[] = [
  {
    name: "theme",
    volume: 1,
    file_url: "/v3/sounds/theme.mp3",
  },
  {
    name: "mouseover",
    volume: 1,
    file_url: "/v3/sounds/mouseover.mp3",
  },
  {
    name: "mouseclick",
    volume: 1,
    file_url: "/v3/sounds/mouseclick.wav",
  },
];
