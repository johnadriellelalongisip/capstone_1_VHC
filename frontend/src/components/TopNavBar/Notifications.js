import { Avatar } from "flowbite-react";
import { useContext } from "react";
import { BsBellFill } from "react-icons/bs";
import { colorTheme } from "../../App";

const Notifs = ({ notifs, toggle }) => {
  const [selectedTheme] = useContext(colorTheme);
  return (
    <dialog ref={notifs} className={`rounded-lg mr-0 fixed right-4 md:right-10 lg:right-14 top-20 bg-${selectedTheme}-100 drop-shadow-lg`}>
        <div className="flex flex-col m-2">
          <div className={`flex justify-start items-center m-2 text-${selectedTheme}-600`}>
            <div className="flex justify-between items-center">
              <BsBellFill className="w-8 h-8 p-1"/>
              <p className="font-semibold p-1">Notifications</p>
            </div>
          </div>
          <div className="w-60 md:w-70 lg:w-80 flex flex-col gap-2 h-60 max-h-60 overflow-y-auto">
            <button className={`rounded-lg hover:bg-gray-100 focus:ring-${selectedTheme}-500 focus:bg-${selectedTheme}-50`}>
              <div className="flex items-center gap-2 mx-2">
                <Avatar img="default_profile.svg" rounded size="md" />
                <div className="flex flex-col">
                  <p>hello</p>
                  <p>hello</p>
                </div>
              </div>
            </button>
          </div>
        </div>
    </dialog>
  );
}
 
export default Notifs;