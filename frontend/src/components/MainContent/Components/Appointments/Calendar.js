import { useContext } from "react";
import { colorTheme } from "../../../../App";

const Calendar = () => {
  const [selectedTheme] = useContext(colorTheme);
  const week = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  return (
    <div className={`flex flex-col justify-center items-center rounded-lg bg-blue-200 text-xs md:text-sm lg:text-base p-2 drop-shadow-md`}>
      <div className={`p-2 text-blue-600 font-bold`}>
        <p>June 2024</p>
      </div>
      <div className="grid grid-cols-7 gap-2 m-1">
        {week.map((day, i) => (
          <div key={i} className={`bg-blue-300 rounded-sm text-center text-xs px-1 md:px-2 lg:px-3 drop-shadow-sm font-semibold`}>
            <p>{day}</p>
          </div>
        ))}

        <div className={`bg-blue-300 rounded-sm`}>
          <p className="place-self-start">1</p>
        </div>
      </div>
    </div>
  );
}
 
export default Calendar;