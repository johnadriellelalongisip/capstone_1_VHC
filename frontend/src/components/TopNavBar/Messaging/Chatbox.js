import { useContext, useEffect, useRef, useState } from "react";
import { colorTheme, messaging } from "../../../App";
import { Avatar, Tooltip } from "flowbite-react";
import { FiPaperclip } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { MdClose, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp, MdSend } from "react-icons/md";
import useWindowSize from "../../../hooks/useWindowSize";

const Chatbox = ({ chatbox, toggle }) => {
  const [selectedTheme] = useContext(colorTheme);
  const {avatarSize} = useWindowSize();
  const [currentChat] = useContext(messaging);
  const [size, setSize] = useState(true);
  const [chatText,setChatText] = useState('');
  const [files, setFiles] = useState({});
  const [fileIdCounter, setFileIdCounter] = useState(0);
  const chatsRef = useRef(null);
  const messages = [
    {
      "id": 1,
      "sender": "Alice",
      "receiver": "Bob",
      "timestamp": "2024-01-11T08:00:00",
      "content": "Hi Bob, how are you?",
      "isRead": true
    },
    {
      "id": 2,
      "sender": "Bob",
      "receiver": "Alice",
      "timestamp": "2024-01-11T08:05:00",
      "content": "Hi Alice, I'm doing well, thanks!",
      "isRead": true
    },
    {
      "id": 3,
      "sender": "Alice",
      "receiver": "Bob",
      "timestamp": "2024-01-11T08:10:00",
      "content": "That's great to hear!",
      "isRead": false
    },
    {
      "id": 3,
      "sender": "Alice",
      "receiver": "Bob",
      "timestamp": "2024-01-11T08:10:00",
      "content": "That's great to hear!",
      "isRead": false
    },
    {
      "id": 4,
      "sender": "Bob",
      "receiver": "Alice",
      "timestamp": "2024-01-11T08:15:00",
      "content": "How about you, Alice?",
      "isRead": false
    }
  ];
  

  const toggleSize = () => {
    setSize(prev => !prev);
  }

  const sendMessage = async () => {
    console.log('sent');
    setChatText('');
    setFiles({});
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Enter') {
        event.preventDefault();
        sendMessage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (chatsRef.current) {
      chatsRef.current.scrollTop = chatsRef.current.scrollHeight;
    }
  },[]);
  
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      const fileId = fileIdCounter + 1;
      setFileIdCounter(fileId);
      setFiles({
        ...files,
        [fileId]: uploadedFile
      });
    }
  };
  const handleRemoveFile = (fileId) => {
    const updatedFiles = { ...files };
    delete updatedFiles[fileId];
    setFiles(updatedFiles);
  };

  return (
    <dialog ref={chatbox} className={`rounded-tl-lg mr-0 fixed right-0 bottom-0 transition-colors duration-200 ${ size ? `bg-${selectedTheme}-50` : `bg-${selectedTheme}-500`} shadow-2xl`}>
      <div className="flex flex-col text-xs md:text-sm lg:text-base">
        <div className={`flex justify-between items-center p-2 text-${selectedTheme}-600 border-b-[1px] border-${selectedTheme}-600`}>
          <div className="flex justify-between items-center">
            <Avatar img="default_profile.svg" rounded status="online" size={avatarSize} statusPosition="bottom-right" />
            <p className={`font-semibold p-1 ${size ? `text-${selectedTheme}-700` : `text-${selectedTheme}-50`}`}>{currentChat && currentChat.Name}</p>
          </div>
          <div className={`flex flex-row justify-center items-center gap-2 ${size ? `text-${selectedTheme}-700` : `text-${selectedTheme}-50`}`}>
            <button onClick={() => toggleSize()}>
              {
                size ? 
                <MdOutlineKeyboardArrowDown className={`rounded-3xl transition-colors duration-200 w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 p-1`} /> :
                <MdOutlineKeyboardArrowUp className={`rounded-3xl transition-colors duration-200 w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 p-1`} />
              }
            </button>
            <button onClick={toggle}>
              <IoClose className={`rounded-3xl transition-colors duration-200 w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 p-1`} />
            </button>
          </div>
        </div>
        <div className={`w-64 md:w-72 lg:w-80`}>
          {
            size && currentChat && (
              <>
                <div ref={chatsRef} className={`flex flex-col h-52 max-h-52 md:h-60 md:max-h-60 lg:h-64 lg:max-h-64 overflow-y-auto`}>
                  {
                    messages.map((message, i) => {
                      if (message.sender === 'Bob') {
                        return (
                          <div key={i} className={`flex justify-start items-center m-[0.15rem] text-wrap drop-shadow`}>
                            <p className={`basis-1/2 p-2 rounded-2xl bg-gray-500 text-gray-100 drop-shadow-md`}>
                              {message.content}
                            </p>
                          </div>
                        );
                      } else if (message.sender === 'Alice') {
                        return (
                          <div key={i} className={`flex justify-end items-center m-[0.15rem] text-wrap drop-shadow`}>
                            <p className={`basis-1/2 p-2 rounded-2xl bg-${selectedTheme}-500 text-${selectedTheme}-100 drop-shadow-md`}>
                              {message.content}
                            </p>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })
                  }
                </div>
                {
                  files && Object.keys(files).length > 0 && (
                    <div className={`flex items-center justify-start gap-2 overflow-x-auto p-4 m-2 bg-${selectedTheme}-200 rounded-lg`}>
                    {
                      Object.keys(files).map((id) => (
                        <div key={id} className={`relative flex items-center justify-start gap-1 px-2 py-7 bg-${selectedTheme}-100 rounded-md`}>
                          <FiPaperclip className={`w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-${selectedTheme}-600`} />
                          <p className={`text-sm text-${selectedTheme}-600`}>{files[id].name.substring(0,5)}...</p>
                          <button onClick={() => handleRemoveFile(id)} className={`absolute -top-2 -right-2 hover:bg-${selectedTheme}-400 rounded-3xl bg-${selectedTheme}-300`}>
                            <MdClose className={`w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 p-1 text-${selectedTheme}-600`} />
                          </button>
                        </div>
                      ))
                    }
                    </div>
                  )
                }
                <div className={`flex justify-between items-center gap-1 p-1 mt-2 border-t-[1px] border-${selectedTheme}-600`}>
                  <Tooltip content="Attatch a file" animation="duration-500">
                    <label htmlFor="fileInput" className={`p-2 transition-colors duration-200 bg-${selectedTheme}-100 hover:bg-${selectedTheme}-200 rounded-3xl flex items-center justify-center`}>
                      <FiPaperclip className={`w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-${selectedTheme}-600 mr-1`} />
                      <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </Tooltip>
                  <input 
                    type="text" 
                    maxLength={255} 
                    className="grow block overflow-x-auto p-1 rounded-xl" 
                    placeholder="Aa" 
                    value={chatText}
                    onChange={(e) => setChatText(e.target.value)}
                  />
                  <Tooltip content="Send" animation="duration-500">
                    <button onClick={() => sendMessage()} className={`p-2 transition-colors duration-200 bg-${selectedTheme}-100 hover:bg-${selectedTheme}-200 rounded-3xl`}>
                      <MdSend className={`w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-${selectedTheme}-600`} />
                    </button>
                  </Tooltip>
                </div>
              </>
            )
          }
        </div>
      </div>
    </dialog>
  );
}
 
export default Chatbox;