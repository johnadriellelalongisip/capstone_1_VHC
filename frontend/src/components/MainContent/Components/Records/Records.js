import { useLocation } from "react-router-dom";
import Header from "../../Header";
import DataTable from "../Elements/DataTable";
import { MdFolder } from "react-icons/md";
import useQuery from "../../../../hooks/useQuery";
import { useEffect, useRef, useState } from "react";
import RecordAudit from "./RecordAudit";
import { socket } from "../../../../socket";

const Records = () => {
  const [records, setRecords] = useState([{}]);
  const location = useLocation();
  const pathname = location.pathname.slice(1);
  const title = pathname.charAt(0).toUpperCase() + pathname.slice(1);
  const recordAuditRef = useRef(null);
  const [isRecordAuditOpen, setIsRecordAuditOpen] = useState(false);
  const [famID, setFamID] = useState(null);
  
  const { response, isLoading, error, fetchData } = useQuery();
  const keyMap = {
    "citizen_family_id": "Family-ID",
    "citizen_firstname": "Firstname",
    "citizen_middlename": "Middlename",
    "citizen_lastname": "Lastname",
    "citizen_gender": "Gender",
    "citizen_birthdate": "Birthdate",
    "citizen_barangay": "Barangay",
    "citizen_number": "Number"
  };
  
  function tryThisShet(data) {
    const sesStorage = JSON.parse(sessionStorage.getItem("sessionRecords"));
    if(sesStorage !== data || sesStorage === null) {
      const newData = data.map(obj => {
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
      sessionStorage.setItem("sessionRecords",newData);
    } else {
      setRecords(sessionStorage.getItem("sessionRecords"));
    }
  }

  useEffect(() => {
    fetchData("getRecords");
    socket.on('newRecords', (data) => {
      tryThisShet(data);
    });
    socket.on('newRecordsError', (error) => {
      console.error('Error retrieving new records:', error);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  // useEffect(() => {
  //   const sesStorage = JSON.parse(sessionStorage.getItem("sessionRecords"));
  //   setRecords(sesStorage);
  // }, [socket]);

  useEffect(() => {
    if (response && response.status === 200) {
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
      setRecords(newResponse);
      sessionStorage.setItem("sessionRecords",JSON.stringify(newResponse));
    }
    if (error) {
      console.log(error);
    }
  }, [response,error]);

  const toggleOptions = (familyId) => {
    setFamID(familyId);
    if (!isRecordAuditOpen) {
      setIsRecordAuditOpen(true);
      recordAuditRef.current.showModal();
    } else {
      setIsRecordAuditOpen(false);
      recordAuditRef.current.close();
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-col p-2 mb-4 mx-2 md:mx-3 lg:mx-4 mt-4">
        <div>
          <Header title={ title } icon={ <MdFolder /> }/>
        </div>
        <div className="min-h-screen h-screen overflow-y-auto scroll-smooth p-2 mt-2 mb-52">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-60 md:mb-72 lg:mb-80">
            <div className="col-span-2 w-34 h-36 bg-gray-50 rounded-xl">
              <DataTable data={records} modalForm={pathname} isLoading={isLoading} toggleOption={toggleOptions} optionPK={"Family-ID"} error={error} enImport={false} />
            </div>
          </div>
        </div>
      </div>
      <RecordAudit recordAudit={recordAuditRef} toggle={toggleOptions} family_id={famID} />
    </div>
  );
}
 
export default Records;