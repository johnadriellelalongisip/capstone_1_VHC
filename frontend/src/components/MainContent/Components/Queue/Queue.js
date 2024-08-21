/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from "react-router-dom";
import { MdOutlineArrowLeft, MdOutlineArrowRight, MdPeople } from "react-icons/md";
import Header from "../../Header";
import { colorTheme } from "../../../../App";
import { useContext, useEffect, useRef, useState } from "react";
import useQuery from "../../../../hooks/useQuery";
// import { IoMdAlert } from "react-icons/io";
import AddToQueue from "./AddToQueue";
import Attended from "./Attended";
import { socket } from "../../../../socket";
import useSocket from "../../../../hooks/useSocket";
import { decryptData } from "../../../../hooks/useCrypto";
import { jwtDecode } from "jwt-decode";
import useCurrentTime from "../../../../hooks/useCurrentTime";

const Queue = () => {
  const [selectedTheme] = useContext(colorTheme);
  const formRef = useRef(null);
  const attendedRef = useRef(null);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isAttendedOpen, setIsAttendedOpen] = useState(false);
  const { isLoading, error, addData, editData } = useQuery();
  const [waiting, setWaiting] = useState([{}]);
  const displayedData = ['priority', 'emergency', 'serving'];
  const [viewStateIndex, setViewStateIndex] = useState(displayedData.indexOf('serving'));
  const location = useLocation();
  const pathname = location.pathname.slice(1);
  const title = pathname.charAt(0).toUpperCase() + pathname.slice(1);
  const { mysqlTime } = useCurrentTime();
  const keyMap = {
    "queue_number": "queue_number",
    "patient_name": "patient_name",
    "patient_gender": "patient_gender",
    "barangay_from": "barangay_from",
    "time_arrived": "time_arrived",
    "current_status" : "current_status",
    "patient_status_history": "patient_status_history"
  }
  const { data: queue } = useSocket({ SSName: "sessionQueue", keyMap: keyMap, fetchUrl: "getQueue", socketUrl: "newQueue", socketEmit: "updateQueue", socketError: "newQueueError" });

  const { accessToken } = decryptData(localStorage.getItem('safeStorageData'));
  const role = accessToken ? jwtDecode(accessToken).role : "";

  useEffect(() => {
    setWaiting(queue.reduce((acc, curr) => {
      if(curr.current_status === 'waiting') {
        acc.push(curr);
      }
      return acc;
    }, []))
  }, [queue]);

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
  };

  const handleNext = () => {
    addData('nextQueue', {dateTime: String(mysqlTime)});
    setTimeout(() => {
      socket.emit('updateQueue', {dateTime: String(mysqlTime)});
    },[500])
  };

  const handleDismiss = (i) => {
    editData('dismissQueue', {dateTime: String(mysqlTime)}, i);
    setTimeout(() => {
      socket.emit('updateQueue', {dateTime: String(mysqlTime)});
      socket.emit('updateAttended');
    },[500])
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
  };
  
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-col p-2 mb-4 mx-2 md:mx-3 lg:mx-4 mt-4">
        <div onClick={() => socket.emit("updateQueue", {dateTime: String(mysqlTime)})}>
          <Header title={ title } icon={<MdPeople />}/>
        </div>
        {isLoading && !queue[0] ? (
          <>
            <div className="min-h-screen h-screen overflow-y-auto scroll-smooth p-2 mt-2 animate-pulse ease-linear">
              <div className="flex items-center justify-end gap-3 m-1 my-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className={`p-2 rounded-lg bg-${selectedTheme}-400 text-xs md:text-sm lg:text-base font-semibold w-16`}> </div>
                ))}
              </div>
              <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-4 mb-60 md:mb-72 lg:mb-80`}>
                <div className={`flex flex-col w-full h-[21rem] col-span-2 row-span-2 bg-${selectedTheme}-400 rounded-lg text-xs md:text-sm lg:text-base drop-shadow-md`}></div>
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className={`relative w-full md:w-full lg:grow flex flex-col h-[10rem] bg-${selectedTheme}-400 rounded-lg drop-shadow-md text-xs md:text-sm lg:text-base`}></div>
                ))}
              </div>
            </div>
          </>
        ):(
        <div className="min-h-screen h-screen overflow-y-auto scroll-smooth p-2 mt-2">
          <div className="flex items-center justify-end gap-3 m-1 my-2">
            {role && (role !== 'user') && (
              <button onClick={toggleAttended} className={`p-[0.15rem] md:p-1 lg:p-[0.35rem] rounded-lg bg-${selectedTheme}-600 text-${selectedTheme}-200 transition-colors text-xs md:text-sm lg:text-base font-semibold px-4 hover:text-${selectedTheme}-300 hover:bg-${selectedTheme}-700 focus:bg-${selectedTheme}-800 focus:text-${selectedTheme}-400 active:bg-${selectedTheme}-300 active:text-${selectedTheme}-600 border-[1px] border-${selectedTheme}-600`}>
                Attended
              </button>
            )}
            <button onClick={toggleForm} className={`p-[0.15rem] md:p-1 lg:p-[0.35rem] rounded-lg bg-${selectedTheme}-200 text-${selectedTheme}-600 transition-colors text-xs md:text-sm lg:text-base font-semibold px-4 hover:text-${selectedTheme}-700 hover:bg-${selectedTheme}-300 focus:bg-${selectedTheme}-400 focus:text-${selectedTheme}-800 active:bg-${selectedTheme}-600 active:text-${selectedTheme}-300 border-[1px] border-${selectedTheme}-600`}>
              Add
            </button>
            {role && (role !== 'user') && (
              <button disabled={!waiting[0]} onClick={handleNext} className={`p-[0.15rem] md:p-1 lg:p-[0.35rem] rounded-lg bg-${selectedTheme}-600 text-${selectedTheme}-200 transition-colors text-xs md:text-sm lg:text-base font-semibold px-4 hover:text-${selectedTheme}-300 hover:bg-${selectedTheme}-700 focus:bg-${selectedTheme}-800 focus:text-${selectedTheme}-400 active:bg-${selectedTheme}-300 active:text-${selectedTheme}-600 border-[1px] border-${selectedTheme}-600`}>
                Next
              </button>
            )}
          </div>
          <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 place-items-center gap-4 mb-60 md:mb-72 lg:mb-80`}>
          
            <div className={`flex md:block lg:hidden flex-col w-full h-full col-span-2 row-span-2 bg-${selectedTheme}-50 rounded-lg text-xs md:text-sm lg:text-base drop-shadow-md`}>
              <div className={`text-center border-b-[1px] border-${selectedTheme}-800 shadow-md`}>
                <p className={`flex items-center justify-center gap-2 p-2 text-base md:text-lg lg:text-xl text-${selectedTheme}-600 font-bold`}>
                  <button onClick={() => toggleViewState('back')} className="p-1 rounded-3xl bg-gray-400/30 text-gray-800"><MdOutlineArrowLeft /></button>
                  <span>{displayedData[viewStateIndex].charAt(0).toUpperCase() + displayedData[viewStateIndex].substring(1)}</span>
                  <button onClick={() => toggleViewState('next')} className="p-1 rounded-3xl bg-gray-400/30 text-gray-800"><MdOutlineArrowRight /></button>
                </p>
              </div>
              <div className="h-72 min-h-72 overflow-y-auto">
              {queue.length >= 0 && queue.map((q, i) => {
                const statusArr = q.patient_status_history ? JSON.parse(q.patient_status_history) : {};
                const statusValues = Object.values(statusArr);
                if (statusValues[statusValues.length - 1] === displayedData[viewStateIndex]) {
                  return (
                    <div key={i} className="flex flex-col gap-3 mx-2 my-3">
                      <div className={`flex justify-between items-center px-10 bg-${selectedTheme}-100 rounded-lg font-semibold p-2 drop-shadow-md`}>
                        <p>{q.queue_number}</p>
                        <p>{q.patient_name}</p>
                        <button onClick={() => handleDismiss(q.queue_number)} className={`p-1 rounded-lg bg-${selectedTheme}-600 text-${selectedTheme}-200 font-semibold text-xs md:text-sm lg:text-base`}>Dismiss</button>
                      </div>
                    </div>
                  )
                } else {
                  return null;
                }
              })}
              </div>
            </div>

            {(isLoading || error) && Array.from({ length: 3 }).map((_, i) => (
              <div>

              </div>
            ))}
            
            {!isLoading && !error && displayedData.map(item => (
              <div className={`hidden md:hidden lg:block w-full h-full col-span-2 row-span-2 bg-${selectedTheme}-50 rounded-lg text-xs md:text-sm lg:text-base drop-shadow-md`}>
                <div className={`text-center border-b-[1px] border-${selectedTheme}-800 shadow-md`}>
                  <p className={`flex items-center justify-center gap-2 p-2 text-base md:text-lg lg:text-xl text-${selectedTheme}-600 font-bold`}>
                    <span>{item.charAt(0).toUpperCase() + item.substring(1)}</span>
                  </p>
                </div>
                <div className="h-72 min-h-72 overflow-y-auto">
                {queue.length >= 0 && queue.map((q, i) => {
                  if (q.current_status === item) {
                    return (
                      <div key={i} className="flex flex-col gap-3 mx-2 my-3">
                        <div className={`flex justify-between items-center px-10 border-[1px] bg-${selectedTheme}-100 rounded-lg font-semibold p-2 drop-shadow-md`}>
                          <p>{q.queue_number}</p>
                          <p>{q.patient_name}</p>
                          <button onClick={() => handleDismiss(q.queue_number)} className={`p-1 rounded-lg bg-${selectedTheme}-600 text-${selectedTheme}-200 font-semibold text-xs md:text-sm lg:text-base`}>Dismiss</button>
                        </div>
                      </div>
                    )
                  } else {
                    return null
                  }
                })}
                </div>
              </div>
              ))}
            
            {/* {queue && queue.length > 0 && queue.map((q, i) => {
              if (q.patient_status_history === 'emergency') {
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
            })} */}

            {waiting && waiting.length !== 0 && waiting.map((w, i) => (
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
            ))}

          </div>

          <AddToQueue ATref={formRef} ATonClick={toggleForm} />
          <Attended ATref={attendedRef} ATonClick={toggleAttended} queue={queue}/>

        </div>
        )}
      </div>
    </div>
  );
}

export default Queue;