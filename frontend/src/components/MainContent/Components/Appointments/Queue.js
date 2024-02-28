import { useLocation } from "react-router-dom";
import { MdPeople } from "react-icons/md";
import Header from "../../Header";
import { colorTheme } from "../../../../App";
import { useContext } from "react";
import useCurrentTime from "../../../../hooks/useCurrentTime";

const Queue = () => {
  const [selectedTheme] = useContext(colorTheme);
  const location = useLocation();
  const pathname = location.pathname.slice(1);
  const title = pathname.charAt(0).toUpperCase() + pathname.slice(1);

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-col p-2 mt-20 md:mt-28 lg:mt-32 mb-4 mx-2 md:mx-3 lg:mx-4">
        <div>
          <Header title={ title } icon={<MdPeople />}/>
        </div>
        <div className="min-h-screen h-screen overflow-y-auto scroll-smooth p-2 mt-2">
          <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-4 mb-60 md:mb-72 lg:mb-80`}>
          
            <div className="col-span-2 row-span-2 bg-sky-50 rounded-lg text-xs md:text-sm lg:text-base">
              
            </div>
          
            <div className="w-full md:w-full lg:grow flex flex-col h-auto bg-sky-50 rounded-lg drop-shadow-md text-xs md:text-sm lg:text-base">
              <div className={`text-center border-b-[1px] border-${selectedTheme}-800 shadow-md`}>
                <p className={`text-${selectedTheme}-600 font-bold text-base md:text-lg lg:text-xl`}>NO.01</p>
              </div>
              <div className="flex flex-col gap-2 p-2">
                <div className={`flex justify-start items-center gap-2 text-${selectedTheme}-800 font-semibold`}>
                  <label htmlFor="name">Name: </label>
                  <p id="name" name="name">Filhmar Ola</p>
                </div>
                <div className={`flex justify-start items-center gap-2 text-${selectedTheme}-800 font-semibold`}>
                  <label htmlFor="name">Age: </label>
                  <p id="name" name="name">23</p>
                </div>
                <div className={`flex justify-start items-center gap-2 text-${selectedTheme}-800 font-semibold`}>
                  <label htmlFor="name">Time Arrived: </label>
                  <p id="name" name="name">2:50:32 pm</p>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-full lg:grow flex flex-col h-auto bg-sky-50 rounded-lg drop-shadow-md text-xs md:text-sm lg:text-base">
              <div className={`text-center border-b-[1px] border-${selectedTheme}-800 shadow-md`}>
                <p className={`text-${selectedTheme}-600 font-bold text-base md:text-lg lg:text-xl`}>NO.01</p>
              </div>
              <div className="flex flex-col gap-2 p-2">
                <div className={`flex justify-start items-center gap-2 text-${selectedTheme}-800 font-semibold`}>
                  <label htmlFor="name">Name: </label>
                  <p id="name" name="name">Filhmar Ola</p>
                </div>
                <div className={`flex justify-start items-center gap-2 text-${selectedTheme}-800 font-semibold`}>
                  <label htmlFor="name">Age: </label>
                  <p id="name" name="name">23</p>
                </div>
                <div className={`flex justify-start items-center gap-2 text-${selectedTheme}-800 font-semibold`}>
                  <label htmlFor="name">Time Arrived: </label>
                  <p id="name" name="name">2:50:32 pm</p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-full lg:grow flex flex-col h-auto bg-sky-50 rounded-lg drop-shadow-md text-xs md:text-sm lg:text-base">
              <div className={`text-center border-b-[1px] border-${selectedTheme}-800 shadow-md`}>
                <p className={`text-${selectedTheme}-600 font-bold text-base md:text-lg lg:text-xl`}>NO.01</p>
              </div>
              <div className="flex flex-col gap-2 p-2">
                <div className={`flex justify-start items-center gap-2 text-${selectedTheme}-800 font-semibold`}>
                  <label htmlFor="name">Name: </label>
                  <p id="name" name="name">Filhmar Ola</p>
                </div>
                <div className={`flex justify-start items-center gap-2 text-${selectedTheme}-800 font-semibold`}>
                  <label htmlFor="name">Age: </label>
                  <p id="name" name="name">23</p>
                </div>
                <div className={`flex justify-start items-center gap-2 text-${selectedTheme}-800 font-semibold`}>
                  <label htmlFor="name">Time Arrived: </label>
                  <p id="name" name="name">2:50:32 pm</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Queue;