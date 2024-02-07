import { useContext } from "react";
import { colorTheme } from "../../../App";
import { AiFillMessage } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { TextInput } from "flowbite-react";

const ReportForm = ({ reportForm, toggle }) => {
  const [selectedTheme] = useContext(colorTheme);

  return (
    <dialog ref={reportForm} open className={`rounded-lg mr-0 fixed right-4 md:right-10 lg:right-14 top-20 bg-${selectedTheme}-100 drop-shadow-lg`}>
      <div className="flex flex-col m-2 text-xs md:text-sm lg:text-base">
        <div className={`flex justify-between items-center m-2 text-${selectedTheme}-600`}>
          <div className="flex justify-between items-center">
            <AiFillMessage className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 p-1"/>
            <p className="font-semibold p-1">Messages</p>
          </div>
          <button onClick={() => console.log('')}>
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
      </div>
    </dialog>
  );
}
 
export default ReportForm;