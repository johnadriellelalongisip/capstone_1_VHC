import { useState } from 'react';

const useQuery = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  const headers = (method, body, token) => {
    const baseHeaders = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (body) {
      baseHeaders.body = JSON.stringify(body);
    }
    if (token) {
      baseHeaders.headers.authorization = `Bearer ${token}`;
    }
    return baseHeaders;
  };

  const fetchData = async ( route ) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}${route}`, headers('GET'));
      const data = await response.json();
      if (data.status === 500) {
        throw new Error(data.message);
      }
      setResponse(data);
      setIsLoading(false);
    } catch (error) {
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        setError('No internet connection');
      } else {
        setError(`Error: ${error.message}`);
      }
      setIsLoading(false);
    }
  };

  const addData = async ( route, payload ) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}${route}`, headers('POST', payload));
      if (!response) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResponse(data);
      setIsLoading(false); 
    } catch (error) {
      setError(`Something have gone wrong`, error);
      setIsLoading(false); 
    }
  };

  // NOTE TO SELF: set up for socketIO to check whether the searchResults.id still exists to set the searchResults to null again
  const editData = async ( route, payload, id ) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}${route}/${id}`, headers('POST', payload));
      if (!response) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResponse(data);
      setIsLoading(false);
    } catch (error) {
      setError(`Something have gone wrong`, error);
      setIsLoading(false);
    }
  }

  const deleteData = async ( route, id ) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}${route}`, headers('POST', id));
      if (!response) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResponse(data);
      setIsLoading(false);
    } catch (error) {
      setError(`Something have gone wrong`, error);
      setIsLoading(false);
    }
  }

  const searchData = async( route, id ) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}${route}/${id}`, headers('GET'));
      if (!response) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSearchResults(data.data[0]);
      setIsLoading(false);
    } catch (error) {
      setError(`Something have gone wrong`, error);
      setIsLoading(false);
    }
  }
  
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
  };
};

export default useQuery;