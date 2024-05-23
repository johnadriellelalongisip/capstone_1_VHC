import axios from 'axios';
import { decryptData, encryptData } from './hooks/useCrypto';
import { jwtDecode } from 'jwt-decode';

const api = axios.create({
  baseURL: process.env.REACT_APP_PROJECT_STATE === 'production' ? undefined : 'https://localhost:5000/api',
  withCredentials: true,
});

// AXIOS JWT MIDDLEWARE

const refreshAccessToken = async (refreshToken) => {
  try {
    const storedData = localStorage.getItem('safeStorageData');
    const { accessToken } = decryptData(storedData);
    const decodedToken = jwtDecode(accessToken);
    
    const response = await axios.post(`/authToken`, { token: refreshToken, staff_username: decodedToken.staff_username });
    const newAccessToken = response.data.accessToken;
    const safeStorageData = decryptData(localStorage.getItem('safeStorageData'));
    safeStorageData.accessToken = newAccessToken;
    localStorage.setItem('safeStorageData', encryptData(safeStorageData));
    return newAccessToken;
  } catch (error) {
    return console.error('Unable to refresh token', error);
  }
};

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401) {
      const originalRequest = error.config;
      try {
        const { data } = await axios.post('http://localhost:5000/api/authToken', {}, { withCredentials: true });
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return axios(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use(async (config) => {
  const safeStorageData = localStorage.getItem('safeStorageData');
  if (safeStorageData) {
    const { accessToken, refreshToken, isLoggedIn } = decryptData(safeStorageData);
    if (isLoggedIn) {
      const decodedToken = jwtDecode(accessToken);
      if (decodedToken.exp * 1000 < Date.now()) {
        const newToken = await refreshAccessToken(refreshToken);
        config.headers['Authorization'] = `Bearer ${newToken}`;
      } else {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }
  }
  return config;
});

export default api;
