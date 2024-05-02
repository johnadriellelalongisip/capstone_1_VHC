import { useContext, useEffect, useRef, useState } from "react";
import { colorTheme } from "../../../../App";
import { IoCalendarSharp } from "react-icons/io5";
import { MdCheck, MdClose, MdDelete, MdEdit, MdKeyboardDoubleArrowDown } from "react-icons/md";
import useQuery from "../../../../hooks/useQuery";
import { Tooltip } from "flowbite-react";
import ConfirmForm from "../../../../hooks/ConfirmForm";

const AppointmentOptions = ({ appointmentRef, toggle, PK }) => {
  const [selectedTheme] = useContext(colorTheme);
  const { searchResults, response, isLoading, error, searchItems, editData, deleteData } = useQuery();
  const [selectedAppointment, setSelectedAppointment] = useState([{}]);
  const [editing, setEditing] = useState(false);
  const confirmationRef = useRef(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
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
    setEditing(false);
    toggle();
    setSelectedAppointment([{}]);
    setPayload({
      fullname: "",
      phoneNumber: "",
      description: "",
      appointed_datetime: "",
    });
  };

  const handleUpdate = (data) => {

  };

  const handleCancelAppointment = () => {
    deleteData(
      8iapoaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
  };

  const handleApproveAppointment = () => {
    editData('handleApproveAppointment', "scheduled", PK);
  }

  useEffect(() => {
    if (response && response.status === 204) {
      console.log(response);
    }
    if (error) {
      console.log(error);
    }
  }, [response, error]);

  function toggleConfirmation() {
    if (isConfirmOpen) {
      setIsConfirmOpen(false);
      confirmationRef.current.close();
    } else {
      setIsConfirmOpen(true);
      confirmationRef.current.showModal();
    }
  };

  const isFormFilled = () => {
    if (editing && (payload.fullname !== selectedAppointment.fullname ||
      payload.phoneNumber !== selectedAppointment.phoneNumber ||
      payload.description !== selectedAppointment.description ||
      payload.appointed_datetime !== selectedAppointment.appointed_datetime)) 
    {
      return true;
    } else {
      return false;
    }
  };

  const handleToggleEdit = () => {
    setPayload(() => ({
      fullname: selectedAppointment.fullname,
      phoneNumber: selectedAppointment.phoneNumber,
      description: selectedAppointment.description,
      appointed_datetime: selectedAppointment.appointed_datetime
    }));
    if (isFormFilled()) {
      toggleConfirmation();
    } else {
      setEditing((prev) => !prev);
    }
  };

  const proceedUpdate = () => {
    toggleConfirmation();
    setEditing((prev) => !prev);
  }
  const cancelUpdate = () => {
    toggleConfirmation();
    setEditing((prev) => !prev);
  }
  const goBack = () => {
    toggleConfirmation();
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload(prevPayload => ({
      ...prevPayload,
      [name]: value
    }));
  };
  
  return (
    <>
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
          {
            isLoading ? (
              <div className="flex flex-col gap-3 p-3 m-2 animate-pulse ease-linear drop-shadow-md">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index}>
                    <div className={`mb-2 text-xs md:text-sm lg:text-base font-semibold bg-${selectedTheme}-400 rounded-md w-24`}> </div>
                    <div className={`mb-2 ${index === 2 && 'h-16'} text-xs md:text-sm lg:text-base font-semibold bg-${selectedTheme}-400 rounded-md`}> </div>
                  </div>
                ))}
                <div className="flex justify-evenly items-center my-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div className={`rounded-full size-10 md:size-11 lg:size-12 bg-${selectedTheme}-400`}> </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <form className="flex flex-col gap-3 p-3 m-2">
                  {selectedAppointment?.citizen_id && <p className="font-semibold">Family ID: <span className="underline">{selectedAppointment?.citizen_id}</span></p>}
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
                  <div>
                    <label htmlFor="status" className='mb-2 text-xs md:text-sm lg:text-base font-semibold'>Appointment Status:</label>
                    <input 
                      disabled
                      type="text"
                      name="status"
                      id="status"
                      list="recordSuggestions"
                      required
                      value={!editing ? selectedAppointment?.status : payload.status}
                      onChange={handleChange}
                      className={`text-xs md:text-sm lg:text-base shadow-md rounded-lg w-full bg-transparent border-transparent`}
                    />
                  </div>
                </form>
                <div className="flex justify-evenly items-center my-4">

                  <Tooltip content={editing ? 'Update?' : 'Edit?'} animation="duration-500">
                    <button onClick={() => handleToggleEdit()} className={`drop-shadow-md p-3 text-center rounded-full font-semibold ${!editing ? `bg-${selectedTheme}-300 text-${selectedTheme}-600` : `bg-${selectedTheme}-600 text-${selectedTheme}-300`} hover:bg-${selectedTheme}-400 hover:text-${selectedTheme}-700 active:bg-${selectedTheme}-700 active:text-${selectedTheme}-400 transition-colors duration-300 ease-linear`}><MdEdit className="size-5 md:size-6 lg:size-7"/></button>
                  </Tooltip>

                  <Tooltip content="Cancel Appointment?" animation="duration-500">
                    <button onClick={() => handleCancelAppointment()} className={`drop-shadow-md p-3 text-center rounded-full font-semibold bg-${selectedTheme}-300 text-${selectedTheme}-600 hover:bg-${selectedTheme}-400 hover:text-${selectedTheme}-700 active:bg-${selectedTheme}-700 active:text-${selectedTheme}-400 transition-colors duration-300 ease-linear`}><MdClose className="size-5 md:size-6 lg:size-7"/></button>
                  </Tooltip>

                  <Tooltip content="Approve Appointment?" animation="duration-500">
                    <button onClick={() => handleApproveAppointment()} className={`drop-shadow-md p-3 text-center rounded-full font-semibold bg-${selectedTheme}-300 text-${selectedTheme}-600 hover:bg-${selectedTheme}-400 hover:text-${selectedTheme}-700 active:bg-${selectedTheme}-700 active:text-${selectedTheme}-400 transition-colors duration-300 ease-linear`}><MdCheck className="size-5 md:size-6 lg:size-7"/></button>
                  </Tooltip>

                </div>
              </>
            )
          }
        </div>
      </dialog>
      <ConfirmForm confirmRef={confirmationRef} message={"Do you want to proceed with the changes?"} onConfirm={proceedUpdate} confirmMessage={"Update this record?"} onCancel={cancelUpdate} cancelMessage={"Cancel changes?"} onBack={goBack} backMessage={"Go back?"} />
    </>
  );
}
 
export default AppointmentOptions;