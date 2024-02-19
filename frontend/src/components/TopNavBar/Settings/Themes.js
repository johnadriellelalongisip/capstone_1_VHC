import { IoMdArrowRoundBack } from "react-icons/io";
import { colorTheme } from "../../../App";
import { useContext } from "react";

const Themes = ({ theme, toggle }) => {
  // eslint-disable-next-line
  const [selectedTheme, setSelectedTheme, colors] = useContext(colorTheme);

  return (
    <dialog ref={theme} className={`rounded-lg mr-0 fixed right-4 md:right-10 lg:right-14 top-20 bg-${selectedTheme}-100 drop-shadow-lg`}>
      <div className="flex flex-col m-2">
        <div className="flex items-center m-1 mb-2">
          <button className={`hover:bg-${selectedTheme}-50 rounded-3xl p-2`} onClick={() => toggle()}>
            <IoMdArrowRoundBack className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </button>
          <p className="text-base md:text-lg lg:text-xl font-semibold">Select a color</p>
        </div>
        <div className="w-40 md:w-50 lg:w-60 grid grid-cols-6 md:grid-cols-7 lg:grid-cols-8 gap-1 mx-3">
          {
            colors.map((color, i) => {
              const selectedColor = 'bg-' + color + '-500';
              return (
                <button
                  key={i}
                  className={`${selectedColor} rounded-3xl w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 transition-transform duration-150 hover:scale-110`}
                  onClick={() => {setSelectedTheme(color); toggle();}}
                >
                </button>
              )
            })
          }
        </div>
      </div>
    </dialog>
  );
}

export default Themes;