import { useContext } from "react";
import { SoundFxContext } from "../context/SoundFxContext";

export const useSoundFx = () => {
  const soundFX = useContext(SoundFxContext);
  if (!soundFX) {
    throw new Error("Missing SoundFxProvider");
  }
  return soundFX;
};
