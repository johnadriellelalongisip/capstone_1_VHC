import { useContext, useEffect } from "react";
import { MdClose, MdPeople } from "react-icons/md";
import { colorTheme } from "../../../../App";
import DataTable from "../Elements/DataTable";
import useQuery from "../../../../hooks/useQuery";
import useSocket from "../../../../hooks/useSocket";

const Attended = ({ ATref, ATonClick }) => {
  const [selectedTheme] = useContext(colorTheme);
  const { isLoading, error } = useQuery();
  const keyMap = {
    "queue_number": "Queue Number",
    "family_id": "Family ID",
    "citizen_fullname": "Full Name",
    "citizen_barangay": "Barangay",
    "citizen_number": "Number",
    "citizen_gender": "Gender",
    "time_arrived": "Time Arrived",
    "current_status": "Current Status"
  };
  const { data: queue } = useSocket({ SSName: "attendedQueue", keyMap: keyMap, fetchUrl: "getAttended", socketUrl: "newAttended", socketEmit: "updateAttended", socketError: "newAttendedError" });

  useEffect(() => {
    console.log(queue)
  }, [queue]);
  
  const transformedData = queue && queue.length > 0 && queue.map(item => {
    const date = new Date(item["Time Arrived"]);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const meridian = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedTime = `${hours}:${minutes}${meridian}`;
    return {
      ...item,
      "Time Arrived": formattedTime
    };
  });  

  return (
    <dialog ref={ATref} className={`rounded-lg bg-${selectedTheme}-100 drop-shadow-lg w-[600px] md:w-[800px] lg:w-[1000px]`}>
      <div className="flex flex-col text-xs md:text-sm lg:text-base">
        <div className={`flex justify-between items-center p-2 text-${selectedTheme}-600 border-b-[1px] border-solid border-${selectedTheme}-500 shadow-md shadow-${selectedTheme}-600 mb-2`}>
          <div className="flex items-center p-1 gap-1">
            <MdPeople className='w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8' 
              // onClick={() => socket.emit('updateAttended', {startDate: startDate, endDate: endDate})}
            />
            <strong className="font-semibold drop-shadow-md text-sm md:text-base lg:text-lg">Passed Attended Patients</strong>
          </div>
          <button onClick={ATonClick} className={`transition-colors duration-200 rounded-3xl p-1 bg-${selectedTheme}-300 hover:bg-${selectedTheme}-400 active:bg-${selectedTheme}-200`}>
            <MdClose className='w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />
          </button>
        </div>
      </div>
      {/* <div className="flex justify-end items-center gap-2 p-[0.15rem] md:p-1 lg:p-[0.35rem] w-full">
        <div className="flex gap-1 items-center">
          <label htmlFor="startDate" className={`font-semibold text-${selectedTheme}-800 text-xs md:text-sm lg:text-base`}>Startdate: </label>
          <input 
            type="datetime-local" 
            name="startDate" 
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={`rounded-lg font-base text-xs md:text-sm lg:text-base p-2 size-8 text-${selectedTheme}-800 bg-${selectedTheme}-50 font-bold`}
          />
        </div>
        <div className="flex gap-1 items-center">
          <label htmlFor="endDate" className={`font-semibold text-${selectedTheme}-800 text-xs md:text-sm lg:text-base`}>Enddate: </label>
          <input 
            type="datetime-local" 
            name="endDate" 
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={`rounded-lg font-base text-xs md:text-sm lg:text-base p-2 size-8 text-${selectedTheme}-800 bg-${selectedTheme}-50 font-bold`}
          />
        </div>
      </div> */}
      <div className="p-2">
        <DataTable data={transformedData} enAdd={false} isLoading={isLoading} error={error} enImport={false} enExport={false} enOptions={false} />
      </div>
    </dialog>
  );
};
 
export default Attended;