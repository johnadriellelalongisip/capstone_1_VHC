/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import Header from './MainContent/Header';
import { useLocation } from 'react-router-dom';
import { FaUsers } from "react-icons/fa";

const Users = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [response, setResponse] = useState('');
  const [res, setRes] = useState('');
  const [users, setUsers] = useState([]);
  const [toEdit, setToEdit] = useState(null);

  const BASE_URL = process.env.REACT_APP_BASE_URL;
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
  
  const fetchUsers = async() => {
    try {
      const response = await fetch(`${BASE_URL}getUsers`, headers('GET'));
      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      setRes(`Something have gone wrong: ${error.message}`);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}users`, headers('POST', {firstname,lastname}));
      const data = await response.json();
      setUsers(data.data);
      setRes('Successfully Added!');
      setFirstName('');
      setLastName('');
    } catch (error) {
      setRes('Error sending POST request:', error.message);
      setFirstName('');
      setLastName('');
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const userId = toEdit.id;
      const response = await fetch(`${BASE_URL}editUser`, headers('POST', {firstname,lastname,userId}));
      const data = await response.json();
      setUsers(data.data);
      setFirstName('');
      setLastName('');
      setToEdit(null);
      setRes('User Updated!');
    } catch (error) {
      setRes('Error sending POST request:', error.message);
      setFirstName('');
      setLastName('');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}deleteUser`, headers('POST', {id}));
      const data = await response.json();
      setUsers(data.data);
      setRes('User Deleted!');
    } catch (error) {
      setRes('Error sending POST request:', error.message);
    }
  }

  const editUser = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}searchUser/${id}`, headers('GET'));
      const data = await response.json();
      if (data.data[0] !== undefined) {
        const firstUserData = data.data[0];
        const { first_name, last_name } = firstUserData;
        setFirstName(first_name);
        setLastName(last_name);
        setToEdit(firstUserData);
      } else {
        setRes('No user data found.');
      }
    } catch (error) {
      setRes('Error sending GET request:', error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  },[]);

  useEffect(() => {
    const cleanup = () => {
      setResponse('');
      setRes('');
    };
    const timeout = setTimeout(() => {
      cleanup();
    },3000);
    setResponse(res);
    return () => clearTimeout(timeout);
  },[res]);

  const location = useLocation();
  const pathname = location.pathname.slice(1);
  const title = pathname.charAt(0).toUpperCase() + pathname.slice(1);

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-col p-2 mt-20 md:mt-28 lg:mt-32 mb-4 mx-2 md:mx-3 lg:mx-4">
        <div>
          <Header title={ title } icon={<FaUsers />}/>
        </div>
        <div className="min-h-screen h-screen overflow-y-auto scroll-smooth p-2 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-60 md:mb-72 lg:mb-80">
            <div className="w-34 h-36 bg-sky-50 rounded-xl">
              <div className="container mx-auto p-4 text-center">
                <h1 className="text-3xl font-bold mb-4">REACTJS & NODE EXPRESSJS 'CRUD'</h1>
                <form onSubmit={toEdit !== null ? handleEditUser : handleAddUser} className='flex flex-row gap-5 justify-center m-5 p-5 border-solid border-4 border-black'>
                  <label>
                    First Name:
                    <input 
                      type="text" 
                      value={firstname} 
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>
                  <label>
                    Last Name:
                    <input 
                      type="text" 
                      value={lastname}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                  <Button type="submit">{toEdit !== null ? 'Update' : 'Submit'}</Button>
                </form>
                <table className="text-center table-auto w-full border-solid border-2 border-black divide-y divide-x">
                    <tr className='divide-y divide-x'>
                      <th className="px-4 py-2">Id</th>
                      <th className="px-4 py-2">First Name</th>
                      <th className="px-4 py-2">Last Name</th>
                      <th className="px-4 py-2">Action</th>
                    </tr>
                  <tbody className='divide-y divide-x'>
                    {
                      users && 
                      users.map((user,i) => (
                        <tr key={i} className='divide-y divide-x'>
                          <td>{user.id}</td>
                          <td>{user.first_name}</td>
                          <td>{user.last_name}</td>
                          <td className='flex flex-row justify-center items-center gap-2'>
                            <Button onClick={() => handleDelete(user.id)}>Delete</Button>
                            <Button onClick={() => editUser(user.id)}>Edit</Button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
                {
                  response && (
                    <p className="mt-4 text-gray-200 p-2 rounded-md border-0 bg-green-600">Server Response: {response}</p>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
