import { TextInput } from "flowbite-react";
import { useContext, useEffect, useRef, useState } from "react";
import { MdSearch, MdOutlineChevronLeft, MdOutlineChevronRight, MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight, MdArrowDropUp, MdInfo, MdKeyboardArrowUp } from "react-icons/md";
import { TbFileExport } from "react-icons/tb";
import FormModal from "./FormModal";
import { colorTheme } from "../../../../App";

const DataTable = ({ data, modalForm, enAdd = true, enImport = false, importName, importUrlDestination, enSearch = true, enExport = true, isLoading = true, enOptions = true, toggleOption, optionPK, error }) => {
  const [selectedTheme] = useContext(colorTheme);
  const [move, setMove] = useState(false);
  const [query, setQuery] = useState('');
  const [CurrentPage, setCurrentPage] = useState(1);
  const [Pages, setPages] = useState(0);
  const [rowCount, setRowCount] = useState(10);
  const [sortedData, setSortedData] = useState([]);
  const inputRef = useRef(null);
  const formModalRef = useRef(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [sortState, setSortState] = useState(
    data && data.length && Object.keys(data[0]).reduce((acc, field) => {
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

  const filteredData = sortedData.filter((row) =>
    Object.values(row).some((col) =>
      typeof(col) === 'string' &&
      col.match(/[a-zA-Z]/) &&
      col.toString().toLowerCase().includes(query.toLowerCase()) &&
      col.toString().toLowerCase().startsWith(query.toLowerCase())
    )
  );

  useEffect(() => {
    const NumOfPages = Math.ceil(filteredData.length / rowCount);
    setPages(NumOfPages);
  }, [query,filteredData, rowCount]);

  const toggleForm = () => {
    if (!isFormOpen) {
      formModalRef.current.showModal();
      setIsFormOpen(true);
    } else {
      formModalRef.current.close();
      setIsFormOpen(false);
    }
  }

  const displayedData = filteredData.slice((CurrentPage - 1) * rowCount, CurrentPage * rowCount);

  if (isLoading) {
    return (
      <div className={`flex flex-col gap-3 w-full animate-pulse ease-linear drop-shadow-md`}>
        <div className="flex justify-between m-2 md:m-3 lg:m-4">
          <div className="flex justify-between items-center gap-3">
            <div className={`bg-${selectedTheme}-400 rounded-lg h-6 md:h-8 lg:h-10 w-24 md:w-26 lg:w-28`}></div>
          </div>
          <div className={`bg-${selectedTheme}-400 rounded-lg h-6 md:h-8 lg:h-10 w-24 md:w-26 lg:w-28`}></div>
        </div>
        <div className={`bg-${selectedTheme}-400 rounded-lg h-96`}></div>
        <div className="flex justify-between items-center">
          <div className={`bg-${selectedTheme}-400 rounded-lg w-16 md:w-18 lg:w-20 h-6 md:h-8 lg:h-10`}></div>
          <div className={`bg-${selectedTheme}-400 rounded-lg w-26 md:w-28 lg:w-32 h-6 md:h-8 lg:h-10`}></div>
        </div>
      </div>
    )
  }

  const Header = ({ top }) => (
    !(data && data.length > 0) ? (
      <>
      <tr className={`flex flex-row justify-center text-center items-center bg-${selectedTheme}-300 text-xs md:text-sm lg:text-md ${top ? 'rounded-tl-lg rounded-tr-lg' : 'rounded-bl-lg rounded-br-lg'}`}></tr>
      </>
    ) : (
      <tr className={`flex flex-row justify-between items-center bg-${selectedTheme}-300 text-xs md:text-sm lg:text-md ${top ? 'rounded-tl-lg rounded-tr-lg' : 'rounded-bl-lg rounded-br-lg'}`}>
        {Object.keys(data[0]).map((field, fieldi) => (
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
        ))}
        {top && enOptions && (
          <th className="w-full p-2 text-center flex justify-center items-center">{error ? error : 'Actions'}</th>
        )}
      </tr>
    )
  );
  
  return (
    <>
      <div className="flex justify-between items-center p-4 overflow-hidden">
        <div className="flex justify-center items-center gap-3">
          {enImport && (
            <button 
              className={`text-xs md:text-sm lg:text-sm whitespace-nowrap font-semibold ${!error ? `text-${selectedTheme}-50 bg-${selectedTheme}-600 drop-shadow-md` : `text-${selectedTheme}-600 bg-${selectedTheme}-200 shadow-inner`} rounded-lg p-2`}
              onClick={() => toggleForm()}
              disabled={error}
            >
              <p className={`font-bold text-${selectedTheme}-100`}>Import File</p>
            </button>
          )}
          {enAdd && (
            <button 
              className={`text-xs md:text-sm lg:text-sm whitespace-nowrap font-semibold ${!error ? `text-${selectedTheme}-50 bg-${selectedTheme}-600 drop-shadow-md` : `text-${selectedTheme}-600 bg-${selectedTheme}-200 shadow-inner`} rounded-lg p-2`}
              onClick={() => toggleForm()}
              disabled={error}
            >
              <p className={`font-bold text-${selectedTheme}-100`}>Add</p>
            </button>
          )}
          <div className="flex gap-1">
            <p className={`text-xs md:text-sm lg:text-sm p-1 text-${selectedTheme}-800 font-bold`}>Entries per page:</p>
            <button onClick={() => setRowCount(prev => prev > 3 && ++prev)} className={`rounded-sm bg-${selectedTheme}-500 border-0 p-1`}>
              <MdKeyboardArrowUp />
            </button>
            <p className={`text-xs md:text-sm lg:text-sm p-1 text-${selectedTheme}-800 font-bold`}>{rowCount}</p>
            <button onClick={() => setRowCount(prev => prev > 3 && --prev)} className={`rounded-sm bg-${selectedTheme}-500 border-0 p-1`}>
              <MdKeyboardArrowUp className="rotate-180" />
            </button>
          </div>
        </div>
        <div 
          className={`flex`}
        >
          {enSearch && (
            <>
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
            </>)}
        </div>
      </div>
      <div className="overflow-x-auto drop-shadow-lg">
        <table 
          className="font-table table-auto w-full rounded-lg text-sm text-slate-700" 
        >
          <thead className="text-sm font-bold">
            <Header top={true} />
          </thead>
          <tbody className={`divide-y-2 divide-transparent text-xs md:text-sm lg:text-md`}>
            {data && data.length > 0 ? (
              <>
                {displayedData.map((row, rowi) => (
                  <tr
                    key={rowi}
                    className={`flex flex-row justify-between items-center bg-${selectedTheme}-200 divide-x-2 divide-transparent`}
                  >
                    {Object.values(row).map((col, coli) => (
                      <td key={coli} className={`w-full p-2 font-semibold whitespace-nowrap overflow-hidden hover:overflow-visible hover:bg-${selectedTheme}-50 hover:text-gray-900 hover:drop-shadow-md hover:rounded-md transition-colors duration-300 hover:px-2`}>
                        {col}
                      </td>
                    ))}
                    {enOptions && (
                    <td className="w-full p-2 flex items-center justify-center">
                      <button 
                        className={`font-semibold text-${selectedTheme}-500 hover:text-${selectedTheme}-600 hover:underline`}
                        onClick={() => toggleOption(row[`${optionPK}`]) }
                      >
                        Options
                      </button>
                    </td>
                    )}
                  </tr>
                ))}
                {Array.from({ length: Math.max(rowCount - displayedData.length, 0) }).map((_, rowIndex) => (
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
            ) : (
              <tr>
                <td className={`flex justify-center items-center text-center bg-blue-300 rounded-md h-96 p-2 font-bold`}>
                  <MdInfo className="size-6 md:size-7 lg:size-8"/>
                  <p>Table is empty. Add new data.</p>
                </td>
              </tr>
            )}
            {error && (
              <>
                {Array.from({ length: rowCount }).map((_, rowIndex) => (
                  <tr
                    key={`empty-row-${rowIndex}`}
                    className={`flex flex-row justify-between items-center bg-${selectedTheme}-300 divide-x-2 divide-transparent`}
                  >
                    {Array.from({ length: rowCount }).map((_, colIndex) => (
                      <td key={`empty-col-${colIndex}`} className="w-full p-2 text-transparent"> </td>
                    ))}
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row justify-between items-center mt-1">
        <div className="flex justify-evenly items-center">
          {enExport && (
            <button className={`flex gap-2 p-1 px-3 items-center justify-center bg-${selectedTheme}-200 text-${selectedTheme}-600 font-semibold rounded-lg text-xs md:text-sm lg:text-base hover:text-${selectedTheme}-700 hover:transition-transform ease-in-out`}>Export to file<TbFileExport className="size-3 md:size-3 lg:size-4"/></button>
          )}
        </div>
        <div className={`flex flex-row text-md font-semibold p-1 m-1 bg-${selectedTheme}-200 rounded-lg`}>
          <button disabled={CurrentPage <= 2} onClick={() => setCurrentPage((prev) => prev - 2)} className={`text-${selectedTheme}-600 hover:text-${selectedTheme}-700 hover:transition-transform ease-in-out hover:scale-150`}>
            <MdOutlineKeyboardDoubleArrowLeft />
          </button>
          <button disabled={CurrentPage <= 1} onClick={() => setCurrentPage((prev) => prev - 1)} className={`text-${selectedTheme}-600 hover:text-${selectedTheme}-700 hover:transition-transform ease-in-out hover:scale-150`}>
            <MdOutlineChevronLeft />
          </button>
          <p className="flex text-xs md:text-sm lg:text-base mx-1">
            {CurrentPage} <span className="hidden md:block lg:block"> of{Pages}</span>
          </p>
          <button disabled={CurrentPage >= Pages} onClick={() => setCurrentPage((prev) => prev + 1)} className={`text-${selectedTheme}-600 hover:text-${selectedTheme}-700 hover:transition-transform ease-in-out hover:scale-150`}>
            <MdOutlineChevronRight />
          </button>
          <button disabled={CurrentPage >= Pages - 1} onClick={() => setCurrentPage((prev) => prev + 2)} className={`text-${selectedTheme}-600 hover:text-${selectedTheme}-700 hover:transition-transform ease-in-out hover:scale-150`}>
            <MdOutlineKeyboardDoubleArrowRight />
          </button>
        </div>
      </div>
      <FormModal formRef={formModalRef} toggleForm={toggleForm} formType={modalForm} />
    </>
  );
};

export default DataTable;
