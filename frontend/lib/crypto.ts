import CryptoJS from "crypto-js";

const SECRET = "user-derived-key"; // in real use, derive from user password

export function encryptData(data: any) {
  return CryptoJS.AES.encrypt(typeof data === 'string' ? data : JSON.stringify(data), SECRET).toString();
}

export function decryptData(cipher: string) {
  const bytes = CryptoJS.AES.decrypt(cipher, SECRET);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  try {
    return JSON.parse(decrypted);
  } catch {
    return decrypted; // if it's a string, return as is
  }
}
