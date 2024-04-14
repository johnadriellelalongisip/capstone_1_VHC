import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import { createContext, useEffect, useMemo, useRef, useState } from "react";

import Notfound from './components/Notfound';
import TopNav from './components/TopNavBar/TopNav';
import SideMenu from './components/TopNavBar/SideMenu';

import Users from './components/Users.js';
import Home from './components/MainContent/Components/Home/Home.js';
import Dashboard from './components/MainContent/Components/Dashboard/Dashboard';
import Records from './components/MainContent/Components/Records/Records';
import Analytics from "./components/MainContent/Components/Analytics/Analytics";
import Pharmacy from './components/MainContent/Components/Pharmacy/Pharmacy.js';
import BloodUnit from './components/MainContent/Components/BloodUnit';
import Queue from "./components/MainContent/Components/Queue/Queue.js";

import Login from "./components/Login.js";
import Register from "./components/Register.js";

import { socket } from "./socket.js";
import Appointments from "./components/MainContent/Components/Appointments/Appointments.js";
import Accounts from "./components/MainContent/Components/Accounts/Accounts.js";

export const colorTheme = createContext();
export const messaging = createContext();
export const isLoggedInContext = createContext();

const AppContent = () => {
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
  },[]);

  if (localStorage.getItem('theme') === null) {
    localStorage.setItem('theme','blue');
  }
  const [selectedTheme, setSelectedTheme] = useState(localStorage.getItem('theme'));
  const [currentChat, setCurrentChats] = useState(null);
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
                <Route path='dashboard' element={<Dashboard />}/>
                <Route path='users' element={<Users />}/>
                <Route path='accounts' element={<Accounts />}/>
                <Route path='appointments' element={<Appointments />}/>
                <Route path='home' element={<Home />}/>
                <Route path='queue' element={<Queue />}/>
                <Route path='analytics' element={<Analytics />}/>
                <Route path='records' element={<Records />}/>
                <Route path='pharmacy' element={<Pharmacy />}/>
                <Route path='blood_unit' element={<BloodUnit />}/>
                <Route path='*' element={<Notfound />}/>
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </colorTheme.Provider>
    </div>
    </>
  );
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
  useEffect(() => {
    if (window.location.pathname !== '/login' && !localStorage.getItem('isLoggedIn')) {
      redirect('/login');
    }
    setIsLoggedIn(localStorage.getItem('isLoggedIn'));
  }, [isLoggedIn]);
  
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  if (!isLoggedIn) {
    return (
      <BrowserRouter basename="/">
        <Routes>
          <Route path="login" element={
            <isLoggedInContext.Provider value={[isLoggedIn, setIsLoggedIn]}><Login /></isLoggedInContext.Provider>
          }/>
          <Route path="register" element={<Register />}/>
          <Route exact path="*" element={
            <isLoggedInContext.Provider value={[isLoggedIn, setIsLoggedIn]}><Login /></isLoggedInContext.Provider>
          } />
        </Routes>
      </BrowserRouter>
    )
  } else {
    return (
      <isLoggedInContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
        <AppContent />
      </isLoggedInContext.Provider>
    )
  }
}

export default App;