import { useLocation } from "react-router-dom";
import { IoCalendar } from "react-icons/io5";
import { MdArrowDropDown, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { colorTheme } from "../../../../App";
import Header from "../../Header";
import DataTable from "../Elements/DataTable";
import DatePicker from "./DatePicker";
import useQuery from "../../../../hooks/useQuery";
import AppointmentOptions from "./AppointmentOptions";
import useSocket from "../../../../hooks/useSocket";
import { socket } from "../../../../socket";
import useCurrentTime from "../../../../hooks/useCurrentTime";
import { jwtDecode } from "jwt-decode";
import { Tooltip } from "flowbite-react";
import useIndexedDB from "../../../../hooks/useIndexedDb";

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
  const [filteredAppointments, setFilteredAppointments] = useState([{}]);
  const { isLoading, error } = useQuery();
  const { startDate:newStartDate, endDate:newEndDate } = useCurrentTime();
  const [startDate, setStartDate] = useState(newStartDate);
  const [endDate, setEndDate] = useState(newEndDate);
  const { weeks } = useCurrentTime();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateFirstDayWeek, setSelectedDateFirstDayWeek] = useState(new Date(`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-01`).getDay()); 
  const selectedMonth = selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  // eslint-disable-next-line no-unused-vars
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [scheduledAppointments, setScheduledAppointments] = useState([]);
  const { getAllItems } = useIndexedDB();
  const appointedDayRef = useRef(null);
  const [isAppDayOpen, setIsAppDayOpen] = useState(false);
  const [role, setRole] = useState('staff');

  useEffect(() => {
    const setToken = async () => {
      const token = await getAllItems('tokens');
      setRole(jwtDecode(token?.accessToken).role);
    }
    setToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const keyMap = {
    "appointment_id": "Number",
    "full_name": "Full Name",
    "citizen_number": "Phone Number",
    "status": "Status",
    "created_at": "Created At",
    "appointed_datetime": "Appointed Time",
  };

  const { data: appointments } = useSocket({ SSName: "sessionAppointments", keyMap: keyMap, fetchUrl: "getAppointments", socketUrl: "newAppointments", socketEmit: "updateAppointment", socketError: "newAppointmentsError" })
  
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

  const toggleDate = () => {
    if (isDatePickerOpen) {
      setIsDatePickerOpen(false);
      datepickerRef.current.close();
    } else {
      setIsDatePickerOpen(true);
      datepickerRef.current.show();
    }
  };

  const getDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    return formattedDate;
  };

  useEffect(() => {
    selectedDateUpcoming(`${new Date().getMonth() + 1}-${new Date().getDate()}-${new Date().getFullYear()}`);
    setFilteredAppointments(appointments?.filter(prev => {
      const SDate = new Date(startDate);
      const EDate = new Date(endDate);
      const ODate = new Date(prev["Appointed Time"]);
      return ODate >= SDate && ODate <= EDate;
    }));
    setScheduledAppointments(appointments.filter(prev => {
      return prev["Status"] === 'scheduled';
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, appointments]);

  function getLastDayOfMonth(year, month) {
    const nextMonthFirstDay = new Date(year, month + 1, 1);
    const lastDayOfMonth = new Date(nextMonthFirstDay - 1);
    return lastDayOfMonth.getDate();
  }
  
  const formatDatePart = (part) => part.toString().padStart(2, '0');
  const appointmentCounts = Array.from({ length: getLastDayOfMonth(selectedDate.getFullYear(), selectedDate.getMonth()) }).map((_, index) => {
      let count = 0;
      const currentDate = `${formatDatePart(selectedDate.getMonth() + 1)}-${formatDatePart(index + 1)}-${selectedDate.getFullYear()}`;
      scheduledAppointments.forEach((app) => {
          const appTime = app["Appointed Time"].split(" ");
          const appDate = new Date(appTime[0]);
          const formattedAppDate = `${formatDatePart(appDate.getMonth() + 1)}-${formatDatePart(appDate.getDate())}-${appDate.getFullYear()}`;
          if (formattedAppDate === currentDate) {
              count++;
          }
      });
      return count;
  });

  const changeDate = (direction) => {
    const newDate = new Date(selectedDate);
    if (direction === 'back') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (direction === 'forward') {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setSelectedDate(newDate);
    const monthName = newDate.toLocaleString('default', { month: 'long' });
    const monthYear = newDate.toLocaleString('default', { year: 'numeric' });
    const firstDayOfMonth = new Date(`${monthName} 1, ${monthYear}`);
    setSelectedDateFirstDayWeek(firstDayOfMonth.getDay());
  };

  const selectedDateUpcoming = (date) => {
    setUpcomingAppointments(appointments.filter(prev => {
      const appointedDateTime = prev["Appointed Time"];
      const month = new Date(appointedDateTime).getMonth() + 1;
      const day = new Date(appointedDateTime).getDate();
      const year = new Date(appointedDateTime).getFullYear();
      const appDate = `${month}-${day}-${year}`;
      const inputDate = new Date(date);
      const Imonth = inputDate.getMonth() + 1;
      const Iday = inputDate.getDate();
      const Iyear = inputDate.getFullYear();
      const compareDate = `${Imonth}-${Iday}-${Iyear}`;
      return appDate === compareDate && prev['Status'] === 'scheduled';
    }));
  };

  const openAppointedDayRef = () => {
    if (!isAppDayOpen) {
      setIsAppDayOpen(true);
      appointedDayRef.current.show();
    } else {
      setIsAppDayOpen(false);
      appointedDayRef.current.close();
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-col p-2 mb-4 mx-2 md:mx-3 lg:mx-4 mt-4">
        <div onClick={() => socket.emit("updateAppointment")}>
          <Header title={ title } icon={<IoCalendar />}/>
        </div>
        <div className="min-h-screen h-screen overflow-y-auto scroll-smooth p-2 mt-2 pb-52">
          <div className="flex flex-col justify-start gap-3">

            <div className={`flex flex-col bg-${selectedTheme}-50 rounded-md drop-shadow-md text-xs md:text-sm lg:text-base w-full h-auto`}>

              <div className={`flex gap-2 md:gap-0 lg:gap-0 justify-between items-center p-3 border-b-[1px] border-${selectedTheme}-500 shadow-md`}>
                <div className={`flex divide-x-[1px] bg-${selectedTheme}-800 rounded-md drop-shadow-md text-base md:text-lg lg:text-3xl`}>
                  <button onClick={() => changeDate('back')}><MdOutlineKeyboardArrowLeft className={`p-1 md:p-1 lg:p-2 size-7 md:size-8 lg:size-9 text-${selectedTheme}-100`}/></button>
                </div>

                <p className={`font-bold text-base md:text-lg lg:text-xl text-${selectedTheme}-800`}>{selectedMonth}</p>

                <div className={`flex divide-x-[1px] bg-${selectedTheme}-800 rounded-md drop-shadow-md text-base md:text-lg lg:text-3xl`}>
                  <button onClick={() => changeDate('forward')}><MdOutlineKeyboardArrowRight className={`p-1 md:p-1 lg:p-2 size-7 md:size-8 lg:size-9 text-${selectedTheme}-100`}/></button>
                </div>
              </div>

              <div className={`grid grid-cols-7 text-xs md:text-sm lg:text-base font-semibold divide-x-[1px] divide-y-[1px] divide-${selectedTheme}-800`}>
                {weeks.map((day, i) => {
                  const windowWidth = window.innerWidth * 0.009;
                  return (
                  <div key={i} className={`p-1`}>
                    <p>{windowWidth <= 4 ? day.substring(0,3) : day}</p>
                  </div>
                )})}
                {Array.from({ length: selectedDateFirstDayWeek }).map((_, index) => (
                  <div key={index} className="h-auto w-full" > </div>
                ))}
                {Array.from({ length: getLastDayOfMonth(selectedDate.getFullYear(), selectedDate.getMonth()) }).map((_, index) => {
                  const count = appointmentCounts[index];
                  const circleColor = count > 3 ? 'red' : count > 0 ? 'blue' : 'green';

                  return (
                    <div key={index} className="h-16 md:h-18 lg:h-auto w-full">
                      <p className="justify-self-start p-1 text-xxs md:text-xs lg:text-sm">
                          {index + 1}
                      </p>
                      <div className={`hidden md:hidden lg:block min-h-16 max-h-16 overflow-y-auto m-2 p-1 overflow-x-hidden`}>
                        {scheduledAppointments.map((app, i) => {  
                          const dateTime = new Date(app["Appointed Time"]);
                          let hour = dateTime.getHours().toString() % 12 || 12;
                          const minute = dateTime.getMinutes().toString().padStart(2, '0');
                          const meridian = hour % 2 ? 'pm' : 'am';
                          const time = `${String(hour).padStart(2, '0')}:${minute} ${meridian}`;
                          const date = `${formatDatePart(dateTime.getMonth() + 1)}-${formatDatePart(dateTime.getDate())}-${dateTime.getFullYear()}`;
                          const currentDate = `${formatDatePart(selectedDate.getMonth() + 1)}-${formatDatePart(index + 1)}-${selectedDate.getFullYear()}`;
                          return (
                            <p key={i} className={`px-1 bg-${selectedTheme}-800 text-${selectedTheme}-200 rounded-md text-xxs md:text-sm lg:text-base font-thin text-nowrap mb-1`}>
                              {date === currentDate && `${time} - ${app["Full Name"]}`}
                            </p>
                          );
                        })}
                      </div>
                      <div className="relative flex items-center justify-center">
                        <button onClick={() => openAppointedDayRef()} className={`lg:hidden p-1`}>
                          {count > 0 && (
                            <Tooltip content={`${count} appointments`} animation="duration-500">
                              <p className={`blur-sm bg-${circleColor}-500 rounded-full border-[1px] border-${circleColor}-800 size-7 flex justify-center items-center text-xxs md:textxs lg:text-sm`}><span>{count >= 2 && count}</span></p>
                            </Tooltip>
                          )}
                        </button>
                        <dialog ref={appointedDayRef} className={`bottom-0 mt-1 right-0 bg-${selectedTheme}-200 drop-shadow-md rounded-md p-1`}>
                          {/* Your dialog content */}
                        </dialog>
                      </div>
                    </div>
                  );
                })}
              </div>
              
            </div>

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
              <DataTable data={filteredAppointments} enAdd={role && role !== 'user'} enOptions={role && role !== 'user'} modalForm={pathname} toggleOption={toggleAppointmentOption} enImport={false} enExport={false} isLoading={isLoading} error={error} optionPK={"Number"}/>
            </div>
          </div>
        </div>
      </div>
      <AppointmentOptions appointmentRef={appointmentOptionsRef} toggle={toggleAppointmentOption} PK={PK} />
    </div>
  );
}

export default Appointments;