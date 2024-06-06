/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { MdClose, MdEdit, MdLocalPharmacy } from "react-icons/md";
import { colorTheme } from "../../../../App";
import useQuery from "../../../../hooks/useQuery";
import { Spinner } from "flowbite-react";

const PharmacyAudit = ({ recordAudit, toggle, itemId }) => {
  const [selectedTheme] = useContext(colorTheme);
  const [toEdit, setToEdit] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [initialFormData, setInitialFormData] = useState({});
  const { searchResults, setSearchResults, isLoading, error, searchData } = useQuery();
  const [formData, setFormData] = useState({
    item_name: "",
    unit_size: "",
    lot_no: "",
    exp_date: "",
    quantity_stockroom: ""
  });

  function isEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        if (!isEqual(obj1[key], obj2[key])) {
          return false;
        }
      } else if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    if (itemId) {
      searchData('searchPharmacyInventory', itemId);
    }
  }, [itemId]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  useEffect(() => {
    const haschanged = !isEqual(formData, initialFormData);
    setIsDirty(haschanged);
  }, [formData, toEdit]);

  useEffect(() => {
    if (searchResults) {
      setFormData((prev) => ({
        ...prev,
        item_name: searchResults.item_name ? searchResults.item_name : 'n/a',
        unit_size: searchResults.unit_size ? searchResults.unit_size : 'n/a',
        lot_no: searchResults.lot_no ? searchResults.lot_no : 'n/a',
        exp_date: searchResults.exp_date ? searchResults.exp_date : '2000-01-01',
        quantity_stockroom: searchResults.quantity_stockroom ? searchResults.quantity_stockroom : 'n/a'
      }));
      setInitialFormData((prev) => ({
        ...prev,
        item_name: searchResults.item_name ? searchResults.item_name : 'n/a',
        unit_size: searchResults.unit_size ? searchResults.unit_size : 'n/a',
        lot_no: searchResults.lot_no ? searchResults.lot_no : 'n/a',
        exp_date: searchResults.exp_date ? searchResults.exp_date : '2000-01-01',
        quantity_stockroom: searchResults.quantity_stockroom ? searchResults.quantity_stockroom : 'n/a'
      })); 
    }
  }, [searchResults]);

  const closeModal = () => {
    toggle();
    if (formData) {
      setFormData({
        item_name: "",
        unit_size: "",
        lot_no: "",
        exp_date: "",
        quantity_stockroom: ""
      });
    };
    setSearchResults(null);
    setToEdit(true);
  };
  const toggleEdit = () => {
    if (isDirty) {
      const confirmLeave = window.confirm("You have unsaved changes. Are you sure you want to leave?");
      if (confirmLeave) {
        setFormData((prev) => ({
          ...prev,
          item_name: searchResults.item_name ? searchResults.item_name : 'n/a',
          unit_size: searchResults.unit_size ? searchResults.unit_size : 'n/a',
          lot_no: searchResults.lot_no ? searchResults.lot_no : 'n/a',
          exp_date: searchResults.exp_date ? searchResults.exp_date : '2000-01-01',
          quantity_stockroom: searchResults.quantity_stockroom ? searchResults.quantity_stockroom : 'n/a'
        }));
        setInitialFormData((prev) => ({
          ...prev,
          item_name: searchResults.item_name ? searchResults.item_name : 'n/a',
          unit_size: searchResults.unit_size ? searchResults.unit_size : 'n/a',
          lot_no: searchResults.lot_no ? searchResults.lot_no : 'n/a',
          exp_date: searchResults.exp_date ? searchResults.exp_date : '2000-01-01',
          quantity_stockroom: searchResults.quantity_stockroom ? searchResults.quantity_stockroom : 'n/a'
        }));
        setToEdit(prev => !prev);
      } else {
        setToEdit(prev => !prev);
      }
    } else {
      setToEdit(prev => !prev);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    closeModal();
  };
  
  return (
    <dialog ref={recordAudit} className={`rounded-lg bg-gray-100 drop-shadow-lg w-80 md:w-[500px] lg:w-[600px]`}>
      <div className="flex flex-col text-xs md:text-sm lg:text-base">
        <div className={`flex justify-between items-center p-2 text-${selectedTheme}-600 border-b-[1px] border-solid border-${selectedTheme}-500 shadow-md shadow-${selectedTheme}-600 mb-2`}>
          <div className="flex items-center p-1 gap-1">
            <MdLocalPharmacy className='w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8' />
            <strong className="font-semibold drop-shadow-md text-sm md:text-base lg:text-lg">Product Audit</strong>
          </div>
          <button onClick={closeModal} className={`transition-colors duration-200 rounded-3xl p-1 bg-${selectedTheme}-300 hover:bg-${selectedTheme}-400 active:bg-${selectedTheme}-200`}>
            <MdClose className='w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />
          </button>
        </div>
        <div className="flex flex-col gap-3 h-[30rem] min-h-[30rem] overflow-y-auto">
          <div className="mx-5 my-2 flex items-center justify-between">
            <p className="font-bold text-sm md:text-base lg:text-lg">{!toEdit ? 'Edit Product' : 'View Product'}</p>
            <button className={`rounded-3xl p-2 transition-colors bg-${selectedTheme}-400 hover:bg-${selectedTheme}-600 hover:text-${selectedTheme}-100 focus:bg-${selectedTheme}-200 active:bg-${selectedTheme}-500`} onClick={toggleEdit}>
              <MdEdit className="size-4 md:size-5 lg:size-6"/>
            </button>
          </div>

          <form className={`flex flex-col gap-4 mx-5 my-2 font-semibold`} onSubmit={handleUpdate}>
            <div className="flex gap-3 items-center justify-start">
              <label htmlFor="item_name">Item Name:</label>
              <input required maxLength={50} type="text" name="item_name" id="item_name" placeholder={searchResults?.item_name} value={formData.item_name} onChange={handleChange} disabled={toEdit} className={`text-xs md:text-sm lg:text-base grow p-2 rounded-lg bg-${selectedTheme}-50 border-transparent focus:ring-0 focus:border-transparent ${toEdit ? `text-${selectedTheme}-300` : `text-${selectedTheme}-800`}`} />
            </div>
            <div className="flex flex-col md:flex-col lg:flex-row gap-4 items-start justify-between">
              <div className="flex gap-3 items-center justify-start w-full">
                <label htmlFor="unit_size">Unit/Size:</label>
                <input required maxLength={50} type="text" name="unit_size" id="unit_size" placeholder={searchResults?.unit_size} value={formData.unit_size} onChange={handleChange} disabled={toEdit} className={`grow text-xs md:text-sm lg:text-base p-2 rounded-lg bg-${selectedTheme}-50 border-transparent focus:ring-0 focus:border-transparent ${toEdit ? `text-${selectedTheme}-300` : `text-${selectedTheme}-800`}`} />
              </div>
              <div className="flex gap-3 items-center justify-start w-full">
                <label htmlFor="lot_no">Lot No.:</label>
                <input required maxLength={50} type="text" name="lot_no" id="lot_no" placeholder={searchResults?.lot_no} value={formData.lot_no} onChange={handleChange} disabled={toEdit} className={`grow text-xs md:text-sm lg:text-base p-2 rounded-lg bg-${selectedTheme}-50 border-transparent focus:ring-0 focus:border-transparent ${toEdit ? `text-${selectedTheme}-300` : `text-${selectedTheme}-800`}`} />
              </div>
            </div>
            <div className="flex gap-3 items-center justify-start">
              <label htmlFor="exp_date">Expiry Date:</label>
              <input required type="date" name="exp_date" id="exp_date" value={formData.exp_date} onChange={handleChange} disabled={toEdit} className={`grow text-cetext-xs md:text-sm lg:text-base p-2 rounded-lg bg-${selectedTheme}-50 border-transparent focus:ring-0 focus:border-transparent ${toEdit ? `text-${selectedTheme}-300` : `text-${selectedTheme}-800`}`} />
            </div>
            <div className="flex gap-3 items-center justify-start">
              <label htmlFor="quantity_stockroom">Quantity-Stockroom:</label>
              <input required maxLength={50} type="text" name="quantity_stockroom" id="quantity_stockroom" placeholder={searchResults?.quantity_stockroom} value={formData.quantity_stockroom} onChange={handleChange} disabled={toEdit} className={`grow text-cetext-xs md:text-sm lg:text-base p-2 rounded-lg bg-${selectedTheme}-50 border-transparent focus:ring-0 focus:border-transparent ${toEdit ? `text-${selectedTheme}-300` : `text-${selectedTheme}-800`}`} />
            </div>
            <button type="submit" className={`py-2 px-4 hover:shadow-md font-semibold rounded-lg transition-colors duration-200 ${formData.item_name && formData.lot_no && formData.unit_size && formData.exp_date && formData.quantity_stockroom ? `text-${selectedTheme}-100 bg-${selectedTheme}-600 hover:cursor-pointer shadow-sm` : `shadow-inner text-${selectedTheme}-100 bg-${selectedTheme}-400 hover:cursor-not-allowed`}`} disabled={toEdit}>{isLoading || error ? <Spinner /> : 'Submit Edit'}</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
 
export default PharmacyAudit;