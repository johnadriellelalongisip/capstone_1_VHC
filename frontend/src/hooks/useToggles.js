import { useState, useRef } from 'react';

const useNavigationState = () => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  // eslint-disable-next-line
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isPopupNotifOpen, setIsPopupNotifOpen] = useState(false);
  const [isProfOpen, setIsProfOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isReportFormOpen, setIsReportFormOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const messages = useRef(null);
  const chatbox = useRef(null);
  const newChat = useRef(null);
  const notification = useRef(null);
  const popupNotif = useRef(null);
  const profile = useRef(null);
  const settings = useRef(null);
  const theme = useRef(null);
  const help = useRef(null);
  const reportForm = useRef(null);
  const feedback = useRef(null);

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
    if (!isChatboxOpen) {
      if (isNewChatOpen) {
        newChat.current.close();
        setIsNewChatOpen(false);
      }
      chatbox.current.show();
      setIsChatboxOpen(true);
    }
  };
  const closeChatbox = () => {
    chatbox.current.close();
    setIsChatboxOpen(false);
  };
  const openNewChat = () => {
    if (!isNewChatOpen) {
      if (isChatboxOpen) {
        chatbox.current.close();
        setIsChatboxOpen(false);
      }
      newChat.current.show();
      setIsNewChatOpen(true);
    }
  };
  const closeNewChat = () => {
    newChat.current.close();
    setIsNewChatOpen(false);
  };

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
  // NOTIF CHILDREN
  const togglePopupNotif = () => {
    setIsPopupNotifOpen(true);
    if (!isPopupNotifOpen) {
      popupNotif.current.show();
      cleanUp('notification');
    } else {
      popupNotif.current.close();
      setIsPopupNotifOpen(false);
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

  // MODAL
  const toggleReportForm = () => {
    setIsReportFormOpen(true);
    if (!isReportFormOpen) {
      reportForm.current.showModal();
      checkProfileIfOpen();
      help.current.close();
      setIsHelpOpen(false);
    } else {
      reportForm.current.close();
      setIsReportFormOpen(false);
    }
  };

  // MODAL
  const toggleFeedback = () => {
    setIsFeedbackOpen(true);
    if (!isFeedbackOpen) {
      feedback.current.showModal();
      checkProfileIfOpen();
      help.current.close();
      setIsHelpOpen(false);
    } else {
      feedback.current.close();
      setIsFeedbackOpen(false);
    }
  };
  
  return {
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
  };
};

export default useNavigationState;
