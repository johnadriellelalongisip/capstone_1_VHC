import { Avatar } from "flowbite-react";
import { IoMdSettings } from "react-icons/io";
import { MdHelp, MdKeyboardArrowRight } from "react-icons/md";
import { ImExit } from "react-icons/im";
import { BiSolidCommentError } from "react-icons/bi";
import { useContext, useState } from "react";
import { colorTheme } from "../../App";

const Profile = ({ prof, toggle, toggleOptions, toggleHelp }) => {
  const [selectedTheme] = useContext(colorTheme);
  const [rotateSetting, setRotateSetting] = useState(false);
  
  return (
    <dialog ref={prof} className={`rounded-lg mr-0 fixed right-4 md:right-10 lg:right-14 top-20 bg-${selectedTheme}-100 drop-shadow-lg`}>
        <div className="flex flex-col m-2">
          <button onClick={() => toggle()} className={`flex justify-start items-center mb-2 text-${selectedTheme}-600 p-1 m-2 drop-shadow-lg rounded-lg bg-${selectedTheme}-100 transition-colors duration-200 hover:bg-gray-100`}>
            <div className="flex justify-between items-center m-2">
              <Avatar img="default_profile.svg" rounded status="online" size="md" statusPosition="bottom-right" />
              <p className="font-semibold p-1">User Name</p>
            </div>
          </button>
          <div className="w-60 md:w-70 lg:w-80 flex flex-col gap-2">
            <button onMouseEnter={() => setRotateSetting(true)} onMouseLeave={() => setRotateSetting(false)} className={`rounded-lg transition-colors duration-200 hover:bg-gray-100 focus:ring-${selectedTheme}-500 focus:bg-${selectedTheme}-50`} onClick={() => { toggleOptions(); toggle(); }}>
              <div className="flex items-center justify-between mx-2 p-2">
                <div className="flex items-center gap-2">
                  <div className={`w-9 h-9 bg-${selectedTheme}-700 text-${selectedTheme}-50 rounded-3xl flex items-center justify-center p-1`}>
                    <IoMdSettings className={`w-6 h-6 transition-transform duration-200 ${rotateSetting && 'rotate-180'}`}/>
                  </div>
                  <p className={`text-base font-semibold text-${selectedTheme}-900`}>Settings</p>
                </div>
                <MdKeyboardArrowRight className="w-8 h-8" />
              </div>
            </button>
            <button className={`rounded-lg transition-colors duration-200 hover:bg-gray-100 focus:ring-${selectedTheme}-500 focus:bg-${selectedTheme}-50`} onClick={() => { toggleHelp(); toggle(); }}>
              <div className="flex items-center justify-between mx-2 p-2">
                <div className="flex items-center gap-2">
                  <div className={`w-9 h-9 bg-${selectedTheme}-700 text-${selectedTheme}-50 rounded-3xl flex items-center justify-center p-1`}>
                    <MdHelp className="w-6 h-6"/>
                  </div>
                  <p className={`text-base font-semibold text-${selectedTheme}-900`}>Help & Support</p>
                </div>
                <MdKeyboardArrowRight className="w-8 h-8" />
              </div>
            </button>
            <button className={`rounded-lg transition-colors duration-200 hover:bg-gray-100 focus:ring-${selectedTheme}-500 focus:bg-${selectedTheme}-50`}>
              <div className="flex items-center justify-between mx-2 p-2">
                <div className="flex items-center gap-2">
                  <div className={`w-9 h-9 bg-${selectedTheme}-700 text-${selectedTheme}-50 rounded-3xl flex items-center justify-center p-1`}>
                    <BiSolidCommentError className="w-6 h-6"/>
                  </div>
                  <p className={`text-base font-semibold text-${selectedTheme}-900`}>Give Feedback</p>
                </div>
              </div>
            </button>
            <button className={`rounded-lg transition-colors duration-200 hover:bg-gray-100 focus:ring-${selectedTheme}-500 focus:bg-${selectedTheme}-50`}>
              <div className="flex items-center justify-between mx-2 p-2">
                <div className="flex items-center gap-2">
                  <div className={`w-9 h-9 bg-${selectedTheme}-700 text-${selectedTheme}-50 rounded-3xl flex items-center justify-center p-1`}>
                    <ImExit className="w-6 h-6"/>
                  </div>
                  <p className={`text-base font-semibold text-${selectedTheme}-900`}>Logout</p>
                </div>
              </div>
            </button>
          </div>
        </div>
    </dialog>
  );
}
 
export default Profile;