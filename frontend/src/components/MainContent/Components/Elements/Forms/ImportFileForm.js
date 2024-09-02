import { Checkbox, Spinner } from 'flowbite-react';
import { useContext, useRef, useState } from 'react';
import { colorTheme } from '../../../../../App';
import useQuery from '../../../../../hooks/useQuery';
import * as XLSX from 'xlsx';
import useCurrentTime from '../../../../../hooks/useCurrentTime';

const ImportFileForm = ({ close, children, url }) => {
  const [selectedTheme] = useContext(colorTheme);
  const { isLoading, error, addData } = useQuery();
  const [data, setData] = useState(null);
  const fileRef = useRef(null);
  const { mysqlTime } = useCurrentTime();

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
    addData(url, payload);
    setData(null);
    close();
    fileRef.current.value = "";
  }
  
  return (
    <>
    {children}
      <form className="flex flex-col gap-4 m-5 mt-20 md:mt-24 lg:mt-24" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <label htmlFor="firstname" className='text-xs md:text-sm lg:text-base font-semibold'>Excel File:</label>
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
  );
}

export default ImportFileForm;
