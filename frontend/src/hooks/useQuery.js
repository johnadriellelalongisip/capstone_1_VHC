import { useContext, useState } from 'react';
import api from '../axios';
import { jwtDecode } from 'jwt-decode';
import useCrypto from './useCrypto';
import { notificationMessage } from '../App';
import useCurrentTime from './useCurrentTime';

const useQuery = () => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const { encryptData, decryptData } = useCrypto();
  const { mysqlTime } = useCurrentTime();
  // eslint-disable-next-line no-unused-vars
  const [notifMessage, setNotifMessage] = useContext(notificationMessage);

  const fetchData = async (route) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/${route}`, {dateTime: String(mysqlTime)});
      setResponse(response.data);
      setIsLoading(false);
    } catch (error) {
      if (error.response) {
        handleError(error);
        setIsLoading(false);
      }
      setIsLoading(false);
    }
  };

  const postData = async (route, payload) => {
    setIsLoading(true);
    try {
      const newPayload = {dateTime: String(mysqlTime), ...payload};
      const response = await api.post(`/${route}`, newPayload);
      setResponse(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const addData = async (route, payload) => {
    setIsLoading(true);
    try {
      const response = await api.post(`/${route}`, payload);
      setResponse(response.data);
      setNotifMessage(response.data.message);
      setIsLoading(false);
    } catch (error) {
      handleError(error);
      setIsLoading(false);
    }
  };

  const editData = async (route, payload, id) => {
    setIsLoading(true);
    try {
      const response = await api.post(`/${route}/${id}`, payload);
      setResponse(response.data);
      setNotifMessage(response.data.message);
      setIsLoading(false);
    } catch (error) {
      handleError(error);
      setIsLoading(false);
    }
  };

  const deleteData = async (route, id) => {
    setIsLoading(true);
    try {
      const response = await api.post(`/${route}/${id}`);
      setResponse(response.data);
      setNotifMessage(response.data.message);
      setIsLoading(false);
    } catch (error) {
      handleError(error);
      setIsLoading(false);
    }
  };

  const searchData = async (route, id) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/${route}/${id}`);
      setSearchResults(response.data.data[0]);
      setIsLoading(false);
    } catch (error) {
      handleError(error);
      setIsLoading(false);
    }
  };

  const searchItems = async (route, id) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/${route}/${id}`);
      setSearchResults(response.data);
      setIsLoading(false);
    } catch (error) {
      handleError(error);
      setIsLoading(false);
    }
  };

  const updateTokenDynamic = (obj, updates) => {
    for (let key in updates) {
      obj[key] = updates[key];
    }
  };  

  const userAuth = async (payload) => {
    setIsLoading(true);
    try {
      const response = await api.post(`/authStaff`, payload);
      console.log(response);
      const data = {};
      if (response.data.accessToken) {
        const accessTokenToAdd = { 
          accessToken: response.data.accessToken,
          isLoggedIn: true
        };
        updateTokenDynamic(data, accessTokenToAdd );
      }
      if (response.data.refreshToken) {
        const refreshTokenToAdd = { refreshToken: response.data.refreshToken };
        updateTokenDynamic(data, refreshTokenToAdd);
      }
      if (Object.keys(data).length > 0) {
        localStorage.setItem('safeStorageData', encryptData(data));
        window.location.reload();
      }
      setIsLoading(false);
      return data;
    } catch (error) {
      handleError(error);
      setIsLoading(false);
    }
  };
  
  const verifyToken = async () => {
    setIsLoading(true);
    const decryptedData = decryptData(localStorage.getItem('safeStorageData'));
    const { accessToken, refreshToken } = decryptedData;
    if (refreshToken !== null || accessToken !== null) {
      try {
        const decoded = jwtDecode(accessToken);
        const response = await api.post('/authToken', { token: refreshToken, staff_username: decoded.staff_username });
        if (response && response.data && response.data.accessToken) {
          updateTokenDynamic( decryptedData, { accessToken: response.data.accessToken });
          localStorage.setItem('safeStorageData', encryptData(decryptedData));
        }
        setIsLoading(false);
      } catch (error) {
        handleError(error);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };
  
  const logoutUser = async (payload) => {
    setIsLoading(true);
    try {
      const response = await api.post('/logoutUser', payload);
      if (response && response.data && response.data.status === 200) {
      setNotifMessage(response.data.message);
      setResponse(response.data);
        localStorage.setItem('safeStorageData', encryptData({ isLoggedIn : false }));
        sessionStorage.clear();
        setIsLoading(false);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      setIsLoading(false);
    } catch (error) {
      handleError(error);
      setIsLoading(false);
    }
  }

  const handleError = (error) => {
    if (!error.response) {
      setError('No internet connection');
      setNotifMessage('No internet connection');
    } else {
      setNotifMessage(error.response.data.message);
      setError(`Error: ${error.message}`);
    }
    setIsLoading(false);
    setTimeout(() => {
      setError(null);
    },5000);
  };

  return {
    isLoading,
    response,
    error,
    searchResults,
    setSearchResults,
    fetchData,
    postData,
    addData,
    editData,
    deleteData,
    searchData,
    searchItems,

    userAuth,
    verifyToken,
    logoutUser,
  };
};

export default useQuery;
