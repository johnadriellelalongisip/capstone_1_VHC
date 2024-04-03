import { useState } from 'react';
import axios from 'axios';

const useQuery = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  const headers = (token) => {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    };
  };

  const fetchData = async (route, token) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}${route}`, headers(token));
      setResponse(response.data);
      setIsLoading(false);
    } catch (error) {
      handleError(error);
    }
  };

  const addData = async (route, payload, token) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}${route}`, payload, headers(token));
      setResponse(response.data);
      setIsLoading(false);
    } catch (error) {
      handleError(error);
    }
  };

  const editData = async (route, payload, id, token) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}${route}/${id}`, payload, headers(token));
      setResponse(response.data);
      setIsLoading(false);
    } catch (error) {
      handleError(error);
    }
  };

  const deleteData = async (route, id, token) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}${route}`, id, headers(token));
      setResponse(response.data);
      setIsLoading(false);
    } catch (error) {
      handleError(error);
    }
  };

  const searchData = async (route, id, token) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}${route}/${id}`, headers(token));
      setSearchResults(response.data.data[0]);
      setIsLoading(false);
    } catch (error) {
      handleError(error);
    }
  };

  const searchItems = async (route, id, token) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}${route}/${id}`, headers(token));
      setSearchResults(response.data);
      setIsLoading(false);
    } catch (error) {
      handleError(error);
    }
  };

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
  };
};

export default useQuery;
