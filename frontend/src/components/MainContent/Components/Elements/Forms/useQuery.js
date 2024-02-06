import { useState, useEffect } from 'react';

const useQuery = ({ method, payload, }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [data, setData] = useState([]);
  const [response, setResponse] = useState('');
  const [res, setRes] = useState('');

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

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}getUsers`, headers('GET'));
      const data = await response.json();
      setData(data.data);
    } catch (error) {
      setRes(`Something have gone wrong: ${error.message}`);
    }
  };

  const handleAddData = async (firstname, lastname) => {
    try {
      const response = await fetch(`${BASE_URL}users`, headers('POST', { firstname, lastname }));
      const data = await response.json();
      setData(data.data);
      setRes('Successfully Added!');
    } catch (error) {
      setRes('Error sending POST request:', error.message);
    }
  };

  const handleEditData = async (firstname, lastname, userId) => {
    try {
      const response = await fetch(`${BASE_URL}editUser`, headers('POST', { firstname, lastname, userId }));
      const data = await response.json();
      setData(data.data);
      setRes('User Updated!');
    } catch (error) {
      setRes('Error sending POST request:', error.message);
    }
  };

  const handleDeleteData = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}deleteUser`, headers('POST', { id }));
      const data = await response.json();
      setData(data.data);
      setRes('User Deleted!');
    } catch (error) {
      setRes('Error sending POST request:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRes('');
    }, 3000);
    return () => clearTimeout(timeout);
  }, [res]);

  useEffect(() => {
    setResponse(res);
  }, [res]);

  return {
    data,
    response,
    handleAddData,
    handleEditData,
    handleDeleteData,
  };
};

export default useQuery;