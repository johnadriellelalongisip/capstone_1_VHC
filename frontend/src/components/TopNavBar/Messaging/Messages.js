import { Avatar, TextInput } from "flowbite-react";
import { AiFillMessage } from "react-icons/ai";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { RiEdit2Fill } from "react-icons/ri";
// import faker from 'faker';
import { useContext } from "react";
import { colorTheme, messaging } from "../../../App";

const Messages = ({ message, toggle, openChatbox }) => {
  const [selectedTheme] = useContext(colorTheme);
  // eslint-disable-next-line no-unused-vars
  const [currentChats, setCurrentChats] = useContext(messaging);

  // const generateRandomStatus = () => faker.random.arrayElement(['read', 'unread']);
  // const generateRandomActivity = () => faker.random.arrayElement(['online', 'offline', 'away', 'busy']);

  // const messages = Array.from({ length: 5 }, () => ({
  //   Id: faker.datatype.number({ min: 1, max: 5000 }),
  //   Name: faker.name.findName(),
  //   Message: faker.lorem.sentence(),
  //   Status: generateRandomStatus(),
  //   Activity: generateRandomActivity(),
  // }));
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

  const selectedChat = (id) => {
    const selectedMessage = messages.find(message => parseInt(message.Id) === id);
    if (selectedMessage) {
      const newChat = {
        Id: selectedMessage.Id,
        Name: selectedMessage.Name,
        Message: selectedMessage.Message,
        Status: selectedMessage.Status,
        Activity: selectedMessage.Activity
      };
      setCurrentChats(newChat);
      openChatbox();
      toggle();
    }
  };

  return (
    <dialog ref={message} className={`rounded-lg mr-0 fixed right-4 md:right-10 lg:right-14 top-20 bg-${selectedTheme}-100 drop-shadow-lg`}>
      <div className="flex flex-col m-2 text-xs md:text-sm lg:text-base">
        <div className={`flex justify-between items-center m-2 text-${selectedTheme}-600`}>
          <div className="flex justify-between items-center">
            <AiFillMessage className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 p-1"/>
            <p className="font-semibold p-1">Messages</p>
          </div>
          <button onClick={toggle}>
            <RiEdit2Fill className={`w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 p-1 hover:text-${selectedTheme}-700 rounded-3xl transition-colors duration-200 hover:bg-gray-100`}/>
          </button>
        </div>
        <TextInput
          type="text"
          icon={HiMiniMagnifyingGlass}
          placeholder="Search messages. . ."
          sizing='md'
          className="my-2 mx-4"
        />
        <div className="w-52 md:w-70 lg:w-80 flex flex-col gap-2 h-60 max-h-60 overflow-y-auto">
          {
            messages.map((message, i) => {
              const stat = message.Status === 'read';
              return (
                <button key={i} className={`rounded-lg transition-colors duration-200 hover:drop-shadow-md hover:bg-gray-100 focus:ring-${selectedTheme}-500 focus:bg-${selectedTheme}-50`} onClick={() => selectedChat(message.Id)} >
                  <div className="flex items-center gap-2 mx-2">
                    <Avatar img="default_profile.svg" rounded status={`${message.Activity}`} size="md" statusPosition="bottom-right" />
                    <div className="flex flex-col items-start">
                      <p className={`${stat ? 'font-bold' : 'font-semibold'}`}>{message.Name}</p>
                      <p className={`text-slate-500 ${stat && 'font-semibold'}`}>
                        {!stat && <span>You: </span>}
                        {message.Message.length > 20
                          ? `${message.Message.substring(0, 15)}...`
                          : message.Message}
                      </p>
                    </div>
                    { stat && <div className={`p-1 bg-${selectedTheme}-700 ml-auto rounded-3xl`}></div>}
                  </div>
                </button>
              )}
            )
          }
        </div>
      </div>
    </dialog>
  );
}
 
export default Messages;