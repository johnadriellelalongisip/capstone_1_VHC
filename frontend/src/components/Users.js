/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
// import Header from './MainContent/Header';
// import { useLocation } from 'react-router-dom';
// import { FaUsers } from "react-icons/fa";
import useQuery from '../hooks/useQuery';

const Users = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const { response, searchResults, setSearchResults, fetchData, addData, editData, deleteData, searchData, } = useQuery();
  // const [USERID, setUSERID] = useState(null);

  function cleanUp() {
    setFirstName('');
    setLastName('');
  }

  const submitAdd = (e) => {
    e.preventDefault();
    const payload = { firstname: firstname, lastname: lastname };
    addData('addUsers', payload);
    cleanUp();
  ;}
  const submitEdit = (e) => {
    e.preventDefault();
    const payload = { firstname: firstname, lastname: lastname };
    editData('editUser', payload, searchResults.id);
    setSearchResults(null);
    cleanUp();
  };

  const deleteUser = (id) => {
    deleteData('deleteUser', id);
  };
  const searchUser = (id) => {
    searchData(`searchUser`, id);
  };
  
  useEffect(() => {
    if (searchResults !== null) {
      setFirstName(searchResults.first_name);
      setLastName(searchResults.last_name);
    }
  }, [searchResults]);
  useEffect(() => {
    fetchData('getUsers');
  },[]);

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-col p-2 mt-20 md:mt-28 lg:mt-32 mb-4 mx-2 md:mx-3 lg:mx-4">
        {/* <div>
          <Header title={ title } icon={<FaUsers />}/>
        </div> */}
        <div className="min-h-screen h-screen overflow-y-auto scroll-smooth p-2 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-60 md:mb-72 lg:mb-80">
            <div className="w-34 h-36 bg-sky-50 rounded-xl">
              <div className="container mx-auto p-4 text-center">
                <h1 className="text-3xl font-bold mb-4">REACTJS & NODE EXPRESSJS 'CRUD'</h1>
                <form onSubmit={searchResults ? submitEdit : submitAdd } className='flex flex-row gap-5 justify-center m-5 p-5 border-solid border-4 border-black'>
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
                  <Button type="submit">{searchResults ? 'Update' : 'Submit'}</Button>
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
                      response && 
                      response.data.map((data,i) => (
                        <tr key={i}>
                          <td style={{border:'solid 2px black'}}>{data.id}</td>
                          <td style={{border:'solid 2px black'}}>{data.first_name}</td>
                          <td style={{border:'solid 2px black'}}>{data.last_name}</td>
                          <td style={{border:'solid 2px black'}}>
                            <button onClick={() => deleteUser(data.id)}>Delete</button>
                            <button onClick={() => searchUser(data.id)}>Edit</button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
