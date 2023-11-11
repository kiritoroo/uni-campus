// import { JSEncrypt } from "jsencrypt";
import CryptoJS from "crypto-js";

export const encrypt = (key: string, data: string): string => {
  // const encrypt = new JSEncrypt();
  // encrypt.setPublicKey(pubkey);
  // return encrypt.encrypt(data);
  return CryptoJS.AES.encrypt(data, key).toString();
};

export const decrypt = (key: string, data: string): string => {
  // const decryptor = new JSEncrypt();
  // decryptor.setPrivateKey(privKey);
  // return decryptor.decrypt(encryptedData);
  const bytes = CryptoJS.AES.decrypt(data, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};
