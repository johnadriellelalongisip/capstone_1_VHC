import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useMemo, useState } from "react";

import Notfound from './components/Notfound';
import TopNav from './components/TopNavBar/TopNav';
import SideMenu from './components/TopNavBar/SideMenu';

import Home from './components/MainContent/Components/Home/Home.js';
import Dashboard from './components/MainContent/Components/Dashboard/Dashboard';
import Records from './components/MainContent/Components/Records/Records';
import Analytics from "./components/MainContent/Components/Analytics/Analytics";
import Pharmacy from './components/MainContent/Components/Pharmacy/Pharmacy.js';
import BloodUnit from './components/MainContent/Components/BloodUnit';
import Queue from "./components/MainContent/Components/Queue/Queue.js";
import Appointments from "./components/MainContent/Components/Appointments/Appointments.js";
import Accounts from "./components/MainContent/Components/Accounts/Accounts.js";
import Mapping from "./components/MainContent/Components/Mapping/Mapping.js";

import { socket } from "./socket.js";
import JsonWebToken from "./components/MainContent/Components/Playground/JsonWebToken.js";
import Problems from "./components/MainContent/Components/Playground/Problems.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import { decryptData } from "./hooks/useCrypto.js";
import { jwtDecode } from "jwt-decode";
import Equipments from "./components/MainContent/Components/Equipments/Equipments.js";
import axios from "axios";

export const colorTheme = createContext();
export const messaging = createContext();
export const notificationMessage = createContext();
export const isLoggedInContext = createContext();

// JWT & TOKENS NEEDS TO BE DONE IN THE BACKEND SERVER, THIS INCLUDES ROLES, USERNAMES, ETC. 
// ALL REQUESTS OF THE CLIENT ARE PARSED ON THE BACKEDN SERVER
// FOR NOW STAY MUNA AKO SA LOCALSTORAGE T-T

const App = () => {
  const [selectedTheme, setSelectedTheme] = useState(localStorage.getItem('theme'));
  const [currentChat, setCurrentChats] = useState(null);
  const [notifMessage, setNotifMessage] = useState(null);
  const safeStorageData = localStorage.getItem('safeStorageData');
  const [isLoggedIn, setIsLoggedIn] = useState(safeStorageData ? decryptData(safeStorageData) : false);
  const { accessToken, isLoggedIn : loggedIn } = safeStorageData ? decryptData(safeStorageData) : {};
  const role = accessToken ? jwtDecode(accessToken).role : "";

  const fetchIpAddress = async () => {
    try {
      const response = await axios.get('https://api.ipify.org/?format=json');
      sessionStorage.setItem("myIpAddress",response.data.ip);
    } catch (error) {
      throw error;
    }
  };
  
  
  useEffect(() => {
    if (sessionStorage.getItem("myIpAddress") === null || sessionStorage.getItem("myIpAddress") === undefined) {
      fetchIpAddress();
    }
    if (safeStorageData) {
      setIsLoggedIn(loggedIn || false);
    }
    socket.connect();
    return () => {
      socket.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (localStorage.getItem('theme') === null) {
    localStorage.setItem('theme','blue');
  }
  useMemo(() => {
    if (localStorage.getItem('theme') === null) {
      localStorage.setItem('theme','gray');
    } else {
      localStorage.setItem('theme',selectedTheme);
    }
  }, [selectedTheme]);
  const colors = [
    'gray', 'red', 'orange', 'lime', 'green', 'teal', 'cyan', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink'
  ];

  return (
    <>
    <div className="flex flex-col h-screen">
      <notificationMessage.Provider value={[notifMessage, setNotifMessage]}>
      <colorTheme.Provider value={[selectedTheme, setSelectedTheme, colors]}>
        <BrowserRouter basename='/'>
          {isLoggedIn && (
            <messaging.Provider value={[ currentChat, setCurrentChats ]}>
              <TopNav />
            </messaging.Provider>
          )}
          {!isLoggedIn ? (
            <Routes>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="*" element={<Login />} />
            </Routes>
          ) : (
            <div className="flex">
              <div className={`w-auto h-full bg-${selectedTheme}-300`}>
                <SideMenu />
              </div>
              <div className={`basis-11/12 h-auto bg-${selectedTheme}-100 overflow-y-hidden`}>
                <Routes>
                  <Route path='home' element={<Home />}/>
                  <Route path='dashboard' element={<Dashboard />}/>
                  <Route path='analytics' element={<Analytics />}/>
                  <Route path='mapping' element={<Mapping />}/>
                  <Route path='appointments' element={<Appointments />}/>
                  <Route path='queue' element={<Queue />}/>
                  <Route path='records' element={<Records />}/>
                  <Route path='pharmacy' element={<Pharmacy />}/>
                  <Route path='equipments' element={<Equipments />}/>
                  <Route path='blood_unit' element={<BloodUnit />}/>

                  {role && (role === 'developer' || role === 'admin') && (
                    <Route path='accounts' element={<Accounts />}/>
                  )}
                  
                  {role && role === 'developer' && (
                    <>
                      <Route path='problems' element={<Problems />}/>
                      <Route path='playground-jwt' element={<JsonWebToken />}/>
                    </>
                  )}

                  <Route path='*' element={<Notfound />}/>
                </Routes>
              </div>
            </div>
          )}
        </BrowserRouter>
      </colorTheme.Provider>
      </notificationMessage.Provider>
    </div>
    </>
  );
};

export default App;