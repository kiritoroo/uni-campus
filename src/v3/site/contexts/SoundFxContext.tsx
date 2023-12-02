import { TSoundEffectData } from "src/v2/types/db.type";
import { createContext } from "react";
import useSound from "use-sound";
import { PlayFunction } from "use-sound/dist/types";
import { SOUND_ASSETS } from "../assets/sounds";

type TSoundsEffectData = {
  name: string;
  volume: number;
  file_url: string;
};

export const soundsEffectData: TSoundsEffectData[] = [
  {
    name: "mouseover",
    volume: 1,
    file_url: SOUND_ASSETS.mouseOver,
  },
  {
    name: "mouseclick",
    volume: 1,
    file_url: SOUND_ASSETS.mouseClick,
  },
];

type TSoundFxNames = "mouseover" | "mouseclick";

type TSoundFx = {
  [key in TSoundFxNames]: PlayFunction;
};

const createSoundFX = (data: TSoundEffectData[]): TSoundFx => {
  const soundFX = {} as TSoundFx;

  data.forEach((sound) => {
    soundFX[sound.name as TSoundFxNames] = useSound(sound.file_url, { volume: sound.volume })[0];
  });

  return soundFX;
};

export const SoundFxContext = createContext<TSoundFx | undefined>(undefined);

export const SoundFxProvider = ({ children }: { children: React.ReactNode }) => {
  const soundFx = createSoundFX(soundsEffectData);

  return <SoundFxContext.Provider value={soundFx}>{children}</SoundFxContext.Provider>;
};
