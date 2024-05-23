import { io } from 'socket.io-client';
import { decryptData, encryptData } from './hooks/useCrypto';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const URL = process.env.REACT_APP_PROJECT_STATE === 'production' ? undefined : 'https://localhost:5000';

const refreshAccessToken = async (refreshToken) => {
  try {
    const storedData = localStorage.getItem('safeStorageData');
    const { accessToken } = decryptData(storedData);
    const decodedToken = jwtDecode(accessToken);

    const response = await axios.post(`/authToken`, {
      token: refreshToken,
      staff_username: decodedToken.staff_username
    });

    const newAccessToken = response.data.accessToken;
    const safeStorageData = decryptData(localStorage.getItem('safeStorageData'));
    safeStorageData.accessToken = newAccessToken;
    localStorage.setItem('safeStorageData', encryptData(safeStorageData));
    return newAccessToken;
  } catch (error) {
    console.error('Unable to refresh token', error);
    throw error;
  }
};

const initializeSocket = async () => {
  const storedData = localStorage.getItem('safeStorageData');
  let { accessToken, refreshToken, isLoggedIn } = storedData ? decryptData(storedData) : {};

  if (isLoggedIn) {
    const decodedToken = jwtDecode(accessToken);

    if (decodedToken.exp * 1000 < Date.now()) {
      accessToken = await refreshAccessToken(refreshToken);
    }
  }

  const socket = io(URL, {
    auth: { token: accessToken },
    reconnection: true,
    reconnectionDelay: 2000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 3,
    secure: true,
    autoConnect: true,
  });

  socket.on('connect_error', (err) => {
    console.error(`Connection error: ${err}`);
  });

  return socket;
};

export const socket = await initializeSocket();
