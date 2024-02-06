import { useContext } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { TbAlertSquareFilled } from "react-icons/tb";
import { colorTheme } from "../../../App";

const Help = ({ help, toggle }) => {
  const [selectedTheme] = useContext(colorTheme);
  
  return (
    <dialog ref={help} className={`rounded-lg mr-0 fixed right-4 md:right-10 lg:right-14 top-20 bg-${selectedTheme}-100 drop-shadow-lg`}>
        <div className="flex flex-col m-2">
          <div className="flex items-center m-1 mb-2">
            <button className={`transition-colors duration-200 hover:bg-gray-100 rounded-3xl p-2`} onClick={() => toggle()}>
              <IoMdArrowRoundBack className="w-6 h-6"/>
            </button>
            <p className="text-xl font-semibold">Help & Support</p>
          </div>
          <div className="w-60 md:w-70 lg:w-80 flex flex-col gap-2">
            <button className={`rounded-lg transition-colors duration-200 hover:bg-gray-100 focus:ring-${selectedTheme}-500 focus:bg-${selectedTheme}-50`}>
              <div className="flex items-center justify-between mx-2 p-2">
                <div className="flex items-center gap-2">
                  <div className={`w-9 h-9 bg-${selectedTheme}-700 text-${selectedTheme}-50 rounded-3xl flex items-center justify-center p-1`}>
                    <TbAlertSquareFilled className="w-6 h-6"/>
                  </div>
                  <p className={`text-base font-semibold text-${selectedTheme}-900`}>Report a problem</p>
                </div>
              </div>
            </button>
          </div>
        </div>
    </dialog>
  );
}
 
export default Help;