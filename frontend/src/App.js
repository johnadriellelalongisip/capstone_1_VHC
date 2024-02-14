import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useMemo, useState } from "react";

import Notfound from './components/Notfound';
import TopNav from './components/TopNavBar/TopNav';
// import FootBar from './components/Footer/FootBar';
import SideMenu from './components/TopNavBar/SideMenu';

import Users from './components/Users.js';
import Home from './components/MainContent/Components/Home';
import Dashboard from './components/MainContent/Components/Dashboard/Dashboard';
import Records from './components/MainContent/Components/Records/Records';
import Analytics from "./components/MainContent/Components/Analytics/Analytics";
import Pharmacy from './components/MainContent/Components/Pharmacy';
import BloodUnit from './components/MainContent/Components/BloodUnit';
import Appointments from "./components/MainContent/Components/Appointments/Appointments.js";

export const colorTheme = createContext();
export const messaging = createContext();

const App = () => {
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
                <Route path='dashboard' element={<Dashboard />}/>
                <Route path='users' element={<Users />}/>
                <Route path='home' element={<Home />}/>
                <Route path='appointments' element={<Appointments />}/>
                <Route path='analytics' element={<Analytics />}/>
                <Route path='records' element={<Records />}/>
                <Route path='pharmacy' element={<Pharmacy />}/>
                <Route path='blood_unit' element={<BloodUnit />}/>
                <Route path='*' element={<Notfound />}/>
              </Routes>
            </div>
          </div>
          {/* <div className={`fixed bottom-0 right-0 left-0 h-auto bg-${selectedTheme}-200 p-4`}>
            <FootBar />
          </div> */}
        </BrowserRouter>
      </colorTheme.Provider>
    </div>
  );
}

export default App;