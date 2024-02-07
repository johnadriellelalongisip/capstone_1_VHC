import { useState, useRef } from 'react';

const useNavigationState = () => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isProfOpen, setIsProfOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  // eslint-disable-next-line
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const messages = useRef(null);
  const notification = useRef(null);
  const profile = useRef(null);
  const settings = useRef(null);
  const theme = useRef(null);
  const help = useRef(null);
  const chatbox = useRef(null);

  const cleanUp = ({ navButton }) => {
    if (isMessageOpen && navButton !== 'message') {
      messages.current.close();
      setIsMessageOpen(false);
    } else if (isNotifOpen && navButton !== 'notification'){
      notification.current.close();
      setIsNotifOpen(false);
    } else if (isProfOpen && navButton !== 'profile') {
      profile.current.close();
      setIsProfOpen(false);
    } else if (isSettingsOpen && navButton !== 'settings') {
      settings.current.close();
      setIsSettingsOpen(false);
    } else if (isHelpOpen && navButton !== 'help') {
      help.current.close();
      setIsHelpOpen(false);
    } else if (isThemeOpen && navButton !== 'theme') {
      theme.current.close();
      setIsThemeOpen(false);
    }
  };

  const toggleMessage = () => {
    setIsMessageOpen(true);
    if (!isMessageOpen) {
      messages.current.show();
      cleanUp('message')
    } else {
      messages.current.close();
      setIsMessageOpen(false);
    }
  };
  const openChatbox = () => {
    chatbox.current.show();
    setIsChatboxOpen(true);
  };
  const closeChatbox = () => {
    chatbox.current.close();
    setIsChatboxOpen(false);
  }

  const toggleNotif = () => {
    setIsNotifOpen(true);
    if (!isNotifOpen) {
      notification.current.show();
      cleanUp('notification');
    } else {
      notification.current.close();
      setIsNotifOpen(false);
    }
  };

  const toggleProfile = () => {
    setIsProfOpen(true);
    if (!isProfOpen) {
      profile.current.show();
      cleanUp('profile');
    } else {
      profile.current.close();
      setIsProfOpen(false);
    }
  };

  const checkProfileIfOpen = () => {
    if(isProfOpen){
      messages.current.close();
      setIsMessageOpen(false);
    } else if (isNotifOpen){
      notification.current.close();
      setIsNotifOpen(false);
    } else if(isMessageOpen){
      messages.current.close();
      setIsMessageOpen(false);
    }
  }

  const toggleSettings = () => {
    setIsSettingsOpen(true);
    if (!isSettingsOpen) {
      settings.current.show();
      checkProfileIfOpen();
    } else {
      settings.current.close();
      setIsSettingsOpen(false);
    }
  };
  // settings children
  const toggleTheme = () => {
    setIsThemeOpen(true);
    if (!isThemeOpen) {
      theme.current.show();
      checkProfileIfOpen();
    } else {
      theme.current.close();
      setIsThemeOpen(false);
    }
    toggleSettings();
  };

  const toggleHelp = () => {
    setIsHelpOpen(true);
    toggleProfile();
    if (!isHelpOpen) {
      help.current.show();
      checkProfileIfOpen();
    } else {
      help.current.close();
      setIsHelpOpen(false);
    }
  };
  
  return {
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
    closeChatbox,
  };
};

export default useNavigationState;
