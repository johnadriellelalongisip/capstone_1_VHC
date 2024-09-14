import { useContext, useState } from 'react';
import api from '../axios';
import { jwtDecode } from 'jwt-decode';
import { notificationMessage } from '../App';
import useCurrentTime from './useCurrentTime';
import useIndexedDB from "./useIndexedDb";

const useQuery = () => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const { mysqlTime } = useCurrentTime();
  // eslint-disable-next-line no-unused-vars
  const [notifMessage, setNotifMessage] = useContext(notificationMessage);
  const { addItem, getAllItems, clearStore } = useIndexedDB();

  const fetchData = async (route) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/${route}`, {dateTime: String(mysqlTime)});
      setResponse(response?.data);
      setIsLoading(false);
    } catch (error) {
      if (error.response) {
        handleError(error);
        setIsLoading(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const postData = async (route, payload) => {
    setIsLoading(true);
    try {
      const newPayload = {dateTime: String(mysqlTime), ...payload};
      const response = await api.post(`/${route}`, newPayload);
      setResponse(response?.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addData = async (route, payload) => {
    setIsLoading(true);
    try {
      const response = await api.post(`/${route}`, payload);
      setResponse(response?.data);
      setNotifMessage(response.data.message);
      setIsLoading(false);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const editData = async (route, payload, id) => {
    setIsLoading(true);
    try {
      const response = await api.post(`/${route}/${id}`, payload);
      setResponse(response?.data);
      setNotifMessage(response.data.message);
      setIsLoading(false);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteData = async (route, id) => {
    setIsLoading(true);
    try {
      const response = await api.post(`/${route}/${id}`);
      setResponse(response?.data);
      setNotifMessage(response.data.message);
      setIsLoading(false);
    } catch (error) {
      handleError(error);
    } finally {
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
    } finally {
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
    } finally {
      setIsLoading(false);
    }
  };

  const userAuth = async (payload) => {
    setIsLoading(true);
    try {
      const response = await api.post(`/authStaff`, payload);
      if (response && response.status === 200 && response.data.accessToken) {
        const tokens = await getAllItems('tokens');
        if (tokens.length > 0) {
          await clearStore('tokens');
        }
        await addItem('tokens', response.data.accessToken, 'accessToken');
        window.location.href = "/home";
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };  
  
  const verifyToken = async () => {
    setIsLoading(true);
    const tokens = await getAllItems('tokens');
    const { accessToken } = tokens;
    if (tokens) {
      try {
        const response = await api.post('/authToken', { username: jwtDecode(accessToken).username }, {
          headers: { Authorization: `Bearer ${accessToken}`},
          withCredentials: true
        });
        if (response && response.data && response.data.accessToken) {
          addItem('tokens', accessToken, 'accessToken');
        }
        setIsLoading(false);
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const logoutUser = async (payload) => {
    setIsLoading(true);
    const { accessToken } = await getAllItems('tokens');
    try {
      const response = await api.post('/logoutUser', payload, {
        headers: { Authorization: `Bearer ${accessToken}`}
      });
      if (response && response.data && response.data.status === 200) {
        await clearStore('tokens');
        setNotifMessage(response.data.message);
        setResponse(response?.data);
          setIsLoading(false);
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
      }
    } catch (error) {
      handleError(error);
      setIsLoading(false);
    } finally {
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
      setNotifMessage(null);
    },3000);
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
