import axios from 'axios';
const api = axios.create({
  baseURL: process.env.REACT_APP_PROJECT_STATE === 'production' ? undefined : 'https://localhost:5000/api',
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  let accessToken = localStorage.getItem('accessToken');
  config.headers['Authorization'] = `Bearer ${accessToken}`;
  return config;
});

export default api;
