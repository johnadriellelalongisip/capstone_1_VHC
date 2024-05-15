import { useLocation } from "react-router-dom";
import { IoCalendar } from "react-icons/io5";
import { MdArrowDropDown, MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";
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
  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const formatDateString = (value) => {
    return value < 10 ? '0' + value : '' + value;
  };
  const newStartDate = `${currentYear}-${formatDateString(currentMonth)}-${currentDay.length === 1 ? `0${currentDay}` : currentDay}`;
  const newEndDate = `${currentYear}-${formatDateString(currentMonth)}-${daysInMonth}`;
  const [startDate, setStartDate] = useState(newStartDate);
  const [endDate, setEndDate] = useState(newEndDate);
  const { weeks } = useCurrentTime();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateFirstDayWeek, setSelectedDateFirstDayWeek] = useState(new Date(`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-01`).getDay()); 
  const selectedMonth = selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  
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
      // return ODate >= SDate && ODate <= EDate && (prev["Status"] === "to be scheduled" || prev["Status"] === "scheduled");
      return ODate >= SDate && ODate <= EDate;
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, appointments]);

  function getLastDayOfMonth(year, month) {
    const nextMonthFirstDay = new Date(year, month + 1, 1);
    const lastDayOfMonth = new Date(nextMonthFirstDay - 1);
    return lastDayOfMonth.getDate();
  }

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
      return appDate === compareDate && new Date(appDate) >= new Date(`${new Date().getMonth() + 1}-${new Date().getDate()}-${new Date().getFullYear()}`) && prev["Status"] === "scheduled";
    }));
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-col p-2 mb-4 mx-2 md:mx-3 lg:mx-4 mt-4">
        <div onClick={() => socket.emit("updateAppointment")}>
          <Header title={ title } icon={<IoCalendar />}/>
        </div>
        <div className="min-h-screen h-screen overflow-y-auto scroll-smooth p-2 mt-2 pb-52">
          <div className="flex flex-col justify-start gap-3">

            <div className="flex flex-col md:flex-col lg:flex-row justify-between items-center gap-3 text-xs md:text-sm lg:text-base rounded-lg">

              <div className={`w-full flex flex-col justify-start items-center gap-1 basis-1/2 p-2 bg-${selectedTheme}-400 rounded-lg drop-shadow-md`}>
                <p className={`font-semibold text-sm md:text-base lg:text-lg text-${selectedTheme}-800`}>Upcoming Appointments</p>
                <div className={`flex justify-around w-full font-bold text-xs md:text-sm lg:text-base border-b-[1px] border-${selectedTheme}-600`}>
                  <p>Date</p>
                  <p>Time</p>
                  <p>Appointee</p>
                </div>
                <div className="min-h-[40vh] max-h-[40vh] overflow-y-auto w-full">
                  <div className="flex flex-col gap-2 justify-center items-center">
                    {upcomingAppointments.length ? (upcomingAppointments.map((app, i) => (
                      <div key={i} className={`flex justify-around w-full font-medium text-xs md:text-sm lg:text-base bg-gray-300 rounded-md py-1`}>
                        <p>{
                          `${new Date(app["Appointed Time"]).getMonth() + 1}-${new Date(app["Appointed Time"]).getDate()}-${new Date(app["Appointed Time"]).getFullYear()}`
                        }</p>
                        <p>{
                          `${((new Date(app["Appointed Time"]).getHours() + 11) % 12 + 1)}:${(new Date(app["Appointed Time"]).getMinutes() < 10 ? '0' : '') + new Date(app["Appointed Time"]).getMinutes()} ${new Date(app["Appointed Time"]).getHours() < 12 ? 'AM' : 'PM'}`
                        }</p>
                        <p>{
                          `${app["Full Name"]}`
                        }</p>
                      </div>
                    ))) : (
                      <div className={`flex flex-col justify-center items-center text-center font-bold text-${selectedTheme}-600`}>
                        <p>No one's appointed at this date or you selected a date that has already passed.</p>
                        <p>Select a date on the calendar. . .</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={`w-full h-full grow md:grow lg:basis-1/2 flex flex-col gap-1 p-2 bg-${selectedTheme}-400 rounded-lg drop-shadow-md`}>
                <div className={`flex justify-between items-center text-${selectedTheme}-800 text-center text-sm md:text-base lg:text-lg font-semibold`}>
                  <button onClick={() => changeDate("back")}>
                    <MdOutlineArrowLeft className="size-7 md:size-8 lg:size-9"/>
                  </button>
                <p>{selectedMonth}</p>
                  <button onClick={() => changeDate("forward")}>
                    <MdOutlineArrowRight className="size-7 md:size-8 lg:size-9"/>
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {weeks.map((w, i) => (
                    <p className="text-center font-medium" key={i}>{w.substring(0,3)}</p>
                  ))}
                </div>
                <div className="w-full grid grid-cols-7 divide-x-[1px] divide-y-[1px] gap-1 px-1 md:px-[0.25rem] lg:px-2 m-1">
                  {Array.from({ length: selectedDateFirstDayWeek }).map((_, index) => (
                    <div key={index} className={`sm:text-[2vw] md:text-[1.5vw] lg::text-[1.5vw] flex justify-start items-start h-[5vw] bg-${selectedTheme}-300 rounded-sm`}> </div>
                  ))}
                  {Array.from({ length: getLastDayOfMonth(selectedDate.getFullYear(), selectedDate.getMonth()) }).map((_, index) => (
                    <button 
                      onClick={() => selectedDateUpcoming(`${selectedDate.getMonth() + 1}-${index + 1}-${selectedDate.getFullYear()}`)} 
                      key={index} 
                      className={`border-0 sm:text-[2vw] md:text-[1.5vw] lg::text-[1.5vw] flex justify-start items-start h-[5vw] bg-${selectedTheme}-200 rounded-sm`}
                    >
                      <p>{index + 1}</p>
                    </button>
                  ))}
                </div>
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