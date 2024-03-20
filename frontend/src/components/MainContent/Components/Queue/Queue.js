/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from "react-router-dom";
import { MdClose, MdPeople } from "react-icons/md";
import Header from "../../Header";
import { colorTheme } from "../../../../App";
import { useContext, useEffect, useRef, useState } from "react";
import useQuery from "../../../../hooks/useQuery";
import { Checkbox, Label, Radio, Spinner } from "flowbite-react";
import useCurrentTime from "../../../../hooks/useCurrentTime";

const Queue = () => {
  const [selectedTheme] = useContext(colorTheme);
  const formRef = useRef(null);
  const attendedRef = useRef(null);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isAttendedOpen, setIsAttendedOpen] = useState(false);
  const [payload, setPayload] = useState({
    name: "",
    barangay: "",
  });
  const [gender, setGender] = useState('male');
  const [status, setStatus] = useState('waiting');
  const { response, isLoading, error, addData, fetchData } = useQuery();
  const { mysqlTime } = useCurrentTime();
  const [isChecked, setIsChecked] = useState(true);
  const [queue, setQueue] = useState([{}]);
  const [serving, setServing] = useState([{}]);
  const location = useLocation();
  const pathname = location.pathname.slice(1);
  const title = pathname.charAt(0).toUpperCase() + pathname.slice(1);

  useEffect(() => {
    fetchData('getQueue');
  }, []);

  useEffect(() => {
    if (response && response.status === 200 && response.type === 'get') {
      setQueue(response.data);
      setServing(response.data.reduce((acc, curr) => {
        if (curr.patient_status === 'serving') {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        time_added: String(mysqlTime),
        status: status,
        gender: gender
    }));
  };

  function cleanUp() {
    setPayload({
      name: "",
      barangay: ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isChecked) {
      addData('addToQueue', payload);
      cleanUp();
    } else {
      addData('addToQueue', payload);
      cleanUp();
      toggleForm();
    }
  };

  const handleNext = () => {
    
  };

  const handleDismiss = (i) => {

  }

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
      <div className="flex flex-col p-2 mt-20 md:mt-28 lg:mt-32 mb-4 mx-2 md:mx-3 lg:mx-4">
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
                <p className={`p-2 text-base md:text-lg lg:text-xl text-${selectedTheme}-600 font-bold`}>Now Serving</p>
              </div>
              <div className="h-72 min-h-72 overflow-y-auto">
              {
                serving.map((s, i) => (
                  <div key={i} className="flex flex-col gap-3 mx-2 my-3">
                    <div className={`flex justify-between items-center px-10 bg-${selectedTheme}-100 rounded-lg font-semibold p-2 drop-shadow-md`}>
                      <p>{s.queue_number}</p>
                      <p>{s.patient_name}</p>
                      <button onClick={handleDismiss(i)} className={`p-1 rounded-lg bg-${selectedTheme}-600 text-${selectedTheme}-200 font-semibold text-xs md:text-sm lg:text-base`}>Dismiss</button>
                    </div>
                  </div>
                ))
              }
              </div>
            </div>

            {
              queue.length !== 0 && queue.map((q, i) => {
                if (q.patient_status === 'waiting') {
                  return (
                    <div key={i} className={`relative w-full md:w-full lg:grow flex flex-col h-auto bg-${selectedTheme}-50 rounded-lg drop-shadow-md text-xs md:text-sm lg:text-base`}>
                      <div className={`text-center border-b-[1px] border-${selectedTheme}-800 shadow-md`}>
                        <p className={`text-${selectedTheme}-600 font-bold text-base md:text-lg lg:text-xl`}>NO.{q.queue_number}</p>
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
                  );
                } else {
                  return null; // If patient_status is not 'waiting', return null
                }
              })
            }

          </div>

          <dialog ref={formRef} className={`rounded-lg bg-gray-100 drop-shadow-lg w-80 md:w-[500px] lg:w-[600px]`}>
            <div className="flex flex-col text-xs md:text-sm lg:text-base">

              <div className={`flex justify-between items-center p-2 text-${selectedTheme}-600 border-b-[1px] border-solid border-${selectedTheme}-500 shadow-md shadow-${selectedTheme}-600 mb-2`}>
                <div className="flex items-center p-1 gap-1">
                  <MdPeople className='w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8' />
                  <strong className="font-semibold drop-shadow-md text-sm md:text-base lg:text-lg">Add to query<span className={`ml-2 text-${selectedTheme}-500 font-bold`}>Patient's Number: 55</span></strong>
                </div>
                <button onClick={toggleForm} className={`transition-colors duration-200 rounded-3xl p-1 bg-${selectedTheme}-300 hover:bg-${selectedTheme}-400 active:bg-${selectedTheme}-200`}>
                  <MdClose className='w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />
                </button>
              </div>

              <form className={`flex flex-col gap-4 mx-5 my-2 font-semibold`} onSubmit={handleSubmit}>
                <div className="flex gap-3 items-center justify-start">
                  <label htmlFor="name">Patient's Name:</label>
                  <input required maxLength={50} type="text" name="name" id="name" value={payload.name} onChange={handleChange} className={`text-xs md:text-sm lg:text-base grow p-2 rounded-lg bg-${selectedTheme}-50 border-transparent focus:ring-0 focus:border-transparent`} />
                </div>
                <div className="flex gap-3 items-center justify-start">
                  <label htmlFor="barangay">Patient's Barangay:</label>
                  <input required maxLength={50} type="text" name="barangay" id="barangay" value={payload.barangay} onChange={handleChange} className={`text-xs md:text-sm lg:text-base grow p-2 rounded-lg bg-${selectedTheme}-50 border-transparent focus:ring-0 focus:border-transparent`} />
                </div>
                <fieldset className="flex flex-row gap-3 p-2">
                  <legend className="mr-4 text-xs md:text-sm lg:text-base">Choose a gender</legend>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="male"
                      name="gender"
                      value="male"
                      className='text-xs md:text-sm lg:text-base'
                      checked={gender === 'male'}
                      onChange={() => setGender('male')}
                    />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="female"
                      name="gender"
                      value="female"
                      className='text-xs md:text-sm lg:text-base'
                      checked={gender === 'female'}
                      onChange={() => setGender('female')}
                    />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="others"
                      name="gender"
                      value="others"
                      className='text-xs md:text-sm lg:text-base'
                      checked={gender === 'others'}
                      onChange={() => setGender('others')}
                    />
                    <Label htmlFor="others">Others</Label>
                  </div>
                </fieldset>
                <fieldset className="flex flex-row gap-3 p-2">
                  <legend className="mr-4 text-xs md:text-sm lg:text-base">Status</legend>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="waiting"
                      name="status"
                      value="waiting"
                      className='text-xs md:text-sm lg:text-base'
                      checked={status === 'waiting'}
                      onChange={() => setStatus('waiting')}
                    />
                    <Label htmlFor="waiting">Waiting</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="senior"
                      name="status"
                      value="senior"
                      className='text-xs md:text-sm lg:text-base'
                      checked={status === 'senior'}
                      onChange={() => setStatus('senior')}
                    />
                    <Label htmlFor="senior">Priority</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="emergency"
                      name="status"
                      value="emergency"
                      className='text-xs md:text-sm lg:text-base'
                      checked={status === 'emergency'}
                      onChange={() => setStatus('emergency')}
                    />
                    <Label htmlFor="emergency">Emergency</Label>
                  </div>
                </fieldset>
                <button type="submit" className={`py-2 px-4 hover:shadow-md font-semibold rounded-lg transition-colors duration-200 ${payload.name && payload.barangay ? `text-${selectedTheme}-100 bg-${selectedTheme}-600 hover:cursor-pointer shadow-sm` : `shadow-inner text-${selectedTheme}-100 bg-${selectedTheme}-400 hover:cursor-not-allowed`}`} disabled={!payload.name && !payload.barangay}>{isLoading || error ? <Spinner /> : 'Submit Edit'}</button>
                <div className="flex items-center justify-end gap-2">
                  <Checkbox
                    id="accept"
                    checked={isChecked}
                    onChange={() => setIsChecked((prev) => !prev)}
                  />
                  <label htmlFor="accept" className="flex text-xs md:text-sm lg:text-base font-semibold">
                    Don't Close Upon Submition
                  </label>
                </div>
              </form>

            </div>
          </dialog>

          <dialog ref={attendedRef} className={`rounded-lg bg-gray-100 drop-shadow-lg w-80 md:w-[500px] lg:w-[600px]`}>
            <div className="flex flex-col text-xs md:text-sm lg:text-base">
              <div className={`flex justify-between items-center p-2 text-${selectedTheme}-600 border-b-[1px] border-solid border-${selectedTheme}-500 shadow-md shadow-${selectedTheme}-600 mb-2`}>
                <div className="flex items-center p-1 gap-1">
                  <MdPeople className='w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8' />
                  <strong className="font-semibold drop-shadow-md text-sm md:text-base lg:text-lg">Add to query<span className={`ml-2 text-${selectedTheme}-500 font-bold`}>Patient's Number: 55</span></strong>
                </div>
                <button onClick={toggleAttended} className={`transition-colors duration-200 rounded-3xl p-1 bg-${selectedTheme}-300 hover:bg-${selectedTheme}-400 active:bg-${selectedTheme}-200`}>
                  <MdClose className='w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />
                </button>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
}

export default Queue;