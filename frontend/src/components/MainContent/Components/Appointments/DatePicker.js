import { useContext, useState } from "react";
import { colorTheme } from "../../../../App";
import { appointmentDate } from "./Appointments";

const DatePicker = ({ dateRef, toggleDatePicker }) => {
  const [startDate, endDate, setStartDate, setEndDate] = useContext(appointmentDate);
  const [selectedTheme] = useContext(colorTheme);
  const [errorPrompt, setErrorPrompt] = useState("");

  const handleSubmitDates = () => {
    if (new Date(startDate) < new Date(endDate)) {
      toggleDatePicker();
    } else if (new Date(startDate) > new Date(endDate)) {
      setErrorPrompt("Start date must be before the end date!");
      setTimeout(() => {
        setErrorPrompt("");
      }, 3000);
    } else {
      setErrorPrompt("Start date and end date can't be the same!");
      setTimeout(() => {
        setErrorPrompt("");
      }, 3000);
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const currentDate = new Date(); 
    if (name === 'startDate') {
      const selectedDate = new Date(value);
      if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
        setErrorPrompt("Start date cannot be before this day!");
        setTimeout(() => {
          setErrorPrompt("");
        }, 3000);
      } else if (selectedDate <= new Date(endDate)) {
        setStartDate(value);
      } else {
        setErrorPrompt("Start date cannot be after the end date!");
        setTimeout(() => {
          setErrorPrompt("");
        }, 3000);
      }
    } else if (name === 'endDate') {
      const selectedDate = new Date(value);
      if (selectedDate >= new Date(startDate)) {
        setEndDate(value);
      } else {
        setErrorPrompt("End date cannot be before the start date!");
        setTimeout(() => {
          setErrorPrompt("");
        }, 3000);
      }
    }
  };
  

  return (
    <dialog ref={dateRef} className={`bg-${selectedTheme}-300 rounded-lg`} >
      <div className="flex flex-col text-xs md:text-sm lg:text-sm">
        <div className={`flex items-center justify-center p-2 bg-${selectedTheme}-600 text-${selectedTheme}-200 rounded-t-lg font-semibold`}>
          <p className="text-nowrap">Appointment Range</p>
        </div>

        <div className="m-2 relative">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="startDate" className="font-semibold">From:</label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              value={startDate}
              autoComplete="off"
              onChange={handleDateChange}
              className={`p-2 text-xs md:text-sm lg:text-sm bg-${selectedTheme}-200 text-${selectedTheme}-700 rounded-md my-2`}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="endDate" className="font-semibold">To:</label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              autoComplete="off"
              value={endDate}
              onChange={handleDateChange}
              className={`p-2 text-xs md:text-sm lg:text-sm bg-${selectedTheme}-200 text-${selectedTheme}-700 rounded-md mb-2`}
            />
          </div>
          {errorPrompt && (
            <div className="absolute top-full right-0 mt-8 z-51">
              <p className={`text-xs border-[1px] border-red-800 text-red-700 font-thin mt-4 p-2 bg-red-50 rounded-lg text-center`}>
                {errorPrompt}
              </p>
            </div>
          )}
        </div>
        
        <div className={`flex justify-end items-center gap-3 p-2 border-t-[1px] border-${selectedTheme}-200`}>
          <button onClick={() => toggleDatePicker()} className={`text-${selectedTheme}-600 font-semibold`}>Cancel</button>
          <button className={`text-${selectedTheme}-600 font-semibold`} onClick={() => handleSubmitDates()}>Apply</button>
        </div>
      </div>
    </dialog>
  );
}
 
export default DatePicker;
