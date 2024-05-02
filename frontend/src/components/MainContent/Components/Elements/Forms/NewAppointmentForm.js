import { useContext, useEffect, useState } from "react";
import { colorTheme } from "../../../../../App";
import { Spinner } from "flowbite-react";
import useQuery from "../../../../../hooks/useQuery";
import useCurrentTime from "../../../../../hooks/useCurrentTime";
import { confirmationContext } from "../FormModal";
import { MdOutlineRadioButtonChecked, MdOutlineRadioButtonUnchecked } from "react-icons/md";

const NewAppointmentForm = ({ close, children }) => {
  const [selectedTheme] = useContext(colorTheme);
  const [appointmentID, setAppointmentID] = useState("");
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [appointment, setAppointment] = useState("");
  const [errorPrompt, setErrorPrompt] = useState("");
  const [inputState, setInputState] = useState(false);
  const [useRecordNum, setUseRecordNum] = useState(false);
  const { mysqlTime } = useCurrentTime();

  // eslint-disable-next-line no-unused-vars
  const [message, setMessage, confirmMessage, setConfirmMessage, cancelMessage, setCancelMessage, backMessage, setBackMessage, toggleConfirmDialog, selectedOption, setSelectedOption] = useContext(confirmationContext);
  const { searchResults, isLoading, error, addData, searchData } = useQuery();

  function cleanUp() {
    setFullname("");
    setDescription("");
    setAppointment("");
    setAppointmentID("");
    setPhoneNumber("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointmentLogs = {};
    const JKey = String(mysqlTime);
    appointmentLogs[JKey] = "Appointment Added";
    const payload = {
      appointmentID: appointmentID,
      fullname: fullname,
      phonenumber: phoneNumber,
      appointedTime: appointment,
      description: description,
      status: "to be scheduled",
      createdAt: mysqlTime,
      logs: JSON.stringify(appointmentLogs)
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
      if (inputState) {
        addData("newAppointmentByFamID", convertedPayload);
      } else {
        addData("newAppointment", convertedPayload);
      }
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

  const handleNameChange = (e) => {
    const specialCharacterPattern = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?0123456789]/g;
    if (!specialCharacterPattern.test(e.target.value)) {
      setFullname(e.target.value);
    } else {
      e.preventDefault();
    }
  };

  const toggleConfirm = () => {
    setMessage(!inputState ? "This will leave your Name unchanged, proceed?" : "This will leave your FamilyID unchanged, proceed?");
    setConfirmMessage("Proceed");
    setCancelMessage("Cancel");
    setBackMessage("Go Back?");
    toggleConfirmDialog();
  };

  useEffect(() => {
    if (selectedOption) {
      if (inputState) {
        setAppointmentID("");
        toggleConfirmDialog();
      } else {
        setFullname("");
        toggleConfirmDialog();
      }
      setInputState(prev => !prev);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);
  
  const toggleInputState = () => {
    if (appointmentID.length > 0) {
      toggleConfirm();
    } else {
      setInputState(prev => !prev);
    }
    if (fullname.length > 0) {
      toggleConfirm();
    } else {
      setInputState(prev => !prev);
    }
    setPhoneNumber("");
    setInputState(prev => !prev);
  };

  const handleNumberChange = (e) => {
    const numberPattern = /^[0-9]*$/;
    if (numberPattern.test(e.target.value) || e.target.value === "") {
      setPhoneNumber(e.target.value);
    } else {
      e.preventDefault();
    }
  };

  // const handleDateChange = (e) => {
  //   const value = e.target.value;
  //   if (!value) {
  //     setAppointment("");
  //     return;
  //   }
  //   const currentDate = new Date(value);
  //   if (currentDate < new Date()) {
  //     setErrorPrompt("Appointment can't be before or the current day!");
  //     setTimeout(() => {
  //       setErrorPrompt(""); 
  //     }, 3000);
  //   } else {
  //     const formattedDate = currentDate.toISOString().slice(0, 16);
  //     setAppointment(formattedDate);
  //   }
  // };

  return (
    <>
      {children}
      <div className="flex flex-col gap-4 m-5 mt-20 md:mt-24 lg:mt-24">
        <button onClick={toggleInputState} className={`font-semibold mt-2 p-2 rounded-md transition-colors duration-200 text-${selectedTheme}-100 bg-${selectedTheme}-700 hover:drop-shadow-md hover:bg-${selectedTheme}-800 focus:bg-${selectedTheme}-600 active:bg-${selectedTheme}-300 active:text-${selectedTheme}-600 active:shadow-inner active:ring-2 active:ring-${selectedTheme}-600`}>
          {!inputState ? 'Add By FamilyID' : 'Add By Name'}
        </button>
        <form className="flex flex-col gap-4 max-h-[500px] min-h-[500px] overflow-y-auto" onSubmit={handleSubmit}>
          <div>
            <label htmlFor={inputState ? 'familyID' : 'fullname'} className='mb-2 text-xs md:text-sm lg:text-base font-semibold'>{inputState ? 'FamilyID' : 'Name'}:<span className="text-red-600 font-bold">*</span></label>
            <input
                type="text"
                name={inputState ? 'familyID' : 'fullname'}
                id={inputState ? 'familyID' : 'fullname'}
                list="recordSuggestions"
                required
                value={inputState ? appointmentID : fullname}
                onChange={inputState ? (e) => setAppointmentID(e.target.value) : handleNameChange}
                autoComplete="off"
                className={`text-xs md:text-sm lg:text-base shadow-md rounded-lg w-full bg-transparent border-[1px] border-${selectedTheme}-800`}
                placeholder={inputState ? "Enter patient's FamilyID. . . . ." : "Enter appointee's full name. . . . ."}
                maxLength={100}
              />
            {/* <datalist id="recordSuggestions">
              {suggestions && suggestions.slice(0,5).map((name, i) => (
                <option key={i}>{name}</option>
              ))}
            </datalist>
            <p className={`text-xs text-${selectedTheme}-700 font-thin mt-2 p-2 bg-${selectedTheme}-50 rounded-lg text-center`}>
              Type a name and press enter to search existing citizen.
            </p> */}
          </div>
          <div>
            <label htmlFor="phoneNumber" className='mb-2 text-xs md:text-sm lg:text-base font-semibold'>Contact Number:</label>
            <div className="flex gap-1 flex-row justify-start items-center">
              <input 
                type="text" 
                name="phoneNumber" 
                id="phoneNumber"
                autoComplete="off"
                value={phoneNumber}
                onChange={handleNumberChange}
                className={`text-xs md:text-sm lg:text-base shadow-md rounded-lg w-full bg-transparent border-[1px] border-${selectedTheme}-800`}
                placeholder={inputState ? (!useRecordNum ? 'Enter personal contact number. . . .' : 'Proceeding will use the contact number of this citizen') : 'Enter personal contact number. . . . .'}
                maxLength={12}
                disabled={inputState ? useRecordNum : false}
              />
              {inputState && 
                <button onClick={(e) => {e.preventDefault(); setPhoneNumber(""); setUseRecordNum(prev => !prev)}}>
                  {useRecordNum ? (
                    <MdOutlineRadioButtonChecked className="size-6 md:size-7 lg:size-8" />
                  ):(
                    <MdOutlineRadioButtonUnchecked className="size-6 md:size-7 lg:size-8"/>
                  )}
                </button>
              }
            </div>
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
          <div className="relative">
            <label htmlFor="appointmentdatetime" className='relative text-xs md:text-sm lg:text-base font-semibold'>
              Appointed Date & Time:<span className="text-red-600 font-bold">*</span>
              {errorPrompt && 
                <p className="absolute left-0 text-xs border-[1px] border-red bg-red-100 rounded-lg p-1 text-red font-thin text-red text-nowrap w-min">{errorPrompt && errorPrompt}</p>
              }
            </label>
            <input 
              type="datetime-local"
              name="appointmentdatetime"
              id="appointmentdatetime"
              required
              value={appointment}
              onChange={(e) => setAppointment(e.target.value)}
              className={`text-xs md:text-sm lg:text-base shadow-md rounded-lg w-full bg-transparent border-[1px] border-${selectedTheme}-800`}
            />
          </div>
          {!inputState ? (
            <p className={`text-wrap text-red-700 text-xs md:text-sm lg:text-sm font-thin p-1 bg-${selectedTheme}-50 rounded-lg text-center`}>
              Note: If there's no provided FAMILY ID, create or search the name on the records.
            </p>
          ):(
            <p className={`text-xs md:text-sm lg:text-sm text-${selectedTheme}-700 font-thin p-1 bg-${selectedTheme}-50 rounded-lg text-center`}>
              Proceeding to create this appointment will add this action to the record's history.
            </p>
          )}
          <button disabled={isLoading} type="submit" className={`font-semibold p-2 rounded-md w-full transition-colors duration-200 ${!isLoading ? `text-${selectedTheme}-100 bg-${selectedTheme}-700 hover:drop-shadow-md hover:bg-${selectedTheme}-800 focus:bg-${selectedTheme}-600 active:bg-${selectedTheme}-300 active:text-${selectedTheme}-600 active:shadow-inner active:ring-2 active:ring-${selectedTheme}-600` : `text-${selectedTheme}-700 bg-${selectedTheme}-100 shadow-inner` }`}><p className="drop-shadow-lg">{!isLoading ? 'Create new appointment' : <Spinner/>}</p></button>
        </form>
      </div>
    </>
  )
}
 
export default NewAppointmentForm;