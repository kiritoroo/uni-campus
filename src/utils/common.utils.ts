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

export const lightenDarkenColor = (col: any, amt: number) => {
  let usePound = false;

  if (typeof col === "string" && col[0] === "#") {
    col = col.slice(1);
    usePound = true;
  }

  let num = parseInt(col, 16);

  let r = (num >> 16) + amt;
  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amt;
  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amt;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
};
