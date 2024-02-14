import { useContext, useState } from "react";
import { colorTheme } from "../../../App";
import { Avatar } from "flowbite-react";
import { IoClose } from "react-icons/io5";
import useWindowSize from "../../../hooks/useWindowSize";

const Newchat = ({ newchat, closeNewChat }) => {
  const [selectedTheme] = useContext(colorTheme);
  const [searchQuery, setSearchQuery] = useState('');
  const {avatarSize} = useWindowSize();
  const messages = [
    {
        "Id": 2884,
        "Name": "Clayton Streich",
        "Message": "Vel voluptatem explicabo ea.",
        "Status": "unread",
        "Activity": "away"
    },
    {
        "Id": 1131,
        "Name": "Neal White",
        "Message": "Sit ab distinctio.",
        "Status": "read",
        "Activity": "busy"
    },
    {
        "Id": 3019,
        "Name": "Ted Keebler",
        "Message": "Adipisci excepturi a.",
        "Status": "unread",
        "Activity": "busy"
    },
    {
        "Id": 102,
        "Name": "Jennie McDermott",
        "Message": "Et fugit tempore ad unde consequuntur non.",
        "Status": "read",
        "Activity": "away"
    },
    {
        "Id": 3255,
        "Name": "Dr. Blake Crist",
        "Message": "Nulla explicabo atque doloribus hic.",
        "Status": "read",
        "Activity": "busy"
    }
  ];

  const searchResults = messages.filter(data => 
    data.Name.toLowerCase().includes(searchQuery.toLowerCase())  
  );

  return (
    <dialog ref={newchat} className={`rounded-tl-lg mr-0 fixed right-0 bottom-0 transition-colors duration-200 bg-${selectedTheme}-50 drop-shadow-lg`}>
      <div className="flex flex-col text-xs md:text-sm lg:text-base">
        <div className={`flex justify-between items-center m-2 text-${selectedTheme}-600`}>
          <div className="flex justify-between items-center">
            <p className={`font-semibold p-1 text-${selectedTheme}-700`}>Create new message</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-2">
            <button onClick={closeNewChat}>
              <IoClose className={`rounded-3xl transition-colors hover:bg-${selectedTheme}-200 duration-200 w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 p-1`} />
            </button>
          </div>
        </div>
        <div className={`w-64 md:w-72 lg:w-80`}>
          <div className={`flex items-center justify-start gap-2 p-3 border-b-[1px] border-${selectedTheme}-700`}>
            <label htmlFor="recipient" className={`text-${selectedTheme}-600`}>To:</label>
            <input 
              type="text"
              name="recipient"
              id="recipient"
              className="p-1 rounded-lg grow bg-transparent border-0"
              maxLength={50}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className={`h-64 max-h-64 md:h-72 md:max-h-72 lg:h-80 lg:max-h-80 overflow-y-auto overflow-x-hidden`}>
            {
              searchQuery ? searchResults.map((result, i) => (
                <button key={i} className={`w-full p-1 m-1 mx-2 rounded-lg transition-colors duration-200 hover:drop-shadow-sm hover:bg-${selectedTheme}-200`}>
                  <div className="flex justify-start items-center">
                    <Avatar img="default_profile.svg" rounded status="online" size={avatarSize} statusPosition="bottom-right" />
                    <div className="block ml-2 grow">
                      <p className={`text-start text-${selectedTheme}-600 font-semibold`}>{result.Name}</p>
                    </div>
                  </div>
                </button>
              )) : (
                <div className={`p-4 text-center text-${selectedTheme}-600 font-bold`}>
                  <p>Search and create a conversation. . .</p>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </dialog>
  );
}
 
export default Newchat;