/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from "react-router-dom";
import { MdOutlineArrowLeft, MdOutlineArrowRight, MdPeople } from "react-icons/md";
import Header from "../../Header";
import { colorTheme } from "../../../../App";
import { useContext, useEffect, useRef, useState } from "react";
import useQuery from "../../../../hooks/useQuery";
import { IoMdAlert } from "react-icons/io";
import AddToQueue from "./AddToQueue";
import Attended from "./Attended";

const Queue = () => {
  const [selectedTheme] = useContext(colorTheme);
  const formRef = useRef(null);
  const attendedRef = useRef(null);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isAttendedOpen, setIsAttendedOpen] = useState(false);
  const { response, isLoading, error, fetchData } = useQuery();
  const [queue, setQueue] = useState([{}]);
  const [waiting, setWaiting] = useState([{}]);
  const displayedData = ['priority', 'emergency', 'serving'];
  const [viewStateIndex, setViewStateIndex] = useState(displayedData.indexOf('serving'));
  const location = useLocation();
  const pathname = location.pathname.slice(1);
  const title = pathname.charAt(0).toUpperCase() + pathname.slice(1);

  useEffect(() => {
    fetchData('getQueue');
  }, []);

  useEffect(() => {
    if (response && response.status === 200 && response.type === 'get') {
      setQueue(response.data);
      setWaiting(response.data.reduce((acc, curr) => {
        if (curr.patient_status === 'waiting') {
          acc.push(curr);
        }
        return acc;
      }, []));
    } else if (response && response.status === 200 && response.type === 'add') {
      console.log(response);
    } else if (error) {
      console.log(error);
    }
  }, [response, error]);

  const toggleForm = () => {
    if (isFormDialogOpen) {
      setIsFormDialogOpen(false);
      formRef.current.close();
    } else {
      setIsFormDialogOpen(true);
      formRef.current.showModal();
    }
  };

  const toggleAttended = () => {
    if (isAttendedOpen) {
      setIsAttendedOpen(false);
      attendedRef.current.close();
    } else {
      setIsAttendedOpen(true);
      attendedRef.current.showModal();
    }
  }

  const handleNext = () => {

  };

  const handleDismiss = (i) => {

  }

  const toggleViewState = (direction) => {
    if (direction === 'back') {
      setViewStateIndex(prevIndex => (prevIndex === 0 ? displayedData.length - 1 : prevIndex - 1));
    } else if (direction === 'next') {
      setViewStateIndex(prevIndex => (prevIndex === displayedData.length - 1 ? 0 : prevIndex + 1));
    }
  };

  function getMeridianTime(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const meridianHours = hours % 12 || 12;
    const meridian = hours >= 12 ? 'PM' : 'AM';
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const time12Hour = `${meridianHours}:${formattedMinutes} ${meridian}`;
    return time12Hour;
}
  
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-col p-2 mb-4 mx-2 md:mx-3 lg:mx-4 mt-4">
        <div>
          <Header title={ title } icon={<MdPeople />}/>
        </div>
        <div className="min-h-screen h-screen overflow-y-auto scroll-smooth p-2 mt-2">
          <div className="flex items-center justify-end gap-3 m-1 my-2">
            <button onClick={toggleAttended} className={`p-2 rounded-lg bg-${selectedTheme}-600 text-${selectedTheme}-200 transition-colors text-xs md:text-sm lg:text-base font-semibold px-4 hover:text-${selectedTheme}-300 hover:bg-${selectedTheme}-700 focus:bg-${selectedTheme}-800 focus:text-${selectedTheme}-400 active:bg-${selectedTheme}-300 active:text-${selectedTheme}-600 border-[1px] border-${selectedTheme}-600`}>
              Attended
            </button>
            <button onClick={toggleForm} className={`p-2 rounded-lg bg-${selectedTheme}-200 text-${selectedTheme}-600 transition-colors text-xs md:text-sm lg:text-base font-semibold px-4 hover:text-${selectedTheme}-700 hover:bg-${selectedTheme}-300 focus:bg-${selectedTheme}-400 focus:text-${selectedTheme}-800 active:bg-${selectedTheme}-600 active:text-${selectedTheme}-300 border-[1px] border-${selectedTheme}-600`}>
              Add
            </button>
            <button onClick={handleNext} className={`p-2 rounded-lg bg-${selectedTheme}-600 text-${selectedTheme}-200 transition-colors text-xs md:text-sm lg:text-base font-semibold px-4 hover:text-${selectedTheme}-300 hover:bg-${selectedTheme}-700 focus:bg-${selectedTheme}-800 focus:text-${selectedTheme}-400 active:bg-${selectedTheme}-300 active:text-${selectedTheme}-600 border-[1px] border-${selectedTheme}-600`}>
              Next
            </button>
          </div>
          <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-4 mb-60 md:mb-72 lg:mb-80`}>
          
            <div className={`flex flex-col w-full h-full col-span-2 row-span-2 bg-${selectedTheme}-50 rounded-lg text-xs md:text-sm lg:text-base drop-shadow-md`}>
              <div className={`text-center border-b-[1px] border-${selectedTheme}-800 shadow-md`}>
                <p className={`flex items-center justify-center gap-2 p-2 text-base md:text-lg lg:text-xl text-${selectedTheme}-600 font-bold`}>
                  <button onClick={() => toggleViewState('back')} className="p-1 rounded-3xl bg-gray-400/30 text-gray-800"><MdOutlineArrowLeft /></button>
                  <span>{displayedData[viewStateIndex].charAt(0).toUpperCase() + displayedData[viewStateIndex].substring(1)}</span>
                  <button onClick={() => toggleViewState('next')} className="p-1 rounded-3xl bg-gray-400/30 text-gray-800"><MdOutlineArrowRight /></button>
                </p>
              </div>
              <div className="h-72 min-h-72 overflow-y-auto">
              {
                queue.length !== 0 && queue.map((q, i) => {
                  if (q.patient_status === displayedData[viewStateIndex]) {
                    return (
                      <div key={i} className="flex flex-col gap-3 mx-2 my-3">
                        <div className={`flex justify-between items-center px-10 bg-${selectedTheme}-100 rounded-lg font-semibold p-2 drop-shadow-md`}>
                          <p>{q.queue_number}</p>
                          <p>{q.patient_name}</p>
                          <button onClick={handleDismiss(i)} className={`p-1 rounded-lg bg-${selectedTheme}-600 text-${selectedTheme}-200 font-semibold text-xs md:text-sm lg:text-base`}>Dismiss</button>
                        </div>
                      </div>
                    )
                  } else {
                    return null;
                  }
                })
              }
              </div>
            </div>
            {
              queue && queue.length !== 0 && queue.map((q, i) => {
                if (q.patient_status === 'emergency') {
                  return (
                    <div key={i} className={`relative w-full md:w-full lg:grow flex flex-col h-auto bg-red-300 animate-pulse rounded-lg drop-shadow-md text-xs md:text-sm lg:text-base`}>
                      <div className={`text-center border-b-[1px] border-red-800 shadow-md`}>
                        <p className={`flex items-center justify-center gap-2 text-${selectedTheme}-600 font-bold text-base md:text-lg lg:text-xl`}>NO.{q.queue_number}<IoMdAlert /></p>
                      </div>
                      <div className="flex flex-col gap-2 p-2 my-3">
                        <div className={`flex justify-start items-center gap-2 text-${selectedTheme}-800 font-semibold`}>
                          <p className="truncate">{q.patient_name}</p>
                        </div>
                        <div className={`flex justify-start items-center gap-2 text-${selectedTheme}-800 font-semibold`}>
                          <p>{q.barangay_from}</p>
                        </div>  
                        <div className={`flex justify-start items-center gap-2 text-${selectedTheme}-800 font-semibold`}>
                          <p>{q.patient_gender}</p>
                        </div>
                      </div>
                      <p className="absolute bottom-0 right-0 p-1 text-xs md:text-sm lg:text-base font-thin">{getMeridianTime(q.time_arrived)}</p>
                    </div>
                  )
                } else {
                  return null;
                }
              })
            }

            {
              waiting && waiting.length !== 0 && waiting.map((w, i) => (
                <div key={i} className={`relative w-full md:w-full lg:grow flex flex-col h-auto bg-${selectedTheme}-50 rounded-lg drop-shadow-md text-xs md:text-sm lg:text-base`}>
                  <div className={`text-center border-b-[1px] border-${selectedTheme}-800 shadow-md`}>
                    <p className={`text-${selectedTheme}-600 font-bold text-base md:text-lg lg:text-xl`}>NO.{w.queue_number}</p>
                  </div>
                  <div className="flex flex-col gap-2 p-2 my-3">
                    <div className={`flex justify-start items-center gap-2 text-${selectedTheme}-800 font-semibold`}>
                      <p className="truncate">{w.patient_name}</p>
                    </div>
                    <div className={`flex justify-start items-center gap-2 text-${selectedTheme}-800 font-semibold`}>
                      <p>{w.barangay_from}</p>
                    </div>  
                    <div className={`flex justify-start items-center gap-2 text-${selectedTheme}-800 font-semibold`}>
                      <p>{w.patient_gender}</p>
                    </div>
                  </div>
                  <p className="absolute bottom-0 right-0 p-1 text-xs md:text-sm lg:text-base font-thin">{getMeridianTime(w.time_arrived)}</p>
                </div>
              ))
            }

          </div>

          <AddToQueue ATref={formRef} ATonClick={toggleForm} />
          <Attended ATref={attendedRef} ATonClick={toggleAttended} />

        </div>
      </div>
    </div>
  );
}

export default Queue;