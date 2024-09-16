import { createContext, useEffect, useState } from "react";

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
import JsonWebToken from "./components/MainContent/Components/Playground/JsonWebToken.js";
import Problems from "./components/MainContent/Components/Playground/Problems.js";
import Equipments from "./components/MainContent/Components/Equipments/Equipments.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";

import { socket } from "./socket.js";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import useIndexedDB from "./hooks/useIndexedDb.js";
import api from "./axios.js";
import { Spinner } from "flowbite-react";

export const colorTheme = createContext();
export const messaging = createContext();
export const notificationMessage = createContext();
export const isLoggedInContext = createContext();

const App = () => {
  const [selectedTheme, setSelectedTheme] = useState(localStorage.getItem('theme'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentChat, setCurrentChats] = useState(null);
  const [notifMessage, setNotifMessage] = useState(null);
  const [tokens, setTokens] = useState(null);
  const { getAllItems, clearStore, updateItem } = useIndexedDB();
  const colors = [
    'gray', 'red', 'orange', 'lime', 'green', 'teal', 'cyan', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink'
  ];
  const navigate = useNavigate();
  const location = useLocation();

  async function getIdbTokens() {
    const idb = await getAllItems('tokens');
    setTokens(idb?.accessToken);
  }
  useEffect(() => {
    getIdbTokens();
    const time = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    if (!colors.includes(localStorage.getItem('theme'))) {
      localStorage.setItem('theme','blue');
    }
    socket.connect();
    return () => {
      socket.disconnect();
      clearTimeout(time);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const verifyAccessToken = async () => {
      try {
        const res = await api.get('/verifyToken', {
          headers: { Authorization: `Bearer ${tokens}` },
          withCredentials: true
        });  
        if (res?.status === 401) {
          setNotifMessage(res.data.message);
          await clearStore('tokens');
        } else if (res?.status === 200) {
          await updateItem('tokens', 'accessToken', res.data.accessToken);
          setIsLoggedIn(true);
          if (location.pathname !== '/home') {
            navigate('/home');
          }
        } else {
          setNotifMessage('Something went wrong checking your session');
          const time = setTimeout(async () => {
            setNotifMessage(null);
            await clearStore('tokens');
            if (location.pathname !== '/login') {
              navigate('/login');
            }
          }, 3000);
          return () => clearTimeout(time);
        }
      } catch (error) {
        if (error.response.data.status === 401) {
          await clearStore('tokens');
        }
        console.error('Verification error:', error);
        if (location.pathname !== '/login') {
          navigate('/login');
        }
        setNotifMessage('Something went wrong');
        const time = setTimeout(() => {
          setNotifMessage(null);
        }, 8000);
        return () => clearTimeout(time);
      }
    };
    if (tokens) {
      verifyAccessToken();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens]);
  
  if (isLoading) {
    return (
      <div className="font-bold text-center flex justify-center items-center bg-white h-screen w-screen">
        <Spinner className="size-32"/>
      </div>
    );
  }
  
  return (
    <>
    <div className="flex flex-col h-screen">
      <notificationMessage.Provider value={[notifMessage, setNotifMessage]}>
        <colorTheme.Provider value={[selectedTheme, setSelectedTheme, colors]}>
          <>
            {isLoggedIn ? (
              <>
              <messaging.Provider value={[ currentChat, setCurrentChats ]}>
                <TopNav />
              </messaging.Provider>
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
                    <Route path='accounts' element={<Accounts />}/>
                    <Route path='playground-jwt' element={<JsonWebToken />}/>
                    <Route path='problems' element={<Problems />}/>
                    <Route path='*' element={<Notfound />}/>
                  </Routes>
                </div>
              </div>
              </>
            ) : (
              <Routes>
                <Route path="*" element={<Login />}/>
                <Route path="register" element={<Register />} />
              </Routes>
            )}
          </>
        </colorTheme.Provider>
      </notificationMessage.Provider>
    </div>
    </>
  );
};

export default App;