import { useState } from 'react';
import api from '../axios';
import { socket } from '../socket';
import { jwtDecode } from 'jwt-decode';

const useQuery = () => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  const fetchData = async (route) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/${route}`);
      setResponse(response.data);
      setIsLoading(false);
    } catch (error) {
      handleError(error);
      setIsLoading(false);
    }
  };

  const addData = async (route, payload) => {
    setIsLoading(true);
    try {
      const response = await api.post(`/${route}`, payload);
      setResponse(response.data);
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

  const userAuth = async (payload) => {
    setIsLoading(true);
    try {
      const response = await api.post(`/authStaff`, payload);
      console.log(response);
      if (response && response.data && response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        socket.auth.token = response.data.accessToken;
        localStorage.setItem('isLoggedIn', JSON.stringify({ isLoggedIn: true }));
      } 
      if (response && response.data && response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const verifyToken = async () => {
    setIsLoading(true);
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem("accessToken");
    const decoded = jwtDecode(accessToken);
    if (accessToken) {
      if (refreshToken !== null || accessToken !== null) {
        try {
          const response = await api.post('/authToken', { token: refreshToken, staff_username: decoded.staff_username });
          if (response && response.data && response.data.accessToken) {
            localStorage.setItem('accessToken', response.data.accessToken);
            socket.auth.token = response.data.accessToken;
          }
          setIsLoading(false);
        } catch (error) {
          handleError(error);
          setIsLoading(false);
        }
      } else {
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
        setResponse(response.data.message);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.setItem('isLoggedIn', JSON.stringify({ isLoggedIn: false }));
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
    } else {
      setError(`Error: ${error.message}`);
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    response,
    error,
    searchResults,
    setSearchResults,
    fetchData,
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
