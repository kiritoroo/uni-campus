import { useContext } from "react";
import { SoundFxContext } from "../contexts/SoundFxContext";

export const useSoundFx = () => {
  const soundFX = useContext(SoundFxContext);
  if (!soundFX) {
    throw new Error("Missing SoundFxProvider");
  }
  return soundFX;
};
