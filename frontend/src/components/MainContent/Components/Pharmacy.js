import { useLocation } from "react-router-dom";
import Header from "../Header";
import DataTable from "./Elements/DataTable";
import { MdLocalPharmacy } from "react-icons/md";
import useQuery from "../../../hooks/useQuery";
import { useContext, useEffect, useRef, useState } from "react";
import useCurrentTime from "../../../hooks/useCurrentTime";
import * as XLSX from 'xlsx';
import { Checkbox, Spinner } from "flowbite-react";
import { colorTheme } from "../../../App";

const Pharmacy = () => {
  const [selectedTheme] = useContext(colorTheme);
  const location = useLocation();
  const pathname = location.pathname.slice(1);
  const title = pathname.charAt(0).toUpperCase() + pathname.slice(1);
  const { response, isLoading, error, fetchData, addData } = useQuery();
  const [medicines, setMedicines] = useState(null);
  
  const [data, setData] = useState(null);
  const fileRef = useRef(null);
  const { mysqlTime } = useCurrentTime();

  useEffect(() => {
    fetchData('getPharmacyInventory');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (response && response.status === 200) {
      setMedicines(response.data);
      console.log(response);
    }
    if (error) {
      console.log(error);
    }
  },[response, error]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });

      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          raw: false,
          dateNF: 'yyyy-mm-dd'
        });
        console.log(jsonData);
        setData(jsonData);
      });
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('SUBMITTED');
    const date_added = {};
    const payloadKey = String(mysqlTime);
    date_added[payloadKey] = "Date Added";
    const payload = {
      data,
      logs : date_added
    };
    console.log(payload);
    addData('submitCSVMedicinesRecord', payload);
    setData(null);
    fileRef.current.value = "";
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-col p-2 mt-20 md:mt-28 lg:mt-32 mb-4 mx-2 md:mx-3 lg:mx-4">
        <div>
          <Header title={ title } icon={<MdLocalPharmacy/>}/>
        </div>
        <div className="min-h-screen h-screen overflow-y-auto scroll-smooth p-2 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-60 md:mb-72 lg:mb-80">
            <div className="col-span-2 w-34 h-36 bg-gray-50 rounded-xl">
              <DataTable data={medicines} modalForm={pathname} isLoading={isLoading} error={error} />
              <>
                <form className="flex flex-col gap-4 m-5" onSubmit={handleSubmit}>
                  <div>
                    <div className="mb-2 block">
                      <label htmlFor="firstname" className='text-xs md:text-sm lg:text-base font-semibold'>First Name</label>
                    </div>
                    <input 
                      ref={fileRef}
                      type="file" 
                      required 
                      className={`text-xs md:text-sm lg:text-base shadow-md rounded-lg w-full bg-transparent border-[1px] border-${selectedTheme}-800`}
                      maxLength={50} 
                      id="xlsxfile" 
                      name='xlsxfile'
                      onChange={handleFileUpload}
                    />
                  </div>
                  <button disabled={isLoading} type="submit" className={`font-semibold p-2 rounded-md w-full transition-colors duration-200 ${!isLoading ? `text-${selectedTheme}-100 bg-${selectedTheme}-700 hover:drop-shadow-md hover:bg-${selectedTheme}-800 focus:bg-${selectedTheme}-600 active:bg-${selectedTheme}-300 active:text-${selectedTheme}-600 active:shadow-inner active:ring-2 active:ring-${selectedTheme}-600` : `text-${selectedTheme}-700 bg-${selectedTheme}-100 shadow-inner` }`}><p className="drop-shadow-lg">{!isLoading ? 'Add New Record' : <Spinner/>}</p></button>
                  <div className="flex items-center justify-end gap-2">
                    <Checkbox
                      id="accept"
                      // checked={dontCloseUponSubmission}
                      // onChange={() => setDontCloseUponSubmission((prev) => !prev)}
                    />
                    <label htmlFor="accept" className="flex text-xs md:text-sm lg:text-base font-semibold">
                      Don't Close Upon Submition
                    </label>
                  </div>
                </form>
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Pharmacy;