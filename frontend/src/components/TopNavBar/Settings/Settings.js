import { useContext } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdDarkMode, MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { colorTheme } from "../../../App";
import OptionButton from "../OptionButton";
import useFullscreen from "../../../hooks/useToggleFullscreen";

const Settings = ({ settings, toggle, toggleTheme }) => {
  const [selectedTheme] = useContext(colorTheme);
  const { isFullscreen, toggleFullScreen } = useFullscreen();
  
  return (
    <dialog ref={settings} className={`rounded-lg mr-0 fixed right-4 md:right-10 lg:right-14 top-20 bg-${selectedTheme}-100 drop-shadow-lg`}>
        <div className="flex flex-col m-2">
          <div className="flex items-center m-1 mb-2">
            <button className={`transition-colors duration-200 hover:bg-${selectedTheme}-100 rounded-3xl p-2`} onClick={() => toggle()}>
              <IoMdArrowRoundBack className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"/>
            </button>
            <p className="text-sm md:text-base lg:text-lg font-semibold">Settings</p>
          </div>
          <div className="w-60 md:w-70 lg:w-80 flex flex-col gap-2">
            <OptionButton Icon={MdDarkMode} label={'Themes'} isExtending={true} buttonClick={() => toggleTheme()} />
            <OptionButton Icon={ isFullscreen ? MdFullscreenExit : MdFullscreen } label={ isFullscreen ? 'Exit Full-Screen' : 'Full-Screen' } isExtending={false} buttonClick={toggleFullScreen} />
          </div>
        </div>
    </dialog>
  );
}
 
export default Settings;