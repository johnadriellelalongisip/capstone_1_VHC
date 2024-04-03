import { TextInput } from "flowbite-react";
import { useContext, useEffect, useRef, useState } from "react";
import { MdSearch, MdOutlineChevronLeft, MdOutlineChevronRight, MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight, MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import FormModal from "./FormModal";
import { colorTheme } from "../../../../App";

const DataTable = ({ data, modalForm, isLoading, toggleOption, error }) => {
  const [selectedTheme] = useContext(colorTheme);

  const [move, setMove] = useState(false);
  const [query, setQuery] = useState('');
  const [CurrentPage, setCurrentPage] = useState(1);
  const [Pages, setPages] = useState(0);
  const [sortedData, setSortedData] = useState([]);
  const inputRef = useRef(null);
  const formModalRef = useRef(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [sortState, setSortState] = useState(
    data && Object.keys(data[0]).reduce((acc, field) => {
      acc[field] = false;
      return acc;
    }, {})
  );

  useEffect(() => {
    if (data && !isLoading) {
      setSortedData(data);
    }
  }, [data, isLoading]);

  const setSearchFocus = () => {
    if(!move){
      const onAnimEnd = setTimeout(() => {
        inputRef.current.focus();
      }, 500);
      return () => {
        clearTimeout(onAnimEnd);
      };
    }
  }
  const searchTable = (e) => {
    setQuery(e.target.value);
    setCurrentPage(1);
  }
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'KeyK' && event.ctrlKey) {
        event.preventDefault();
        setQuery('');
        setMove((prev) => !prev);
        setSearchFocus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortedRecord = (column, order) => {
    return data.slice().sort((a, b) => {
      const valA = (a[column] ? a[column].toString().toLowerCase() : '');
      const valB = (b[column] ? b[column].toString().toLowerCase() : '');
  
      if (order === 'asc') {
        return valA.localeCompare(valB);
      } else {
        return valB.localeCompare(valA);
      }
    });
  };
  
  const handleSorting = (field) => {
    setSortState((prev) => {
      const newState = {};
      for (const key in prev) {
        newState[key] = false;
      }
      newState[field] = !prev[field];
      return newState;
    });
    const order = sortState[field] ? 'desc' : 'asc';
    setSortedData(sortedRecord(field, order));
  };  

  const Header = ({ top }) => (
    <tr className={`flex flex-row justify-between items-center bg-${selectedTheme}-300 text-xs md:text-sm lg:text-md ${
      top ? 'rounded-tl-lg rounded-tr-lg' : 'rounded-bl-lg rounded-br-lg'
    }`}>
      {
        data && isLoading ? (
          <th className="w-full p-2 text-center flex justify-center items-center animate-pulse animate-infinite animate-duration-500 animate-ease-linear">{top ? 'Loading Table' : ' '}</th>
        ) : (
          Object.keys(data[0]).map((field, fieldi) => (
            <th key={fieldi} className="w-full p-2 text-center flex justify-center items-center">
              <button
                onClick={() => handleSorting(field)}
                className="flex flex-row justify-center items-center"
              >
                <p>{field}</p>
                {top && (
                  <p>
                    <MdArrowDropUp className={`w-6 h-6 text-${selectedTheme}-600 ${sortState[field] ? 'rotate-180' : ''}`} />
                  </p>
                )}
              </button>
            </th>
          ))
        )
      }
      {
        top ? (
          <>
            {error && <th className="w-full p-2 text-center flex justify-center items-center">{error}</th>}
            {!isLoading && !error && <th className="w-full p-2 text-center flex justify-center items-center">{!isLoading && 'Actions'}</th>}
          </>
        ) : (
          <>
            {!isLoading && <th className="w-full p-2 text-center flex justify-center items-center"> </th>}
          </>
        )
      }
    </tr>
  );

  const filteredData = sortedData.filter((row) =>
    Object.values(row).some((col) =>
      typeof(col) === 'string' &&
      col.match(/[a-zA-Z]/) &&
      col.toString().toLowerCase().includes(query.toLowerCase()) &&
      col.toString().toLowerCase().startsWith(query.toLowerCase())
    )
  );

  useEffect(() => {
    const NumOfPages = Math.ceil(filteredData.length / 10);
    setPages(NumOfPages);
  }, [query,filteredData]);

  const toggleForm = () => {
    if (!isFormOpen) {
      formModalRef.current.showModal();
      setIsFormOpen(true);
    } else {
      formModalRef.current.close();
      setIsFormOpen(false);
    }
  }

  const displayedData = filteredData.slice((CurrentPage - 1) * 10, CurrentPage * 10);
  
  return (
    <>
      <div className="flex justify-between items-center p-4 overflow-hidden">
        <div className="flex justify-center items-center gap-3">
          <button 
            className={`text-xs md:text-sm lg:text-sm whitespace-nowrap font-semibold ${!isLoading && !error ? `text-${selectedTheme}-50 bg-${selectedTheme}-600 drop-shadow-md` : `text-${selectedTheme}-600 bg-${selectedTheme}-200 shadow-inner`} rounded-lg p-2`}
            onClick={() => toggleForm()}
            disabled={isLoading || error}
          >
            Import File
          </button>
          <button 
            className={`text-xs md:text-sm lg:text-sm whitespace-nowrap font-semibold ${!isLoading && !error ? `text-${selectedTheme}-50 bg-${selectedTheme}-600 drop-shadow-md` : `text-${selectedTheme}-600 bg-${selectedTheme}-200 shadow-inner`} rounded-lg p-2`}
            onClick={() => toggleForm()}
            disabled={isLoading || error}
          >
            Add New Data
          </button>
        </div>
        <div 
          className={`flex`}
        >
          <button
            onClick={() => {
              setMove((prevMove) => !prevMove); 
              setQuery(''); 
              setSearchFocus();
            }}
            className={`text-${selectedTheme}-500 hover:text-${selectedTheme}-600 mr-4 md:mr-2 lg:mr-2 ${
              move
                ? 'transition-transform ease-in-out duration-200 translate-x-0'
                : 'transition-transform ease-in-out duration-200 translate-x-[9rem] md:translate-x-[198px] lg:translate-x-[200px]'
            }`}
          >
            <MdSearch className="w-6 h-6" />
          </button>
          <TextInput
            id="tablesearch"
            ref={inputRef}
            type="text"
            placeholder="Search here"
            value={query}
            onChange={(e) => searchTable(e)}
            className={`${
              move ? 'transition-opacity duration-100 ease-linear opacity-1 translate-x-0' : 
              'transition-opacity duration-100 ease-linear opacity-0 translate-x-[9rem] md:translate-x-[198px] lg:translate-x-[200px]'}`}
          />
        </div>
      </div>
      <div className="overflow-x-auto drop-shadow-lg">
        <table 
          className="font-table table-auto w-full rounded-lg text-sm text-slate-700" 
          // style={{tableLayout: 'fixed'}}
        >
          <thead className="text-sm font-bold">
            <Header top={true} />
          </thead>
          <tbody className={`divide-y-2 divide-transparent text-xs md:text-sm lg:text-md`}>
            {
              data && (
                <>
                  {
                    isLoading ? (
                      <>
                        {
                          Array.from({ length: 10 }).map((_, rindex) => (
                            <tr
                              key={rindex}
                              className={`flex flex-row justify-between items-center bg-${selectedTheme}-200 divide-x-2 divide-transparent`}
                            >
                              {
                                Array.from({ length: 10 }).map((_, cindex) => (
                                  <td key={cindex} className={`w-full p-2 font-semibold whitespace-nowrap overflow-hidden hover:overflow-visible hover:bg-${selectedTheme}-50 hover:text-gray-900 hover:drop-shadow-md hover:rounded-md transition-colors duration-300 hover:px-2`}>
                                     
                                  </td>
                                ))
                              }
                            </tr>
                          ))
                        }
                      </>
                    ) : (
                      <>
                        {displayedData.map((row, rowi) => (
                          <tr
                            key={rowi}
                            className={`flex flex-row justify-between items-center bg-${selectedTheme}-200 divide-x-2 divide-transparent`}
                          >
                            {
                              Object.values(row).map((col, coli) => (
                                <td key={coli} className={`w-full p-2 font-semibold whitespace-nowrap overflow-hidden hover:overflow-visible hover:bg-${selectedTheme}-50 hover:text-gray-900 hover:drop-shadow-md hover:rounded-md transition-colors duration-300 hover:px-2`}>
                                  {col}
                                </td>
                              ))
                            }
                            <td className="w-full p-2 flex items-center justify-center">
                              <button className={`font-semibold text-${selectedTheme}-500 hover:text-${selectedTheme}-600 hover:underline`} onClick={() => toggleOption( row["ItemID"] ? String(row["ItemID"]) : String(row["Family-ID"]))}>Options</button>
                            </td>
                          </tr>
                        ))}
                        {Array.from({ length: Math.max(10 - displayedData.length, 0) }).map((_, rowIndex) => (
                          <tr
                            key={`empty-row-${rowIndex}`}
                            className={`flex flex-row justify-between items-center bg-${selectedTheme}-300 divide-x-2 divide-transparent`}
                          >
                            {Object.keys(data[0]).map((_, colIndex) => (
                              <td key={`empty-col-${colIndex}`} className="w-full p-2 text-transparent"> </td>
                            ))}
                          </tr>
                        ))}
                      </>
                    )
                  }
                </>
              )
            }
            {
              error && (
                <>
                  {Array.from({ length: 10 }).map((_, rowIndex) => (
                    <tr
                      key={`empty-row-${rowIndex}`}
                      className={`flex flex-row justify-between items-center bg-${selectedTheme}-300 divide-x-2 divide-transparent`}
                    >
                      {Array.from({ length: 10 }).map((_, colIndex) => (
                        <td key={`empty-col-${colIndex}`} className="w-full p-2 text-transparent"> </td>
                      ))}
                    </tr>
                  ))}
                </>
              )
            }
          </tbody>
          <tfoot>
            <Header top={false} />
          </tfoot>
        </table>
      </div>
      {
        isLoading || error ? (
          <></>
        ) : (
        <div className="flex flex-row justify-between items-center">
          <p> </p>
          <div className="grid grid-cols-2 gap-4">
            <p> </p>
            <div className={`flex flex-row text-md font-semibold p-1 m-1 bg-${selectedTheme}-200 rounded-lg`}>
              <button disabled={CurrentPage <= 2} onClick={() => setCurrentPage((prev) => prev - 2)} className={`text-${selectedTheme}-600 hover:text-${selectedTheme}-700 hover:transition-transform ease-in-out hover:scale-150`}>
                <MdOutlineKeyboardDoubleArrowLeft />
              </button>
              <button disabled={CurrentPage <= 1} onClick={() => setCurrentPage((prev) => prev - 1)} className={`text-${selectedTheme}-600 hover:text-${selectedTheme}-700 hover:transition-transform ease-in-out hover:scale-150`}>
                <MdOutlineChevronLeft />
              </button>
              <p className="text-xs md:text-sm lg:text-base mx-1">
                {CurrentPage} of {Pages}
              </p>
              <button disabled={CurrentPage >= Pages} onClick={() => setCurrentPage((prev) => prev + 1)} className={`text-${selectedTheme}-600 hover:text-${selectedTheme}-700 hover:transition-transform ease-in-out hover:scale-150`}>
                <MdOutlineChevronRight />
              </button>
              <button disabled={CurrentPage >= Pages - 1} onClick={() => setCurrentPage((prev) => prev + 2)} className={`text-${selectedTheme}-600 hover:text-${selectedTheme}-700 hover:transition-transform ease-in-out hover:scale-150`}>
                <MdOutlineKeyboardDoubleArrowRight />
              </button>
            </div>
          </div>
        </div>
        )
      }
      <FormModal formRef={formModalRef} toggleForm={toggleForm} formType={modalForm} />
    </>
  );
};

export default DataTable;
