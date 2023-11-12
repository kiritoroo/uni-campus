import CryptoJS from "crypto-js";

export const encrypt = (key: string, iv: string, data: string): string => {
  const encrypted = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: CryptoJS.enc.Utf8.parse(iv),
  });
  return encrypted.toString();
};

export const decrypt = (key: string, iv: string, data: string): string => {
  const decrypted = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: CryptoJS.enc.Utf8.parse(iv),
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};
