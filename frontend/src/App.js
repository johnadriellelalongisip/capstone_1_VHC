import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useMemo, useRef, useState } from "react";

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
import SocketIo from "./components/MainContent/Components/Playground/SocketIo.js";

export const colorTheme = createContext();
export const messaging = createContext();
export const isLoggedInContext = createContext();

const App = () => {
  const [selectedTheme, setSelectedTheme] = useState(localStorage.getItem('theme'));
  const [currentChat, setCurrentChats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const loadingScreen = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    loadingScreen.current.showModal();
    const isLoadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    const loadScreenTimeout = setTimeout(() => {
      loadingScreen.current.close();
    }, 1800);
    return () => clearTimeout(loadScreenTimeout, isLoadingTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => {
      socket.connect();
    },500);
    return () => {
      socket.disconnect();
    };
  }, []);

  if (localStorage.getItem('theme') === null) {
    localStorage.setItem('theme','blue');
  }
  useMemo(() => {
    if (localStorage.getItem('theme') === null) {
      localStorage.setItem('theme','blue');
    } else {
      localStorage.setItem('theme',selectedTheme);
    }
  }, [selectedTheme]);
  const colors = [
    'gray', 'red', 'orange', 'lime', 'green', 'teal', 'cyan', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink'
  ];

  return (
    <>
    <dialog ref={loadingScreen} className={`rounded-md shadow-lg w-screen h-screen bg-${selectedTheme}-300 transition-all duration-500 animate-ease-linear ${isLoading ? `translate-y-0` : `translate-y-[100vh]`}`}>
      <div className="min-h-full flex justify-center items-center">
        <img src="MHO_logo.png" className='size-24 md:size-28 lg:size-32 animate-bounce drop-shadow-lg' alt="..."/>
      </div>
    </dialog>
    <div className="flex flex-col h-screen">
      <colorTheme.Provider value={[selectedTheme, setSelectedTheme, colors]}>
        <BrowserRouter basename='/'>
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
                <Route path='accounts' element={<Accounts />}/>
                <Route path='appointments' element={<Appointments />}/>
                <Route path='queue' element={<Queue />}/>
                <Route path='analytics' element={<Analytics />}/>
                <Route path='records' element={<Records />}/>
                <Route path='pharmacy' element={<Pharmacy />}/>
                <Route path='blood_unit' element={<BloodUnit />}/>
                <Route path='mapping' element={<Mapping />}/>
                
                <Route path='playground-jwt' element={<JsonWebToken />}/>
                <Route path='playground-socket' element={<SocketIo />}/>

                <Route path='*' element={<Notfound />}/>
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </colorTheme.Provider>
    </div>
    </>
  );
};

export default App;