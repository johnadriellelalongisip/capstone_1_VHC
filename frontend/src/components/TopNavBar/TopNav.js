/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Tooltip } from "flowbite-react";
import { FaPlusCircle } from "react-icons/fa";
import { BsBellFill } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
import { useContext, useState } from "react";
import useNavigationState from "./useToggles";
import Messages from "./Messaging/Messages";
import Notifs from "./Notifications";
import Profile from "./Profile";
import Settings from "./Settings/Settings";
import Help from "./Help/Help";
import Themes from "./Settings/Themes";
import { colorTheme } from "../../App";
import Chatbox from "./Messaging/Chatbox";

const TopNav = () => {
  const [selectedTheme] = useContext(colorTheme);
  const [jump1, setJump1] = useState(false);
  const [jump2, setJump2] = useState(false);
  const [fadeDown2, setFadeDown2] = useState(false);
  const [fadeDown3, setFadeDown3] = useState(false);
  const { 
    messages,
    notification,
    profile,
    settings,
    theme,
    help,
    chatbox,
    toggleMessage,
    toggleNotif,
    toggleProfile,
    toggleSettings,
    toggleTheme,
    toggleHelp,
    openChatbox,
    closeChatbox
  } = useNavigationState();

  return (
    <div className={`fixed top-0 left-0 right-0 flex justify-between items-center p-5 bg-${selectedTheme}-200 z-50`}>
      <div className={`flex justify-center items-center text-${selectedTheme}-500`}>
        <FaPlusCircle className=' w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16' />
        <span className="self-center whitespace-nowrap text-2xl font-bold">VHC</span>
      </div>
      <div className="flex justify-end items-center gap-2 md:gap-3 lg:gap-4">
        <Tooltip content="Messages" animation="duration-500">
          <button 
            to='/' 
            onClick={() => {
              setJump1(!jump1);
              setFadeDown3(!fadeDown3);
              setFadeDown2(false);
              toggleMessage();
            }}
          >
            <AiFillMessage 
              className={`w-6 h-6 text-${selectedTheme}-400 hover:text-${selectedTheme}-500 
              ${
                jump1 && 'animate-jump'
              }`}
              onAnimationEnd={() => setJump1(!jump1)}
            />
          </button>
        </Tooltip>
        <Tooltip content="Notifications" animation="duration-500">
          <button 
            to='/' 
            onClick={() => {
              setJump2(!jump2); 
              setFadeDown2(!fadeDown2);
              toggleNotif();
            }}
          >
            <BsBellFill
              className={`w-6 h-6 text-${selectedTheme}-400 hover:text-${selectedTheme}-500 
              ${
                jump2 && 'animate-jump'
              }`}
              onAnimationEnd={() => setJump2(!jump2)}
            />
          </button>
        </Tooltip>
        <Tooltip content="Profile" animation="duration-500">
          <button onClick={() => toggleProfile()}>
            <Avatar img='default_profile.svg' rounded size='md' />
          </button>
        </Tooltip>
      </div>
      <Messages message={messages} toggle={() => toggleMessage()} openChatbox={() => openChatbox()}/>
      <Chatbox chatbox={chatbox} toggle={() => closeChatbox()} />

      <Notifs notifs={notification} toggle={() => toggleNotif()} />
      <Profile prof={profile} toggle={() => toggleProfile()} toggleOptions={() => toggleSettings()} toggleHelp={() => toggleHelp()} />
      <Settings settings={settings} toggle={ () => {toggleSettings(); toggleProfile();} } toggleTheme={ () => toggleTheme() }/>
      <Themes theme={theme} toggle={ () => toggleTheme() }/>
      <Help help={help} toggle={ () => toggleHelp() }/>
    </div>
  );
}

export default TopNav;