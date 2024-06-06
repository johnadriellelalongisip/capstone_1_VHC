import { useContext } from "react";
import { BsBellFill } from "react-icons/bs";
import { colorTheme, notificationMessage } from "../../../App";
import { MdClose } from "react-icons/md";

const PopupNotification = ({ popupNotifRef, toggle }) => {
  const [selectedTheme] = useContext(colorTheme);
  const [notifMessage] = useContext(notificationMessage);

  return (
    <dialog ref={popupNotifRef} className={`rounded-lg ml-0 fixed left-5 bottom-5 bg-${selectedTheme}-100 drop-shadow-lg`}>
        <div className="flex flex-col m-2 text-xs md:text-sm lg:text-base">
          <div className={`flex justify-start items-center m-2 text-${selectedTheme}-600`}>
            <div className="flex gap-2 justify-between items-center">
              <BsBellFill className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 p-1"/>
              <p className="font-semibold p-1">{notifMessage && notifMessage}</p>
              <button className={`bg-${selectedTheme}-200 hover:bg-${selectedTheme}-300 rounded-3xl`} onClick={() => toggle()}>
                <MdClose className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 p-1"/>
              </button>
            </div>
          </div>
        </div>
    </dialog>
  );
}
 
export default PopupNotification;