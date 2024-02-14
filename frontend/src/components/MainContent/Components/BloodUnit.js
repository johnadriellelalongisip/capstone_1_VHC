import { useLocation } from "react-router-dom";
import Header from "../Header";
import DataTable from "./Elements/DataTable";
import { BiSolidDonateBlood } from "react-icons/bi";

const BloodUnit = () => {
  const location = useLocation();
  const pathname = location.pathname.slice(1);
  const title = pathname.charAt(0).toUpperCase() + pathname.slice(1);
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

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-col p-2 mt-20 md:mt-28 lg:mt-32 mb-4 mx-2 md:mx-3 lg:mx-4">
        <div>
          <Header title={ title } icon={ <BiSolidDonateBlood /> } />
        </div>
        <div className="min-h-screen h-screen overflow-y-auto scroll-smooth p-2 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-60 md:mb-72 lg:mb-80">
            <div className="col-span-2 w-34 h-36 bg-gray-50 rounded-xl">
              <DataTable data={records} modalForm={pathname}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default BloodUnit;