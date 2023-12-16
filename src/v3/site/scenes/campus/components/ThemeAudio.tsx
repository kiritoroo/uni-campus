import { audioFadeIn, audioFadeOut } from "@Utils/common.utils";
import { SOUND_ASSETS } from "@v3/site/assets/sounds";
import { useGlobalStore } from "@v3/site/hooks/useGlobalStore";
import { useEffect, useRef } from "react";

const ThemeAudio = () => {
  const globalStore = useGlobalStore();

  const isInteractive = globalStore.use.isInteractive();
  const enableSound = globalStore.use.enableSound();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isInteractive && audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.play();
      audioFadeIn(audioRef.current, 0.5);
    }
  }, [isInteractive]);

  useEffect(() => {
    if (!isInteractive) return;
    if (!audioRef.current) return;

    if (enableSound) {
      audioRef.current.play();
    }

    if (!enableSound) {
      audioRef.current.pause();
    }
  }, [enableSound]);

  return (
    <audio ref={audioRef} autoPlay={false}>
      <source src={SOUND_ASSETS.themeSong} />
    </audio>
  );
};

export default ThemeAudio;
