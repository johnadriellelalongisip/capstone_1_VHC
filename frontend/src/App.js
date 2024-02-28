import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useMemo, useState } from "react";

import Notfound from './components/Notfound';
import TopNav from './components/TopNavBar/TopNav';
import SideMenu from './components/TopNavBar/SideMenu';

import Users from './components/Users.js';
import Home from './components/MainContent/Components/Home';
import Dashboard from './components/MainContent/Components/Dashboard/Dashboard';
import Records from './components/MainContent/Components/Records/Records';
import Analytics from "./components/MainContent/Components/Analytics/Analytics";
import Pharmacy from './components/MainContent/Components/Pharmacy/Pharmacy.js';
import BloodUnit from './components/MainContent/Components/BloodUnit';
import Appointments from "./components/MainContent/Components/Appointments/Queue.js";

import Login from "./components/Login.js";
import Register from "./components/Register.js";

export const colorTheme = createContext();
export const messaging = createContext();

const AppContent = () => {
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
                <Route path="login" element={<Login />}/>
                <Route path="register" element={<Register />}/>
                <Route path='dashboard' element={<Dashboard />}/>
                <Route path='users' element={<Users />}/>
                <Route path='home' element={<Home />}/>
                <Route path='queue' element={<Appointments />}/>
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
  );
}

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(true);

//   // some functions to handle session from the backend server

//   if (!isLoggedIn) {
//     return (
//       <BrowserRouter basename="/">
//         <Routes>
//           <Route path="login" element={<Login />}/>
//           <Route path="register" element={<Register />}/>
//         </Routes>
//       </BrowserRouter>
//     )
//   } else if (isLoggedIn) {
//     <AppContent />
//   }
// }

export default AppContent;