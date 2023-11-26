import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import _ from "lodash";

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

export const opacityColor = (hex: string, opacity: number) => {
  if (typeof hex !== "string" || !/^#([A-Fa-f0-9]{3}$|[A-Fa-f0-9]{6}$|[A-Fa-f0-9]{8}$)/.test(hex))
    throw new Error("Invalid hexadecimal color value");
  if (typeof opacity !== "number" || opacity > 1 || opacity < 0)
    throw new Error("Opacity should be float between 0 - 1");

  let color = hex.substring(1);
  if (color.length === 8) color = color.substring(0, color.length - 2);
  if (color.length === 3) color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
  color += Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");

  return `#${color}`.toUpperCase();
};

export const hexToRgb = (hex: string) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
};

export const arrayBufferToString = (buffer: any, callback: any) => {
  var blob = new Blob([buffer], { type: "text/plain" });
  var reader = new FileReader();
  reader.onload = function (evt: any) {
    callback(evt.target.result);
  };
  reader.readAsText(blob, "utf-8");
};

export const objectToFormData = <
  T extends {
    [key: string]: any | Blob;
  },
>(
  obj: T,
) => {
  const formData = new FormData();
  Object.entries(obj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        const newKey = `${key}[${index}]`;
        const _v = _.isString(item) || item instanceof Blob ? item : JSON.stringify(item);
        formData.append(newKey, _v);
      });
    } else {
      const _v = _.isString(value) || value instanceof Blob ? value : JSON.stringify(value);
      formData.append(key, _v);
    }
  });

  return formData;
};
