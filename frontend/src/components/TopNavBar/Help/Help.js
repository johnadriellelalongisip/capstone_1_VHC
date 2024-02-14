import { useContext } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { colorTheme } from "../../../App";
import OptionButton from "../OptionButton";
import { BiSolidHelpCircle } from "react-icons/bi";
import { MdBugReport, MdFeedback } from "react-icons/md";

const Help = ({ help, toggle, toggleReportForm, toggleFeedback }) => {
  const [selectedTheme] = useContext(colorTheme);
  
  return (
    <dialog ref={help} className={`rounded-lg mr-0 fixed right-4 md:right-10 lg:right-14 top-20 bg-${selectedTheme}-100 drop-shadow-lg`}>
        <div className="flex flex-col m-2">
          <div className="flex items-center m-1 mb-2">
            <button className={`transition-colors duration-200 hover:bg-${selectedTheme}-100 rounded-3xl p-2`} onClick={() => toggle()}>
              <IoMdArrowRoundBack className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"/>
            </button>
            <p className="text-sm md:text-base lg:text-lg font-semibold">Help & Support</p>
          </div>
          <div className="w-60 md:w-70 lg:w-80 flex flex-col gap-2">
            <OptionButton Icon={MdBugReport} label={'Report a problem'} isExtending={false} buttonClick={() => toggleReportForm()} />
            <OptionButton Icon={MdFeedback} label={'Submit a feedback'} isExtending={false} buttonClick={() => toggleFeedback()} />
            <OptionButton Icon={BiSolidHelpCircle} label={'Help Centre'} isExtending={false} buttonClick={() => console.log('clicked')} />
          </div>
        </div>
    </dialog>
  );
}
 
export default Help;