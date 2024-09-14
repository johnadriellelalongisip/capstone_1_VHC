import { useLocation } from "react-router-dom";
import Header from "../../Header";
import DataTable from "../Elements/DataTable";
import { MdLocalPharmacy } from "react-icons/md";
import useQuery from "../../../../hooks/useQuery";
import { useRef, useState } from "react";
import PharmacyAudit from "./PharmacyAudit";
import useSocket from "../../../../hooks/useSocket";

const Pharmacy = () => {
  const location = useLocation();
  const pathname = location.pathname.slice(1);
  const title = pathname.charAt(0).toUpperCase() + pathname.slice(1);
  const [isProductAuditOpen, setIsProductAuditOpen] = useState(false);
  const productAuditRef = useRef(null);
  const [itemId, setItemId] = useState(null);
  const { isLoading, error } = useQuery();
  const keyMap = {
    "item_id": "ItemID",
    "item_name": "ItemName",
    "unit_size": "Unit",
    "lot_no": "LotNO",
    "exp_date": "Expiry",
    "quantity_stockroom": "Quantity",
    "item_logs": "Logs"
  };

  const { data: medicines, loading } = useSocket({ SSName: "sessionPharmacy", keyMap: keyMap, fetchUrl: "getPharmacyInventory", socketEmit: "updatePharmacy", socketUrl: "newPharmacy", socketError: "newPharmacyError" })

  const toggleOptions = (itemId) => {
    setItemId(itemId);
    if (!isProductAuditOpen) {
      setIsProductAuditOpen(true);
      productAuditRef.current.showModal();
    } else {
      setIsProductAuditOpen(false);
      productAuditRef.current.close();
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-col p-2 mb-4 mx-2 md:mx-3 lg:mx-4 mt-4">
        <div>
          <Header title={ title } icon={<MdLocalPharmacy/>}/>
        </div>
        <div className="min-h-screen h-screen overflow-y-auto scroll-smooth p-2 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-60 md:mb-72 lg:mb-80">
            <div className="col-span-2 w-34 h-36 bg-gray-50 rounded-xl">
              <DataTable data={medicines} modalForm={pathname} isLoading={loading || isLoading} toggleOption={toggleOptions} error={error} enImport={true} importName="pharmacyImport" importUrlDestination={"submitCSVMedicinesRecord"} />
            </div>
          </div>
        </div>
      </div>
      <PharmacyAudit recordAudit={productAuditRef} toggle={toggleOptions} itemId={itemId} />
    </div>
  );
}
 
export default Pharmacy;