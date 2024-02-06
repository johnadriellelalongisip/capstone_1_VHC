import { useLocation } from "react-router-dom";
import Header from "../Header";
import DataTable from "./Elements/DataTable";
import { MdLocalPharmacy } from "react-icons/md";

const Pharmacy = () => {
  const location = useLocation();
  const pathname = location.pathname.slice(1);
  const title = pathname.charAt(0).toUpperCase() + pathname.slice(1);
  const medicines = [
    {
      "End-User": "DOH",
      "Pro/Don Con. #": "PR NO. 4411-2023-02-004",
      "Source": "Provincial DOH Calapan",
      "Date Delivered": "03-10-2023",
      "Item Description": "Clozapine 100mg",
      "Exp Date": "11-10-2024",
      "Batch/Lot #": "B344JO15",
      "Quantity": "1,500",
      "Unit of Measure": "Table",
      "Unit Cost": "",
      "Remarks": ""
    }
  ];

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-col p-2 mt-20 md:mt-28 lg:mt-32 mb-4 mx-2 md:mx-3 lg:mx-4">
        <div>
          <Header title={ title } icon={<MdLocalPharmacy/>}/>
        </div>
        <div className="min-h-screen h-screen overflow-y-auto scroll-smooth p-2 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-60 md:mb-72 lg:mb-80">
            <div className="col-span-2 w-34 h-36 bg-sky-50 rounded-xl">
              <DataTable data={medicines} modalForm={pathname}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Pharmacy;