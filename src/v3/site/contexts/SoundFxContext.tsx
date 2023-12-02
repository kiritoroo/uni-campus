import { TSoundEffectData } from "src/v2/types/db.type";
import { createContext } from "react";
import useSound from "use-sound";
import { PlayFunction } from "use-sound/dist/types";
import { soundsEffectAssets } from "../assets/sounds";

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
  const soundFx = createSoundFX(soundsEffectAssets);

  return <SoundFxContext.Provider value={soundFx}>{children}</SoundFxContext.Provider>;
};
