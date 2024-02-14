import { useContext, useState } from "react";
import { colorTheme, messaging } from "../../../App";
import { Avatar, Tooltip } from "flowbite-react";
import { FiPaperclip } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp, MdSend } from "react-icons/md";
import useWindowSize from "../../../hooks/useWindowSize";

const Chatbox = ({ chatbox, toggle }) => {
  const [selectedTheme] = useContext(colorTheme);
  const {avatarSize} = useWindowSize();
  const [currentChat] = useContext(messaging);
  const [size, setSize] = useState(true);
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
                <div className={`flex flex-col h-52 max-h-52 md:h-60 md:max-h-60 lg:h-64 lg:max-h-64 overflow-y-auto`}>
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
                <div className={`flex justify-between items-center gap-1 p-1 border-t-[1px] border-${selectedTheme}-600`}>
                  <Tooltip content="Attatch a file" animation="duration-500">
                    <button className={`p-2 transition-colors duration-200 bg-${selectedTheme}-100 hover:bg-${selectedTheme}-200 rounded-3xl`}>
                      <FiPaperclip className={`w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-${selectedTheme}-600`} />
                    </button>
                  </Tooltip>
                  <input type="text" maxLength={255} className="grow block overflow-x-auto p-1 rounded-xl" placeholder="Aa" />
                  <Tooltip content="Send" animation="duration-500">
                    <button className={`p-2 transition-colors duration-200 bg-${selectedTheme}-100 hover:bg-${selectedTheme}-200 rounded-3xl`}>
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