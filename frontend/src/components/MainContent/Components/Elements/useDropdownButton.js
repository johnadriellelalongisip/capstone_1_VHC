import React, { useContext, useState } from 'react';
import { MdArrowDropDown } from "react-icons/md";
import { colorTheme } from '../../../../App';

const useDropdown = ({ options, defaultOption, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (item) => {
    setSelectedOption(item);
    setIsOpen(false);
    if (onSelect) {
      onSelect(item);
    }
  };

  const DropdownButton = ({ children }) => {
    const [selectedTheme] = useContext(colorTheme);

    return (
      <div className="relative inline-block text-left">
        <button
          type="button"
          onClick={(e) => handleButtonClick(e)}
          className={`inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-${selectedTheme}-800 rounded-md focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75`}
        >
          {children || selectedOption}
          <MdArrowDropDown
            className={`w-4 h-4 transition-transform ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>
        {isOpen && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="py-1 flex flex-col" role="none">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleMenuItemClick(option)}
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-${selectedTheme}-100 hover:text-gray-900`}
                  role="menuitem"
                >
                  <p>{ option }</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return { DropdownButton, selectedOption };
};

export default useDropdown;