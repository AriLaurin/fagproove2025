import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.ENCRYPTION_KEY;

export const encryptText = (text: string): string => {
  if (!SECRET_KEY) {
    throw new Error('Encryption key is not set');
  }
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decryptText = (encryptedText: string): string => {
  if (!SECRET_KEY) {
    throw new Error('Encryption key is not set');
  }
  const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}; 