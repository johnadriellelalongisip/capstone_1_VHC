import { useContext } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { colorTheme } from '../../App';

const OptionButton = ({ Icon, label, isExtending, buttonClick }) => {
    const [selectedTheme] = useContext(colorTheme);
    return (
      <button
        className={`rounded-lg transition-colors duration-200 hover:bg-${selectedTheme}-100 focus:ring-${selectedTheme}-500 focus:bg-${selectedTheme}-50 hover:drop-shadow-lg`}
        onClick={() => buttonClick()}
      >
        <div className="flex items-center justify-between mx-2 p-2">
          <div className="flex items-center gap-2">
            <div className={`w-7 md:w-8 lg:w-9 h-7 md:h-8 lg:h-9 bg-${selectedTheme}-700 text-${selectedTheme}-50 rounded-3xl flex items-center justify-center p-1`}>
              <Icon className={`w-4 md:w-5 lg:w-6 h-4 md:h-5 lg:h-6`}/>
            </div>
            <p className={`text-xs md:text-sm lg:text-base font-semibold text-${selectedTheme}-900`}>{label}</p>
          </div>
          {isExtending && <MdKeyboardArrowRight className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />}
        </div>
      </button>
    );
  }

export default OptionButton;