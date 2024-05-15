import { useLocation } from "react-router-dom";
import Header from "../../Header";
import DataTable from "../Elements/DataTable";
import { MdFolder } from "react-icons/md";
import useQuery from "../../../../hooks/useQuery";
import { useContext, useRef, useState } from "react";
import RecordAudit from "./RecordAudit";
import useSocket from "../../../../hooks/useSocket";
import { socket } from "../../../../socket";
import { colorTheme } from "../../../../App";

const Records = () => {
  const location = useLocation();
  const pathname = location.pathname.slice(1);
  const title = pathname.charAt(0).toUpperCase() + pathname.slice(1);
  const recordAuditRef = useRef(null);
  const [isRecordAuditOpen, setIsRecordAuditOpen] = useState(false);
  const [famID, setFamID] = useState(null);
  
  const { isLoading, error } = useQuery();
  const [selectedTheme] = useContext(colorTheme);
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

  const { data: records } = useSocket({ SSName: "sessionRecords", keyMap: keyMap, fetchUrl: "getRecords", socketEmit: "updateRecords", socketUrl: "newRecords", socketError: "newRecordsError" })

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
        <div onClick={() => socket.emit("updateRecords")}>
          <Header title={ title } icon={ <MdFolder /> }/>
        </div>
        <div className="min-h-screen h-screen overflow-y-auto scroll-smooth p-2 mt-2 mb-52">
          <DataTable data={records} modalForm={pathname} isLoading={isLoading} toggleOption={toggleOptions} optionPK={"Family-ID"} error={error} enImport={false} />
        </div>
      </div>
      <RecordAudit recordAudit={recordAuditRef} toggle={toggleOptions} family_id={famID} />
    </div>
  );
}

export default Records;