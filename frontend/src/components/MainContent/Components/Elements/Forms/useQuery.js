import { useState } from 'react';

const useQuery = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toEdit, setToEdit] = useState(null);

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
      setResponse(data);
      setIsLoading(false);
    } catch (error) {
      setResponse(`Something have gone wrong: ${error.message}`);
      setIsLoading(false);
    }
  };

  const addData = async ( route, payload ) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}${route}`, headers('POST', payload));
      const data = await response.json();
      setResponse(data);
      setIsLoading(false); 
    } catch (error) {
      setError(error);
      setIsLoading(false); 
    }
  };

  const editData = async ( route, payload ) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}${route}`, headers('POST', payload));
      const data = await response.json();
      setResponse(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }

  const deleteData = async ( route, id ) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}${route}`, headers('POST', id));
      const data = await response.json();
      setResponse(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }

  const searchData = ( route, id ) => {
    setIsLoading(true);
    try {
      const search = async() => {
        const response = await fetch(`${BASE_URL}${route}/${id}`, headers('GET'));
        const data = await response.json();
        setToEdit(data.data[0]);
      }
      search();
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }
  
  return {
    isLoading,
    response,
    error,
    toEdit,
    setToEdit,
    fetchData,
    addData,
    editData,
    deleteData,
    searchData,
  };
};

export default useQuery;