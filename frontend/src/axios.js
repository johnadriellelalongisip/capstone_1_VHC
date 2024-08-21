import axios from 'axios';
import { decryptData, encryptData } from './hooks/useCrypto';
import { jwtDecode } from 'jwt-decode';

const baseUrl = process.env.REACT_APP_PROJECT_STATE;
const api = axios.create({
  baseURL: baseUrl === 'production' ? undefined : 'https://localhost:5000/api',
  withCredentials: true,
});

let cancelTokenSource = null;

const createCancelToken = () => {
  if (cancelTokenSource) {
    cancelTokenSource.cancel('Operation canceled due to new request.');
  }
  cancelTokenSource = axios.CancelToken.source();
};

const refreshAccessToken = async (refreshToken) => {
  try {
    const storedData = localStorage.getItem('safeStorageData');
    const { accessToken } = decryptData(storedData);
    const decodedToken = jwtDecode(accessToken);
    const deviceId = sessionStorage.getItem("myDeviceId");
    const response = await axios.post(`https://localhost:5000/api/authToken`, { token: refreshToken, staff_username: decodedToken.staff_username, deviceId: deviceId });
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
    if (error.response?.status === 401) {
      const originalRequest = error.config;
      try {
        const { data } = await axios.post('https://localhost:5000/api/authToken', {}, { withCredentials: true });
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
  createCancelToken();
  config.cancelToken = cancelTokenSource.token;
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
