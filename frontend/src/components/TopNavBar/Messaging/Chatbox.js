import { useContext, useState } from "react";
import { colorTheme, messaging } from "../../../App";
import { Avatar } from "flowbite-react";
import { IoClose } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";

const Chatbox = ({ chatbox, toggle }) => {
  const [selectedTheme] = useContext(colorTheme);
  const [currentChats] = useContext(messaging);
  const [size, setSize] = useState(true);

  const toggleSize = () => {
    setSize(prev => !prev);
  }

  return (
    <dialog ref={chatbox} className={`rounded-tl-lg mr-0 fixed right-0 bottom-0 transition-colors duration-200 ${ size ? `bg-${selectedTheme}-50` : `bg-${selectedTheme}-500`} shadow-inner`}>
      <div className="flex flex-col m-2 text-xs md:text-sm lg:text-base">
        <div className={`flex justify-between items-center m-2 text-${selectedTheme}-600`}>
          <div className="flex justify-between items-center">
            <Avatar img="default_profile.svg" rounded status="online" size="md" statusPosition="bottom-right" />
            <p className={`font-semibold p-1 ${size ? `text-${selectedTheme}-700` : `text-${selectedTheme}-50`}`}>{currentChats && currentChats.Name}</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-2">
            <button onClick={() => toggleSize()}>
              {
                size ? <MdOutlineKeyboardArrowDown className={`w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 p-1 rounded-3xl transition-colors duration-200 hover:text-${selectedTheme}-${size ? `700` : `-50`} text-${selectedTheme}-${!size ? `50` : `700`} hover:bg-gray-${size ? '400' : '50'}`} /> :
                <MdOutlineKeyboardArrowUp className={`w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 p-1 rounded-3xl transition-colors duration-200 hover:text-${selectedTheme}-${size ? `700` : `-50`} text-${selectedTheme}-${!size ? `50` : `700`} hover:bg-gray-${size ? '400' : '50'}`} />
              }
            </button>
            <button onClick={toggle}>
              <IoClose className={`w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 p-1 ${size ? `hover:text-${selectedTheme}-700` : `hover:text-${selectedTheme}-50`} ${!size ? `text-${selectedTheme}-50` : `text-${selectedTheme}-700`} rounded-3xl transition-colors duration-200 hover:bg-gray-${size ? '400' : '50'}`}/>
            </button>
          </div>
        </div>
        <div className={`w-64 md:w-72 lg:w-80`}>
          {
            size && currentChats && (
              <>
                <div className={`h-52 max-h-52 md:h-60 md:max-h-60 lg:h-64 lg:max-h-64 overflow-y-auto`}>
                  sdfa
                </div>
                {currentChats.Name}
              </>
            )
          }
        </div>
      </div>
    </dialog>
  );
}
 
export default Chatbox;