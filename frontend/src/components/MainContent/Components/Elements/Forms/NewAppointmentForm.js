import { useContext, useState } from "react";
import { colorTheme } from "../../../../../App";
import { MdClose } from "react-icons/md";
import { Spinner } from "flowbite-react";
import { IoCreate } from "react-icons/io5";
import useQuery from "../../../../../hooks/useQuery";


const NewAppointmentForm = ({ close,children }) => {
  const [selectedTheme] = useContext(colorTheme);
  const [firstname, setFirstname] = useState("");

  const { response, isLoading, error, addData } = useQuery();

  function cleanUp() {

  }
  
  const toggleClose = () => {
    
  }

  return (
    <>
      {children}
      <form className="flex flex-col gap-4 m-5 mt-20 md:mt-24 lg:mt-24">
        <div>
          <label htmlFor="firstname" className='mb-2 text-xs md:text-sm lg:text-base font-semibold'>First Name:</label>
          <input 
            type="text"
            name="firstname"
            id="firstname"
            required
            className={`text-xs md:text-sm lg:text-base shadow-md rounded-lg w-full bg-transparent border-[1px] border-${selectedTheme}-800`}
            placeholder="Enter appointee's first name. . . . ."
          />
        </div>
        <div>
          <label htmlFor="lastname" className='text-xs md:text-sm lg:text-base font-semibold'>Last Name:</label>
          <input 
            type="text"
            name="lastname"
            id="lastname"
            required
            className={`text-xs md:text-sm lg:text-base shadow-md rounded-lg w-full bg-transparent border-[1px] border-${selectedTheme}-800`}
            placeholder="Enter appointee's last name. . . . ."
          />
        </div>
        <div>
          <label htmlFor="appointmentdate" className='text-xs md:text-sm lg:text-base font-semibold'>Appointed Date:</label>
          <input 
            type="date"
            name="appointmentdate"
            id="appointmentdate"
            required
            className={`text-xs md:text-sm lg:text-base shadow-md rounded-lg w-full bg-transparent border-[1px] border-${selectedTheme}-800`}
          />
        </div>
        <div>
          <label htmlFor="appointmenttime" className='text-xs md:text-sm lg:text-base font-semibold'>Appointed Time:</label>
          <input 
            type="time"
            name="appointmenttime"
            id="appointmenttime"
            required
            className={`text-xs md:text-sm lg:text-base shadow-md rounded-lg w-full bg-transparent border-[1px] border-${selectedTheme}-800`}
          />
        </div>
        <button disabled={isLoading} type="submit" className={`font-semibold p-2 rounded-md w-full transition-colors duration-200 ${!isLoading ? `text-${selectedTheme}-100 bg-${selectedTheme}-700 hover:drop-shadow-md hover:bg-${selectedTheme}-800 focus:bg-${selectedTheme}-600 active:bg-${selectedTheme}-300 active:text-${selectedTheme}-600 active:shadow-inner active:ring-2 active:ring-${selectedTheme}-600` : `text-${selectedTheme}-700 bg-${selectedTheme}-100 shadow-inner` }`}><p className="drop-shadow-lg">{!isLoading ? 'Create new appointment' : <Spinner/>}</p></button>
      </form>
    </>
  );
}
 
export default NewAppointmentForm;