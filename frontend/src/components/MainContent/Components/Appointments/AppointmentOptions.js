import { useContext, useEffect, useState } from "react";
import { colorTheme } from "../../../../App";
import { IoCalendarSharp } from "react-icons/io5";
import { MdCheck, MdClose, MdDelete, MdEdit, MdKeyboardDoubleArrowDown } from "react-icons/md";
import useQuery from "../../../../hooks/useQuery";

const AppointmentOptions = ({ appointmentRef, toggle, PK }) => {
  const [selectedTheme] = useContext(colorTheme);
  const { searchResults, response, isLoading, error, searchItems, editData } = useQuery();
  const [selectedAppointment, setSelectedAppointment] = useState([{}]);
  const [editing, setEditing] = useState(false);
  const [payload, setPayload] = useState({
    fullname: "",
    phoneNumber: "",
    description: "",
    appointed_datetime: "",
  });

  useEffect(() => {
    if (PK) {
      searchItems("findAppointmentByNumber", PK);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PK]);

  useEffect(() => {
    if (searchResults && searchResults.status === 200) {
      setSelectedAppointment(searchResults.data[0]);
    }
  }, [searchResults]);

  function closeModal() {
    toggle();
    setSelectedAppointment([{}]);
    setPayload({
      fullname: "",
      phoneNumber: "",
      description: "",
      appointed_datetime: "",
    });
  };

  const handleToggleEdit = () => {
    setPayload(() => ({
      fullname: selectedAppointment.fullname,
      phoneNumber: selectedAppointment.phoneNumber,
      description: selectedAppointment.description,
      appointed_datetime: selectedAppointment.appointed_datetime
    }));
    if (
      editing && (payload.fullname !== selectedAppointment.fullname ||
      payload.phoneNumber !== selectedAppointment.phoneNumber ||
      payload.description !== selectedAppointment.description ||
      payload.appointed_datetime !== selectedAppointment.appointed_datetime)
    ) {
      const proceed = window.confirm("This will leave changes unchanged, proceed?");
      if (proceed) {
        setEditing((prev) => !prev);
      }
    } else {
      setEditing((prev) => !prev);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload(prevPayload => ({
      ...prevPayload,
      [name]: value
    }));
  };

  const handleUpdate = (e) => {
    editData("")
  }
  
  return (
    <dialog ref={appointmentRef} className={`rounded-lg bg-${selectedTheme}-100 drop-shadow-lg w-80 md:w-[500px] lg:w-[600px]`}>
      <div className="flex flex-col text-xs md:text-sm lg:text-base">
        <div className={`flex justify-between items-center p-2 text-${selectedTheme}-600 border-b-[1px] border-solid border-${selectedTheme}-500 shadow-md shadow-${selectedTheme}-600 mb-2`}>
          <div className="flex items-center p-1 gap-1">
            <IoCalendarSharp className='w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8' />
            <strong className="font-semibold drop-shadow-md text-sm md:text-base lg:text-lg">Appointment Options</strong>
          </div>
          <button onClick={() => closeModal()} className={`transition-colors duration-200 rounded-3xl p-1 bg-${selectedTheme}-300 hover:bg-${selectedTheme}-400 active:bg-${selectedTheme}-200`}>
            <MdClose className='w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />
          </button>
        </div>
        <form className="flex flex-col gap-3 p-3 m-2">
          <div className="flex justify-between items-center font-semibold">
            <p>Family ID: <span className="underline">{selectedAppointment?.citizen_id}</span></p>
            <p>Status: <span className="underline">{selectedAppointment?.status}</span></p>
          </div>
          <div>
            <label htmlFor="fullname" className='mb-2 text-xs md:text-sm lg:text-base font-semibold'>Full Name:</label>
            <input 
              disabled={!editing}
              type="text"
              name="fullname"
              id="fullname"
              list="recordSuggestions"
              required
              value={!editing ? selectedAppointment?.fullname : payload.fullname}
              onChange={handleChange}
              className={`text-xs md:text-sm lg:text-base shadow-md rounded-lg w-full bg-transparent border-[1px] ${editing ? `border-${selectedTheme}-800` : `border-transparent`}`}
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className='mb-2 text-xs md:text-sm lg:text-base font-semibold'>Contact Number:</label>
            <input 
              disabled={!editing}
              type="text" 
              name="phoneNumber" 
              id="phoneNumber"
              required
              value={!editing ? selectedAppointment?.phone_number : payload.phoneNumber}
              onChange={handleChange}
              className={`text-xs md:text-sm lg:text-base shadow-md rounded-lg w-full bg-transparent border-[1px] ${editing ? `border-${selectedTheme}-800` : `border-transparent`}`}
            />
          </div>
          <div>
            <label htmlFor="description" className='text-xs md:text-sm lg:text-base font-semibold'>Description & Reason:</label>
            <textarea 
              disabled={!editing}
              name="description"
              id="description"
              required
              value={!editing ? selectedAppointment?.description : payload.description}
              onChange={handleChange}
              className={`text-xs md:text-sm lg:text-base shadow-md rounded-lg w-full bg-transparent border-[1px] ${editing ? `border-${selectedTheme}-800` : `border-transparent`}`}
              rows={4}
            />
          </div>
          <div>
            <label htmlFor="appointed_datetime" className='text-xs md:text-sm lg:text-base font-semibold'>Appointed Date & Time:</label>
            <input 
              disabled={!editing}
              type="datetime-local"
              name="appointed_datetime"
              id="appointed_datetime"
              required
              value={!editing ? selectedAppointment?.appointed_datetime : payload.appointed_datetime}
              onChange={handleChange}
              className={`text-xs md:text-sm lg:text-base shadow-md rounded-lg w-full bg-transparent border-[1px] ${editing ? `border-${selectedTheme}-800` : `border-transparent`}`}
            />
          </div>
        </form>
        <div className="flex justify-evenly items-center my-4">
          <button onClick={() => handleToggleEdit()} className={`p-4 text-center rounded-full font-semibold ${!editing ? `bg-${selectedTheme}-300 text-${selectedTheme}-600` : `bg-${selectedTheme}-600 text-${selectedTheme}-300`} hover:bg-${selectedTheme}-400 hover:text-${selectedTheme}-700 active:bg-${selectedTheme}-700 active:text-${selectedTheme}-400 transition-colors duration-300 ease-linear`}><MdEdit className="size-5 md:size-6 lg:size-7"/></button>
          <button className={`p-4 text-center rounded-full font-semibold bg-${selectedTheme}-300 text-${selectedTheme}-600 hover:bg-${selectedTheme}-400 hover:text-${selectedTheme}-700 active:bg-${selectedTheme}-700 active:text-${selectedTheme}-400 transition-colors duration-300 ease-linear`}><MdKeyboardDoubleArrowDown className="size-5 md:size-6 lg:size-7"/></button>
          <button className={`p-4 text-center rounded-full font-semibold bg-${selectedTheme}-300 text-${selectedTheme}-600 hover:bg-${selectedTheme}-400 hover:text-${selectedTheme}-700 active:bg-${selectedTheme}-700 active:text-${selectedTheme}-400 transition-colors duration-300 ease-linear`}><MdCheck className="size-5 md:size-6 lg:size-7"/></button>
          <button className={`p-4 text-center rounded-full font-semibold bg-${selectedTheme}-300 text-${selectedTheme}-600 hover:bg-${selectedTheme}-400 hover:text-${selectedTheme}-700 active:bg-${selectedTheme}-700 active:text-${selectedTheme}-400 transition-colors duration-300 ease-linear`}><MdDelete className="size-5 md:size-6 lg:size-7"/></button>
        </div>
      </div>
    </dialog>
  );
}
 
export default AppointmentOptions;