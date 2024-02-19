/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Tooltip } from "flowbite-react";
import { BsBellFill } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
import { useContext, useState } from "react";
import useNavigationState from "../../hooks/useToggles";
import Messages from "./Messaging/Messages";
import Notifs from "./Notifications/Notifications";
import Profile from "./Profile";
import Settings from "./Settings/Settings";
import Help from "./Help/Help";
import Themes from "./Settings/Themes";
import { colorTheme } from "../../App";
import Chatbox from "./Messaging/Chatbox";
import useWindowSize from "../../hooks/useWindowSize";
import ReportForm from "./Help/ReportForm";
import FeedbackForm from "./Help/FeedbackForm";
import PopupNotification from "./Notifications/PopupNotification";
import Newchat from "./Messaging/Newchat";
import useCurrentTime from "../../hooks/useCurrentTime";

const TopNav = () => {
  const [selectedTheme] = useContext(colorTheme);
  const {avatarSize} = useWindowSize();
  const [jump1, setJump1] = useState(false);
  const [jump2, setJump2] = useState(false);
  const [fadeDown2, setFadeDown2] = useState(false);
  const [fadeDown3, setFadeDown3] = useState(false);
  const { TimeComponent } = useCurrentTime();
  const { 
    messages,
    chatbox,
    newChat,
    notification,
    popupNotif,
    profile,
    settings,
    theme,
    help,
    reportForm,
    feedback,
    toggleMessage,
    openChatbox,
    closeChatbox,
    openNewChat,
    closeNewChat,
    toggleNotif,
    togglePopupNotif,
    toggleProfile,
    toggleSettings,
    toggleTheme,
    toggleHelp,
    toggleReportForm,
    toggleFeedback,
  } = useNavigationState();

  return (
    <div className={`fixed top-0 left-0 right-0 flex justify-between items-center p-5 bg-${selectedTheme}-200 z-50`}>
      <div className={`flex justify-center items-center text-${selectedTheme}-500`}>
        <img src="MHO_logo.png" className=' w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 drop-shadow-md' alt="..."/>
        <span className="self-center whitespace-nowrap text-2xl font-bold">MHO<div className={`p-1 bg-${selectedTheme}-100 flex gap-2 items-center justify-start text-xs rounded-lg`}><TimeComponent /></div></span>
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
            className="relative"
          >
            <AiFillMessage 
              className={`w-6 h-6 text-${selectedTheme}-400 hover:text-${selectedTheme}-500 
              ${
                jump1 && 'animate-jump'
              }`}
              onAnimationEnd={() => setJump1(!jump1)}
            />
            <div className={`absolute bottom-0 right-0 rounded-3xl bg-${selectedTheme}-700 p-1`}></div>
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
            className="relative"
          >
            <BsBellFill
              className={`w-6 h-6 text-${selectedTheme}-400 hover:text-${selectedTheme}-500 
              ${
                jump2 && 'animate-jump'
              }`}
              onAnimationEnd={() => setJump2(!jump2)}
            />
            <div className={`absolute bottom-0 right-0 rounded-3xl bg-${selectedTheme}-700 p-1`}></div>
          </button>
        </Tooltip>
        <Tooltip content="Profile" animation="duration-500">
          <button onClick={() => toggleProfile()}>
            <Avatar img='default_profile.svg' rounded size={avatarSize} />
          </button>
        </Tooltip>
      </div>

      <Messages message={messages} toggle={() => toggleMessage()} openChatbox={() => openChatbox()} createNewChat={() => openNewChat()} />
      <Chatbox chatbox={chatbox} toggle={() => closeChatbox()} />
      <Newchat newchat={newChat} closeNewChat={() => closeNewChat()} />

      <Notifs notifs={notification} toggle={() => toggleNotif()} togglePopupNotif={() => togglePopupNotif()} />
      <PopupNotification popupNotifRef={popupNotif} toggle={() => togglePopupNotif()} />

      <Profile prof={profile} toggle={() => toggleProfile()} toggleOptions={() => toggleSettings()} toggleHelp={() => toggleHelp()} />
      <Settings settings={settings} toggle={ () => {toggleSettings(); toggleProfile();} } toggleTheme={ () => toggleTheme() }/>
      <Themes theme={theme} toggle={ () => toggleTheme() }/>

      <Help help={help} toggle={ () => toggleHelp() } toggleReportForm={() => toggleReportForm()} toggleFeedback={() => toggleFeedback()} />
      <ReportForm reportFormRef={reportForm} toggle={ () => toggleReportForm() }/>
      <FeedbackForm feedbackRef={feedback} toggle={ () => toggleFeedback() }/>
    </div>
  );
}

export default TopNav;