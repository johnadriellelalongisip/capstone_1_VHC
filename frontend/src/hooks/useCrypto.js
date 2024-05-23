import CryptoJS from 'crypto-js';

const secretKey = process.env.REACT_APP_SECRET;

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

const decryptData = (data) => {
  if (data) {
    const bytes = CryptoJS.AES.decrypt(data, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } else {
    return null;
  }
};

const useCrypto = () => {
  return {
    encryptData,
    decryptData
  };
};

export { encryptData, decryptData };
export default useCrypto;
