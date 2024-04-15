import { useLocation } from "react-router-dom";
import { IoCalendar } from "react-icons/io5";
import { MdArrowDropDown } from "react-icons/md";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { colorTheme } from "../../../../App";
import Header from "../../Header";
import DataTable from "../Elements/DataTable";
import DatePicker from "./DatePicker";

export const appointmentDate = createContext();

const Appointments = () => {
  const [selectedTheme] = useContext(colorTheme);
  const location = useLocation();
  const pathname = location.pathname.slice(1);
  const title = pathname.charAt(0).toUpperCase() + pathname.slice(1);
  const datepickerRef = useRef(null);
  const newAppointmentRef = useRef(null);
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const records = [
    {
      "First Name": "Zoe",
      "Middle Name": "X.",
      "Family Name": "Liu",
      "Family ID": "XYZ2023-1122",
      "Gender": "Female",
      "Barangay": "Astral"
    },
    {
      "First Name": "Mason",
      "Middle Name": "Y.",
      "Family Name": "Gomez",
      "Family ID": "LMN2022-3344",
      "Gender": "Male",
      "Barangay": "Celestial"
    },
    {
      "First Name": "Lily",
      "Middle Name": "Z.",
      "Family Name": "Fernandez",
      "Family ID": "ABC2021-5566",
      "Gender": "Female",
      "Barangay": "Supernova"
    },
    {
      "First Name": "Sophia",
      "Middle Name": "N.",
      "Family Name": "Martinez",
      "Family ID": "LMN2023-9876",
      "Gender": "Female",
      "Barangay": "Sunset"
    },
    {
      "First Name": "Oliver",
      "Middle Name": "O.",
      "Family Name": "Chen",
      "Family ID": "ABC2022-5432",
      "Gender": "Male",
      "Barangay": "Moonlight"
    },
    {
      "First Name": "Mia",
      "Middle Name": "P.",
      "Family Name": "Nguyen",
      "Family ID": "XYZ2021-7890",
      "Gender": "Female",
      "Barangay": "Starlight"
    },
    {
      "First Name": "Liam",
      "Middle Name": "Q.",
      "Family Name": "Gonzalez",
      "Family ID": "PQR2023-2468",
      "Gender": "Male",
      "Barangay": "Galaxy"
    },
    {
      "First Name": "Emma",
      "Middle Name": "R.",
      "Family Name": "Patel",
      "Family ID": "GHI2022-1357",
      "Gender": "Female",
      "Barangay": "Nebula"
    },
    {
      "First Name": "Noah",
      "Middle Name": "S.",
      "Family Name": "Kim",
      "Family ID": "JKL2021-1122",
      "Gender": "Male",
      "Barangay": "Cosmos"
    },
    {
      "First Name": "Ava",
      "Middle Name": "T.",
      "Family Name": "Singh",
      "Family ID": "UVW2023-8765",
      "Gender": "Female",
      "Barangay": "Stardust"
    },
    {
      "First Name": "William",
      "Middle Name": "U.",
      "Family Name": "Lopez",
      "Family ID": "OPQ2020-6543",
      "Gender": "Male",
      "Barangay": "Aurora"
    },
    {
      "First Name": "Sophie",
      "Middle Name": "V.",
      "Family Name": "Wang",
      "Family ID": "RST2022-1122",
      "Gender": "Female",
      "Barangay": "Orion"
    },
    {
      "First Name": "Ethan",
      "Middle Name": "W.",
      "Family Name": "Hernandez",
      "Family ID": "ABC2021-1122",
      "Gender": "Male",
      "Barangay": "Pegasus"
    },
    {
      "First Name": "Alice",
      "Middle Name": "C.",
      "Family Name": "Smith",
      "Family ID": "ABC2023-1234",
      "Gender": "Female",
      "Barangay": "Downtown"
    },
    {
      "First Name": "Bob",
      "Middle Name": "E.",
      "Family Name": "Johnson",
      "Family ID": "XYZ2022-5678",
      "Gender": "Male",
      "Barangay": "Uptown"
    },
    {
      "First Name": "Eva",
      "Middle Name": "F.",
      "Family Name": "Brown",
      "Family ID": "PQR2021-9876",
      "Gender": "Female",
      "Barangay": "Suburbia"
    },
    {
      "First Name": "David",
      "Middle Name": "G.",
      "Family Name": "Miller",
      "Family ID": "LMN2020-4321",
      "Gender": "Male",
      "Barangay": "Countryside"
    },
    {
      "First Name": "Grace",
      "Middle Name": "H.",
      "Family Name": "Anderson",
      "Family ID": "DEF2022-2468",
      "Gender": "Female",
      "Barangay": "Hilltop"
    },
    {
      "First Name": "Charlie",
      "Middle Name": "I.",
      "Family Name": "Davis",
      "Family ID": "JKL2021-1357",
      "Gender": "Male",
      "Barangay": "Valley"
    },
    {
      "First Name": "Emma",
      "Middle Name": "J.",
      "Family Name": "Wilson",
      "Family ID": "GHI2023-7890",
      "Gender": "Female",
      "Barangay": "Riverside"
    },
    {
      "First Name": "Frank",
      "Middle Name": "K.",
      "Family Name": "White",
      "Family ID": "UVW2020-8765",
      "Gender": "Male",
      "Barangay": "Seaside"
    },
    {
      "First Name": "Holly",
      "Middle Name": "L.",
      "Family Name": "Taylor",
      "Family ID": "OPQ2022-6543",
      "Gender": "Female",
      "Barangay": "Mountainside"
    },
    {
      "First Name": "Isaac",
      "Middle Name": "M.",
      "Family Name": "Lee",
      "Family ID": "RST2021-1122",
      "Gender": "Male",
      "Barangay": "Lakeside"
    }
  ];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const formatDateString = (value) => {
    return value < 10 ? '0' + value : '' + value;
  };
  const newStartDate = `${currentYear}-${formatDateString(currentMonth)}-01`;
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

  const toggleNewApp = () => {
    if (isNewAppointmentOpen) {
      setIsNewAppointmentOpen(false);
      newAppointmentRef.current.close();
    } else {
      setIsNewAppointmentOpen(true);
      newAppointmentRef.current.showModal();
    }
  }

  useEffect(() => {
    console.log("Start Date", startDate);
    console.log("End Date", endDate);
  }, [startDate, endDate]);

  // ADD 2 MORE ELEMENTS TO THE COMPONENT - CUSTOM CALENDAR & UPCOMMING APPOINTMENTS
  
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-col p-2 mt-20 md:mt-28 lg:mt-32 mb-4 mx-2 md:mx-3 lg:mx-4">
        <div>
          <Header title={ title } icon={<IoCalendar />}/>
        </div>
        <div className="min-h-screen h-screen overflow-y-auto scroll-smooth p-2 mt-2">
          <div className="flex flex-col justify-start items-center gap-3">

            <div className="place-self-end relative">
              <button onClick={() => toggleDate()} className={`flex justify-between items-center gap-2 p-2 rounded-md font-semibold bg-${selectedTheme}-300 text-${selectedTheme}-600 hover:bg-${selectedTheme}-400 hover:text-${selectedTheme}-700 active:bg-${selectedTheme}-700 active:text-${selectedTheme}-300 hover:scale-105 active:scale-95 transition-all duration-300 ease-linear`}>
                Apr/1/2024-Apr/31/2024
                <MdArrowDropDown className={`size-2 md:size-3 lg:size-4 ${isDatePickerOpen && `rotate-180`}`}/>
              </button>
              <div className="absolute top-full left-0 z-50 mt-2">
                <appointmentDate.Provider value={[ startDate, endDate, setStartDate, setEndDate ]}>
                  <DatePicker dateRef={datepickerRef} toggleDatePicker={toggleDate}/>
                </appointmentDate.Provider>
              </div>
            </div>
          
            <div className={`z-0 w-full`}>
              <DataTable data={records} modalForm={pathname} enImport={false} enExport={false} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointments;