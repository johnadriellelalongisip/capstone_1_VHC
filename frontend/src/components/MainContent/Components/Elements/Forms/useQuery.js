import { useState } from 'react';

const useQuery = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const fetchData = async (route) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}${route}`, headers('GET'));
      const data = await response.json();
      console.log(data)
      setResponse(data.data);
      setIsLoading(false);
    } catch (error) {
      setResponse(`Something have gone wrong: ${error.message}`);
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    response,
    fetchData,
  };
};

export default useQuery;