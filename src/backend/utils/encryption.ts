import CryptoJS from 'crypto-js';

// You should store this in an environment variable in production
const SECRET_KEY = process.env.ENCRYPTION_KEY || 'your-secret-key';

export const encryptText = (text: string): string => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decryptText = (encryptedText: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}; 