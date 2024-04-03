import { useContext } from "react";
import { MdClose, MdPeople } from "react-icons/md";
import { colorTheme } from "../../../../App";

const Attended = ({ ATref, ATonClick }) => {
  const [selectedTheme] = useContext(colorTheme);

  return (
    <dialog ref={ATref} className={`rounded-lg bg-gray-100 drop-shadow-lg w-80 md:w-[500px] lg:w-[600px]`}>
      <div className="flex flex-col text-xs md:text-sm lg:text-base">
        <div className={`flex justify-between items-center p-2 text-${selectedTheme}-600 border-b-[1px] border-solid border-${selectedTheme}-500 shadow-md shadow-${selectedTheme}-600 mb-2`}>
          <div className="flex items-center p-1 gap-1">
            <MdPeople className='w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8' />
            <strong className="font-semibold drop-shadow-md text-sm md:text-base lg:text-lg">Add to query<span className={`ml-2 text-${selectedTheme}-500 font-bold`}>Patient's Number: 55</span></strong>
          </div>
          <button onClick={ATonClick} className={`transition-colors duration-200 rounded-3xl p-1 bg-${selectedTheme}-300 hover:bg-${selectedTheme}-400 active:bg-${selectedTheme}-200`}>
            <MdClose className='w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />
          </button>
        </div>
      </div>
    </dialog>
  );
}
 
export default Attended;