import { useContext, useEffect, useState } from "react";
import { colorTheme } from "../../../../App";
import { MdClose, MdPeople } from "react-icons/md";
import { Checkbox, Label, Radio, Spinner } from "flowbite-react";
import useQuery from "../../../../hooks/useQuery";
import useCurrentTime from "../../../../hooks/useCurrentTime";
import { socket } from "../../../../socket";
import api from "../../../../axios";

const AddToQueue = ({ ATref, ATonClick }) => {
  const [selectedTheme] = useContext(colorTheme);
  const { response, isLoading, error, addData, postData } = useQuery();
  const { mysqlTime } = useCurrentTime();
  const [suggestions, setSuggestions] = useState([]);
  const [name, setName] = useState('');
  const [barangay, setBarangay] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('waiting');
  const [isChecked, setIsChecked] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isChecked) {
      addData('addToQueue', { name: name, dateTime: String(mysqlTime), status });
    } else {
      addData('addToQueue', { name: name, dateTime: String(mysqlTime), status });
      ATonClick();
    }
    setName('');
    setTimeout(() => {
      socket.emit("updateQueue", {dateTime: String(mysqlTime)});
    },500);
  };

  const handleEnter = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      postData('/findCitizen', {name: name});
    }
  }

  useEffect(() => {
    if (response?.status === 200) {
      setName(response.citizen?.full_name || '');
      setBarangay(response.citizen?.citizen_barangay || '');
      setGender(response.citizen?.citizen_gender || '');
    }
  }, [response]);

  useEffect(() => {
    if (name.length === 0) {
      setBarangay('');
      setGender('');
    }
  }, [name]);
  
  return (
    <dialog ref={ATref} className={`rounded-lg bg-gray-100 drop-shadow-lg w-80 md:w-[500px] lg:w-[600px]`}>
      <div className="flex flex-col text-xs md:text-sm lg:text-base">

        <div className={`flex justify-between items-center p-2 text-${selectedTheme}-600 border-b-[1px] border-solid border-${selectedTheme}-500 shadow-md shadow-${selectedTheme}-600 mb-2`}>
          <div className="flex items-center p-1 gap-1">
            <MdPeople className='w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8' />
            <strong className="font-semibold drop-shadow-md text-sm md:text-base lg:text-lg">Add to Queue
            {/* <span className={`ml-2 text-${selectedTheme}-500 font-bold`}>Patient's Number: 55</span> */}
            </strong>
          </div>
          <button onClick={() => ATonClick()} className={`transition-colors duration-200 rounded-3xl p-1 bg-${selectedTheme}-300 hover:bg-${selectedTheme}-400 active:bg-${selectedTheme}-200`}>
            <MdClose className='w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />
          </button>
        </div>

        <form className={`flex flex-col gap-4 mx-5 my-2 font-semibold`} onSubmit={handleSubmit}>
          <div className="flex gap-3 items-center justify-start">
            <label htmlFor="name">Patient's Name:</label>
            <input 
              required 
              maxLength={50} 
              minLength={1}
              type="text" 
              name="name" 
              id="name" 
              value={name} 
              onChange={(e) => {
                const alphabetsOnly = /^[a-zA-Z\s]*$/;
                if (alphabetsOnly.test(e.target.value)) setName(e.target.value);
              }} 
              className={`text-xs md:text-sm lg:text-base grow p-2 rounded-lg bg-${selectedTheme}-50 border-transparent focus:ring-0 focus:border-transparent`}
              autoComplete="off"
              onBlur={() => setSuggestions([])}
              onKeyDown={handleEnter}
              list="nameResults"
              placeholder="Type your name then press ENTER to search the records"
            />
            <datalist id="nameResults">
              {suggestions && suggestions.slice(0, 5).map((name, index) => (
                <option key={index} value={name} />
              ))}
            </datalist>
          </div>
          <div className="flex gap-3 items-center justify-start">
            <label htmlFor="barangay">Patient's Barangay:</label>
            <input 
              required 
              maxLength={50} 
              type="text" 
              name="barangay" 
              id="barangay" 
              disabled
              value={barangay} 
              className={`text-xs md:text-sm lg:text-base grow p-2 rounded-lg bg-${selectedTheme}-200 text-${selectedTheme}-800 border-transparent focus:ring-0 focus:border-transparent`} 
              autoComplete="off"
            />
          </div>
          <div className="flex gap-3 items-center justify-start">
            <label htmlFor="gender">Choose a gender:</label>
            <input 
              required 
              maxLength={50} 
              type="text" 
              name="gender" 
              id="gender" 
              disabled
              value={gender} 
              className={`text-xs md:text-sm lg:text-base grow p-2 rounded-lg bg-${selectedTheme}-200 text-${selectedTheme}-800 border-transparent focus:ring-0 focus:border-transparent`} 
              autoComplete="off"
            />
          </div>
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
                id="priority"
                name="status"
                value="priority"
                className='text-xs md:text-sm lg:text-base'
                checked={status === 'priority'}
                onChange={() => setStatus('priority')}
              />
              <Label htmlFor="priority">Priority</Label>
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
          <button 
            type="submit" 
            className={`py-2 px-4 hover:shadow-md font-semibold rounded-lg transition-colors duration-200 ${barangay && gender ? `text-${selectedTheme}-100 bg-${selectedTheme}-600 hover:cursor-pointer shadow-sm` : `shadow-inner text-${selectedTheme}-100 bg-${selectedTheme}-400 hover:cursor-not-allowed`}`}
            disabled={!barangay || !gender}
          >
            {isLoading || error ? <Spinner /> : 'Submit Edit'}
          </button>
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
  );
}
 
export default AddToQueue;