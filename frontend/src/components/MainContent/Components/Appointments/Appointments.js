import { useLocation } from "react-router-dom";
import { IoCalendar } from "react-icons/io5";
import { MdArrowDropDown } from "react-icons/md";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { colorTheme } from "../../../../App";
import Header from "../../Header";
import DataTable from "../Elements/DataTable";
import DatePicker from "./DatePicker";
import useQuery from "../../../../hooks/useQuery";
import AppointmentOptions from "./AppointmentOptions";

export const appointmentDate = createContext();

const Appointments = () => {
  const [selectedTheme] = useContext(colorTheme);
  const location = useLocation();
  const pathname = location.pathname.slice(1);
  const title = pathname.charAt(0).toUpperCase() + pathname.slice(1);
  const [PK, setPK] = useState(null);
  const appointmentOptionsRef = useRef(null);
  const [isAppointmentOptionsOpen, setIsAppointmentOptionsOpen] = useState(false);
  const datepickerRef = useRef(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [appointments, setAppointments] = useState([{}]);
  const [filteredAppointments, setFilteredAppointments] = useState([{}]);
  const { response, isLoading, error, fetchData } = useQuery();
  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const formatDateString = (value) => {
    return value < 10 ? '0' + value : '' + value;
  };
  const newStartDate = `${currentYear}-${formatDateString(currentMonth)}-0${currentDay}`;
  const newEndDate = `${currentYear}-${formatDateString(currentMonth)}-${daysInMonth}`;
  const [startDate, setStartDate] = useState(newStartDate);
  const [endDate, setEndDate] = useState(newEndDate);

  const toggleDate = () => {
    if (isDatePickerOpen) {
      setIsDatePickerOpen(false);
      datepickerRef.current.close();
    } else {
      setIsDatePickerOpen(true);
      datepickerRef.current.show();
    }
  };

  useEffect(() => {
    fetchData("getAppointments");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    return formattedDate;
  };

  useEffect(() => {
    const keyMap = {
      "appointment_id": "Number",
      "citizen_fullname": "Full Name",
      "phone_number": "Phone Number",
      "citizen_id": "Citizen ID",
      "appointed_datetime": "Appointed Time",
      "description": "Description",
      "status": "Status",
      "created_at": "Appointed At",
    };
    if(response && response.status === 200) {
      const newResponse = response.data.map(obj => {
        const newObj = {};
        Object.keys(obj).forEach(key => {
          if (keyMap[key]) {
            newObj[keyMap[key]] = obj[key];
          } else {
            newObj[key] = obj[key];
          }
        });
        return newObj;
      });
      sessionStorage.setItem("sessionAppointments", JSON.stringify(newResponse));
      const shortenedDesc = newResponse.map((res) => ({
        ...res,
        Description: `${res.Description.substring(0,20)}...`
      }));
      setAppointments(shortenedDesc);
    }
    if (error) {
      console.log(error);
    }
  }, [response, error]);
  
  const toggleAppointmentOption = (primaryKey) => {
    setPK(primaryKey);
    if (!isAppointmentOptionsOpen) {
      setIsAppointmentOptionsOpen(true);
      appointmentOptionsRef.current.showModal();
    } else {
      setIsAppointmentOptionsOpen(false);
      appointmentOptionsRef.current.close();
    }
  };

  useEffect(() => {
    setFilteredAppointments(appointments.filter(prev => {
      const SDate = new Date(startDate);
      const EDate = new Date(endDate);
      const ODate = new Date(prev["Appointed Time"]);
      return ODate >= SDate && ODate <= EDate && (prev["Status"] === "to be scheduled" || prev["Status"] === "scheduled");
    }))
  }, [startDate, endDate, appointments]);

  // ADD 2 MORE ELEMENTS TO THE COMPONENT - CUSTOM CALENDAR & UPCOMMING APPOINTMENTS
  
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-col p-2 mb-4 mx-2 md:mx-3 lg:mx-4 mt-4">
        <div>
          <Header title={ title } icon={<IoCalendar />}/>
        </div>
        <div className="min-h-screen h-screen overflow-y-auto scroll-smooth p-2 mt-2 pb-52">
          <div className="flex flex-col justify-start gap-3">
            <div className="place-self-end relative">
              <button onClick={() => toggleDate()} className={`flex justify-between items-center gap-2 p-2 rounded-md font-semibold bg-${selectedTheme}-300 text-${selectedTheme}-600 hover:bg-${selectedTheme}-400 hover:text-${selectedTheme}-700 active:bg-${selectedTheme}-700 active:text-${selectedTheme}-300 hover:scale-105 active:scale-95 transition-all duration-300 ease-linear text-xs md:text-sm lg:text-base`}>
                {getDate(startDate)}/{getDate(endDate)}
                <MdArrowDropDown className={`size-2 md:size-3 lg:size-4 ${isDatePickerOpen && `rotate-180`}`}/>
              </button>
              <div className="absolute top-full left-0 z-50 mt-2">
                <appointmentDate.Provider value={[ startDate, endDate, setStartDate, setEndDate ]}>
                  <DatePicker dateRef={datepickerRef} toggleDatePicker={toggleDate}/>
                </appointmentDate.Provider>
              </div>
            </div>
          
            <div className={`z-0 w-full`}>
              <DataTable data={filteredAppointments} modalForm={pathname} toggleOption={toggleAppointmentOption} enImport={false} enExport={false} isLoading={isLoading} error={error} optionPK={"Number"}/>
            </div>
          </div>
        </div>
      </div>
      <AppointmentOptions appointmentRef={appointmentOptionsRef} toggle={toggleAppointmentOption} PK={PK} />
    </div>
  );
}

export default Appointments;