/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { colorTheme } from "../../../../App";
import { MdArrowRight, MdClose, MdPerson } from "react-icons/md";
import useQuery from "../../../../hooks/useQuery";
import { FaFilePrescription } from "react-icons/fa6";
import { Spinner } from "flowbite-react";
import useCurrentTime from "../../../../hooks/useCurrentTime";

const RecordAudit = ({ recordAudit, toggle, family_id }) => {
  const [selectedTheme] = useContext(colorTheme);
  const [record, setRecord] = useState(null);
  const [history, setHistory] = useState(null);
  const [formVisibility, setFormVisibility] = useState(false);
  const { mysqlTime } = useCurrentTime();
  const { searchResults, isLoading, error, searchData, editData } = useQuery();
  const [formData, setFormData] = useState({
    "Prescription Added" : {
      notes: '',
    }
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      "Prescription Added": {
        ...prevFormData["Prescription Added"],
        [name]: value
      }
    }));
  };

  useEffect(() => {
    if (family_id) {
      searchData(`findRecord`, family_id);
    }
  },[family_id]);

  useEffect(() => {
    if (searchResults) {
      setRecord([searchResults][0]);
      setHistory(JSON.parse(searchResults.citizen_history));
    } else if (error) {
      console.log(error);
    }
  },[error, searchResults]);

  const cleanUp = () => {
    setFormData({
      "Prescription Added" : {
        notes: '',
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const history = {};
    const JKey = String(mysqlTime);
    history[JKey] = formData;
    editData('addRecordHistory', history,  family_id);
    cleanUp();
  };
  
  return (
    <dialog ref={recordAudit}className={`rounded-lg bg-${selectedTheme}-100 drop-shadow-lg`}>
      <div className="flex flex-col text-xs md:text-sm lg:text-base w-72 md:w-80 lg:w-[500px]">
        <div className={`flex justify-between items-center p-2 text-${selectedTheme}-600 border-b-[1px] border-solid border-${selectedTheme}-500 shadow-md shadow-${selectedTheme}-600 mb-2`}>
          <div className="flex items-center p-1 gap-1">
            <MdPerson className='w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8' />
            <strong className="font-semibold drop-shadow-md">Health Assessment</strong>
          </div>
          <button onClick={() => {toggle(); setRecord(null); setHistory(null);}} className={`transition-colors duration-200 rounded-3xl p-1 bg-${selectedTheme}-300 hover:bg-${selectedTheme}-400 active:bg-${selectedTheme}-200`}>
            <MdClose className='w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />
          </button>
        </div>
        <div className="flex flex-col gap-3 h-[30rem] min-h-[30rem] overflow-y-auto">
          <div className={`flex gap-2 mx-5 my-2 text-${selectedTheme}-600 font-semibold`}>
            <p>
              Patient: 
            </p>
            <p >
              {
                !record ? (
                  <span className="drop-shadow-lg animate-pulse animate-infinite animate-duration-[800ms] animate-ease-linear font-bold">
                    { error ? String(error) : '. . . . . . . . .' }
                  </span>
                ) : (
                  <span className="underline underline-offset-4">
                    {record.citizen_firstname} <span>{record.citizen_middlename.charAt(0).toUpperCase()}.</span> {record.citizen_lastname} ({record.citizen_gender.charAt(0).toUpperCase() + record.citizen_gender.substring(1)})
                  </span>
                )
              }
            </p>
          </div>
          <div className="m-3 h-56 min-h-56 overflow-y-auto">
            {
              !formVisibility ? (
                <table className="font-table table-auto w-full text-sm text-slate-700">
                  <thead className={`text-${selectedTheme}-900 bg-${selectedTheme}-300 font-bold border-b-[1px] border-solid border-b-${selectedTheme}-700 drop-shadow-lg`}>
                    <tr className={`flex flex-row justify-between items-center text-xs md:text-sm lg:text-md`}>
                      <th className="w-full p-2 text-center flex justify-center items-center">Date</th>
                      <th className="w-full p-2 text-center flex justify-center items-center">Logs</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y-2 divide-transparent text-xs md:text-sm lg:text-md`}>
                  {
                    history ? (
                      Object.entries(history).map(([key, value], i) => (
                        <tr key={i}
                          className={`flex flex-row justify-between items-center text-center bg-${selectedTheme}-200 divide-x-2 divide-transparent`}
                        >
                          <td className={`w-full p-2 font-semibold whitespace-nowrap overflow-hidden hover:overflow-visible hover:bg-${selectedTheme}-50 hover:text-gray-900 hover:drop-shadow-md rounded-md transition-colors duration-300 hover:px-2`}>{key}</td>
                          <td  className={`w-full p-2 font-semibold whitespace-nowrap overflow-hidden hover:overflow-visible hover:bg-${selectedTheme}-50 hover:text-gray-900 hover:drop-shadow-md rounded-md transition-colors duration-300 hover:px-2`}>
                            {typeof(value) === 'object' ? (
                              Object.entries(value).map(([subKey, subValue], j) => (
                                <span key={j}>
                                  {
                                    typeof(subValue) === 'object' ? (
                                      Object.entries(subValue).map(([lastKey, lastValue], i) => (
                                        <button className="flex items-center">
                                          {subKey} <MdArrowRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"/>
                                        </button>
                                      ))
                                    ) : (
                                      <>
                                        {subValue}
                                      </>
                                    )
                                  }
                                </span>
                              ))
                            ) : (
                              <span key={i}>
                                {value}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      Array.from({ length: 10 }).map((_, i) => (
                        <tr key={i} className={`text-center flex flex-row justify-between items-center bg-${selectedTheme}-200 divide-x-2 divide-transparent`}>
                          <td className={`w-full p-2 font-semibold whitespace-nowrap overflow-hidden rounded-md bg-transparent`}>{i === 0 ? <span className="font-extrabold animate-pulse animate-infinite animate-ease-linear">L O A D I N G</span> : ' '}</td>
                        </tr>
                      ))
                    )
                  }
                  </tbody>
                </table>
              ):(
                <form onSubmit={handleSubmit} className={`flex flex-col gap-0 p-2 mx-5 my-2 border-2 border-solid border-${selectedTheme}-500 drop-shadow-lg shadow-md rounded-lg`}>
                  <p className={`text-${selectedTheme}-500 font-bold flex gap-1 mb-2`}>
                    <FaFilePrescription className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"/>
                    <span>Create new prescription</span>
                  </p>
                  <div className={`p-2`}>
                    <label htmlFor="notes" className={`block mb-2 text-${selectedTheme}-600 font-semibold`}>Additional Notes:</label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData["Prescription Added"].notes}
                      onChange={handleChange}
                      placeholder="Additional relevant instructions given to the patient's care. . . . ."
                      className="w-full rounded-lg text-xs md:text-sm lg:text-base"
                      rows={4}
                      maxLength={255}
                    />
                  </div>
                  <div className="flex justify-end items-center gap-2 mt-4">
                    <button onClick={(e) => { e.preventDefault(); toggle(); }} className={`py-2 px-4 hover:shadow-md font-semibold text-${selectedTheme}-600 rounded-lg hover:bg-${selectedTheme}-100 transition-colors duration-200`}>Cancel</button>
                    <button type="submit" className={`py-2 px-4 hover:shadow-md font-semibold rounded-lg transition-colors duration-200 ${formData["Prescription Added"].notes ? `text-${selectedTheme}-100 bg-${selectedTheme}-600 hover:cursor-pointer shadow-sm` : `shadow-inner text-${selectedTheme}-100 bg-${selectedTheme}-400 hover:cursor-not-allowed`}`} disabled={!formData["Prescription Added"].notes}>{isLoading || error ? <Spinner /> : 'Create Prescription'}</button>
                  </div>
                </form>
              )
            }
          </div>

          <button onClick={() => setFormVisibility(prev => !prev)} className={`m-1 p-2 block rounded-lg font-semibold text-${selectedTheme}-800 bg-${selectedTheme}-300 hover:bg-${selectedTheme}-400 active:bg-${selectedTheme}-600 active:text-${selectedTheme}-200 flex items-center justify-center`}>
              <span>Create new prescription</span>
          </button>
        </div>
      </div>
    </dialog>
  );
}
 
export default RecordAudit;