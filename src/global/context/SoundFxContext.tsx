import { sounds_effect_data } from "@Assets/db";
import { TSoundEffectData } from "@Types/db.type";
import { createContext } from "react";
import useSound from "use-sound";
import { PlayFunction } from "use-sound/dist/types";

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
  const soundFx = createSoundFX(sounds_effect_data);

  return <SoundFxContext.Provider value={soundFx}>{children}</SoundFxContext.Provider>;
};
