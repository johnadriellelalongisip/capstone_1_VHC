import { useContext, useEffect, useState } from "react";
import { colorTheme } from "../../../../../App";
import { Spinner } from "flowbite-react";
import useQuery from "../../../../../hooks/useQuery";
import useCurrentTime from "../../../../../hooks/useCurrentTime";


const NewAppointmentForm = ({ close,children }) => {
  const [selectedTheme] = useContext(colorTheme);
  const [appointmentID, setAppointmentID] = useState("");
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [appointment, setAppointment] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [errorPrompt, setErrorPrompt] = useState("");
  const { mysqlTime } = useCurrentTime();

  const { searchResults, isLoading, error, addData, searchItems, searchData } = useQuery();

  function cleanUp() {
    setFullname("");
    setDescription("");
    setAppointment("");
    setAppointmentID("");
    setPhoneNumber("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      appointmentID: appointmentID,
      fullname: fullname,
      phonenumber: !phoneNumber ? searchResults?.data[0].citizen_number : phoneNumber,
      appointedTime: appointment,
      description: description,
      status: "to be scheduled",
      appointedAt: String(mysqlTime),
    };
    const convertToMySQLDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
    const convertedPayload = {
        ...payload,
        appointedTime: convertToMySQLDateTime(payload.appointedTime),
        appointedAt: convertToMySQLDateTime(payload.appointedAt)
    };
    if (new Date(appointment) > new Date()) {
      addData("newAppointment", convertedPayload);
      cleanUp();
      close();
    } else {
      setErrorPrompt("Appointment must be after this day or any other day!");
      setTimeout(() => {
        setErrorPrompt("");
      }, 3000);
    }
  };

  useEffect(() => {
    if(error) {
      console.log(error);
    }
  }, [error]);
  
  function setNewSuggestions(newData) {
    setSuggestions(() => {
      const newSuggestions = newData.map((data) => String(data.citizen_full_name));
      if (newSuggestions !== null || newSuggestions !== undefined) {
        return [...newSuggestions];
      } else {
        return null;
      }
    });
  }

  useEffect(() => {
    if(searchResults && searchResults.data && searchResults.data.length === 1) {
      setAppointmentID(searchResults.data[0].citizen_family_id);
    }
    if (searchResults?.data) {
      setNewSuggestions(searchResults.data);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResults?.data]);

  const handleNameChange = (e) => {
    const specialCharacterPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0123456789]/g;
    if (!specialCharacterPattern.test(e.target.value)) {
      setFullname(e.target.value);
    } else {
      e.preventDefault();
    }
  };

  const handleNumberChange = (e) => {
    const numberPattern = /^[0-9]*$/;
    if (numberPattern.test(e.target.value) || e.target.value === "") {
      setPhoneNumber(e.target.value);
    } else {
      e.preventDefault();
    }
  };
  
  const handleEnter = (event) => {
    if (event.key === 'Enter' && isNameFocused && fullname) {
      searchItems('findFirstName', String(fullname));
      setNewSuggestions([]);
    }
  };  

  const handleDateChange = (e) => {
    const value = e.target.value;
    if (!value) {
      setAppointment("");
      return;
    }
    const currentDate = new Date(value);
    if (currentDate < new Date()) {
      setErrorPrompt("Appointment can't be before or the current day!");
      setTimeout(() => {
        setErrorPrompt(""); 
      }, 3000);
    } else {
      const formattedDate = currentDate.toISOString().slice(0, 16);
      setAppointment(formattedDate);
    }
  };

  return (
    <>
      {children}
      <form className="flex flex-col gap-4 m-5 mt-20 md:mt-24 lg:mt-24" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullname" className='mb-2 text-xs md:text-sm lg:text-base font-semibold'>First Name:<span className="text-red-600 font-bold">*</span></label>
          <input 
            type="text"
            name="fullname"
            id="fullname"
            list="recordSuggestions"
            required
            value={fullname}
            onChange={handleNameChange}
            autoComplete="off"
            onFocus={(e) => {setIsNameFocused(true); fullname.length && searchItems('findFirstName', e.target.value);} }
            onBlur={() => {setIsNameFocused(false); setSuggestions([]);}}
            onKeyDown={handleEnter}
            className={`text-xs md:text-sm lg:text-base shadow-md rounded-lg w-full bg-transparent border-[1px] border-${selectedTheme}-800`}
            placeholder="Enter appointee's full name. . . . ."
            maxLength={100}
          />
          <p className={`text-xs text-${selectedTheme}-700 font-thin mt-2 p-2 bg-${selectedTheme}-50 rounded-lg text-center`}>
            Type a name and press enter to search existing citizen.
          </p>
          <datalist id="recordSuggestions">
            {suggestions && suggestions.slice(0, 5).map((name, index) => (
              <option key={index} value={name} />
            ))}
          </datalist>
        </div>
        <div>
          <label htmlFor="phoneNumber" className='mb-2 text-xs md:text-sm lg:text-base font-semibold'>Contact Number:</label>
          <input 
            type="text" 
            name="phoneNumber" 
            id="phoneNumber"
            autoComplete="off"
            value={phoneNumber}
            onChange={handleNumberChange}
            className={`text-xs md:text-sm lg:text-base shadow-md rounded-lg w-full bg-transparent border-[1px] border-${selectedTheme}-800`}
            placeholder="Enter personal contact number. . . . ."
            maxLength={12}
          />
        </div>
        <div>
          <label htmlFor="description" className='text-xs md:text-sm lg:text-base font-semibold'>Description & Reason:<span className="text-red-600 font-bold">*</span></label>
          <textarea 
            name="description"
            id="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`text-xs md:text-sm lg:text-base shadow-md rounded-lg w-full bg-transparent border-[1px] border-${selectedTheme}-800`}
            placeholder="Reason for appointment. . . . ."
            rows={4}
            maxLength={255}
          />
        </div>
        <div>
          <label htmlFor="appointmentdatetime" className='text-xs md:text-sm lg:text-base font-semibold'>Appointed Date & Time:<span className="text-red-600 font-bold">*</span></label>
          <input 
            type="datetime-local"
            name="appointmentdatetime"
            id="appointmentdatetime"
            required
            value={appointment}
            onChange={handleDateChange}
            className={`text-xs md:text-sm lg:text-base shadow-md rounded-lg w-full bg-transparent border-[1px] border-${selectedTheme}-800`}
          />
          {errorPrompt && (
            <p className={`text-xs border-[1px] border-red-800 text-red-700 font-thin mt-4 p-2 bg-red-50 rounded-lg text-center`}>
              {errorPrompt}
            </p>
          )}
        </div>
        <button disabled={isLoading} type="submit" className={`font-semibold p-2 rounded-md w-full transition-colors duration-200 ${!isLoading ? `text-${selectedTheme}-100 bg-${selectedTheme}-700 hover:drop-shadow-md hover:bg-${selectedTheme}-800 focus:bg-${selectedTheme}-600 active:bg-${selectedTheme}-300 active:text-${selectedTheme}-600 active:shadow-inner active:ring-2 active:ring-${selectedTheme}-600` : `text-${selectedTheme}-700 bg-${selectedTheme}-100 shadow-inner` }`}><p className="drop-shadow-lg">{!isLoading ? 'Create new appointment' : <Spinner/>}</p></button>
      </form>
    </>
  );
}
 
export default NewAppointmentForm;