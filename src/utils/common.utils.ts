import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const audioFadeIn = (e: HTMLAudioElement, v: number) => {
  if (e.volume) {
    let InT = 0;
    const volumeTarget = v;
    const speed = 0.005;
    e.volume = InT;

    const eAudio = setInterval(function () {
      InT += speed;
      e.volume = Number.parseFloat(InT.toFixed(1));
      if (Number.parseFloat(InT.toFixed(1)) >= volumeTarget) {
        clearInterval(eAudio);
      }
    }, 50);
  }
};

export const audioFadeOut = (e: HTMLAudioElement) => {
  if (e.volume) {
    let InT = e.volume;
    const volumeTarget = 0;
    const speed = 0.005;
    e.volume = InT;

    const fAudio = setInterval(function () {
      InT -= speed;
      e.volume = Number.parseFloat(InT.toFixed(1));
      if (Number.parseFloat(InT.toFixed(1)) <= volumeTarget) {
        clearInterval(fAudio);
      }
    }, 50);
  }
};
