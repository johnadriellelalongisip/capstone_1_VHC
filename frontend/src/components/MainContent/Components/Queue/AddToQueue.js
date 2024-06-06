import { useContext, useEffect, useState } from "react";
import { colorTheme } from "../../../../App";
import { MdClose, MdPeople } from "react-icons/md";
import { Checkbox, Label, Radio, Spinner } from "flowbite-react";
import useQuery from "../../../../hooks/useQuery";
import useCurrentTime from "../../../../hooks/useCurrentTime";
import { socket } from "../../../../socket";

const AddToQueue = ({ ATref, ATonClick }) => {
  const [selectedTheme] = useContext(colorTheme);
  const { isLoading, error, addData } = useQuery();
  const { mysqlTime } = useCurrentTime();
  const [suggestions, setSuggestions] = useState([]);
  const [payload, setPayload] = useState({
    name: "",
    barangay: "",
  });
  const [isBarangayValid, setIsBarangayValid] = useState(false);
  const [gender, setGender] = useState('male');
  const [status, setStatus] = useState('waiting');
  const [isChecked, setIsChecked] = useState(true);
  const barangays = [
    'Alcate',
    'Antonino',
    'Babangonan',
    'Bagong Buhay',
    'Bagong Silang',
    'Bambanin',
    'Bethel',
    'Canaan',
    'Concepcion',
    'Duongan',
    'Leido',
    'Loyal',
    'Mabini',
    'Macatoc',
    'Malabo',
    'Merit',
    'Ordovilla',
    'Pakyas',
    'Poblacion I',
    'Poblacion II',
    'Poblacion III',
    'Poblacion IV',
    'Sampaguita',
    'San Antonio',
    'San Cristobal',
    'San Gabriel',
    'San Gelacio',
    'San Isidro',
    'San Juan',
    'San Narciso',
    'Urdaneta',
    'Villa Cerveza',
  ];

  function cleanUp() {
    setPayload({
      name: "",
      barangay: ""
    });
  };

  function toggleClose() {
    cleanUp();
    ATonClick();
  }

  function setNewSuggestions(newData) {
    setSuggestions((prevSuggestions) => {
      const newSuggestions = newData.map((data) => `${String(data.Firstname)} ${String(data.Lastname)}`);
      if (newSuggestions !== null || newSuggestions !== undefined) {
        return [...prevSuggestions, ...newSuggestions];
      } else {
        return null;
      }
    });
  }
  
  useEffect(() => {
    // setIsBarangayValid(barangays.includes(payload.barangay.charAt(0).toUpperCase() + payload.barangay.slice(1)));
    setIsBarangayValid(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload.barangay]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isChecked) {
      addData('addToQueue', payload);
      cleanUp();
    } else {
      addData('addToQueue', payload);
      cleanUp();
      ATonClick();
    }
    setTimeout(() => {
      socket.emit("updateQueue");
    },500);
  };

  const handleEnter = (event) => {
    const records = JSON.parse(sessionStorage.getItem('sessionRecords'));
    if (event.key === 'Enter' && payload.name && records) {
      const foundRecords = records.filter(prev => {
        return prev.Firstname.toLowerCase().includes(payload.name.toLowerCase()) || prev.Lastname.toLowerCase().includes(payload.name.toLowerCase());
      });
      setNewSuggestions(foundRecords);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const specialCharacterPattern = /[!@#$%^&*()_+\-=\]{};':"\\|,.<>?]/g;
    if (!specialCharacterPattern.test(value)) {
      setPayload((prevFormData) => ({
          ...prevFormData,
          [name]: value,
          time_added: String(mysqlTime),
          status: status,
          gender: gender
      }));
    } else {
      e.preventDefault();
    }
  };
  
  return (
    <dialog ref={ATref} className={`rounded-lg bg-gray-100 drop-shadow-lg w-80 md:w-[500px] lg:w-[600px]`}>
      <div className="flex flex-col text-xs md:text-sm lg:text-base">

        <div className={`flex justify-between items-center p-2 text-${selectedTheme}-600 border-b-[1px] border-solid border-${selectedTheme}-500 shadow-md shadow-${selectedTheme}-600 mb-2`}>
          <div className="flex items-center p-1 gap-1">
            <MdPeople className='w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8' />
            <strong className="font-semibold drop-shadow-md text-sm md:text-base lg:text-lg">Add to query
            {/* <span className={`ml-2 text-${selectedTheme}-500 font-bold`}>Patient's Number: 55</span> */}
            </strong>
          </div>
          <button onClick={() => toggleClose()} className={`transition-colors duration-200 rounded-3xl p-1 bg-${selectedTheme}-300 hover:bg-${selectedTheme}-400 active:bg-${selectedTheme}-200`}>
            <MdClose className='w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />
          </button>
        </div>

        <form className={`flex flex-col gap-4 mx-5 my-2 font-semibold`} onSubmit={handleSubmit}>
          <div className="flex gap-3 items-center justify-start">
            <label htmlFor="name">Patient's Name:</label>
            <input 
              required 
              maxLength={50} 
              type="text" 
              name="name" 
              id="name" 
              value={payload.name} 
              onChange={handleChange} 
              className={`text-xs md:text-sm lg:text-base grow p-2 rounded-lg bg-${selectedTheme}-50 border-transparent focus:ring-0 focus:border-transparent`}
              autoComplete="off"
              onBlur={() => setSuggestions([])}
              onKeyDown={handleEnter}
              list="nameResults"
              placeholder="Type then press ENTER to search the records"
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
              value={payload.barangay} 
              onChange={handleChange} 
              className={`text-xs md:text-sm lg:text-base grow p-2 rounded-lg bg-${selectedTheme}-50 border-transparent focus:ring-0 focus:border-transparent`} 
              autoComplete="off"
              list="barangaySuggestions"
            />
            <datalist id="barangaySuggestions">
              {payload.barangay.length >= 2 && barangays.map((barangay, index) => (
                <option key={index} value={barangay} />
              ))}
            </datalist>
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
          <button type="submit" className={`py-2 px-4 hover:shadow-md font-semibold rounded-lg transition-colors duration-200 ${payload.name && payload.barangay && isBarangayValid ? `text-${selectedTheme}-100 bg-${selectedTheme}-600 hover:cursor-pointer shadow-sm` : `shadow-inner text-${selectedTheme}-100 bg-${selectedTheme}-400 hover:cursor-not-allowed`}`} disabled={!payload.name || !isBarangayValid}>{isLoading || error ? <Spinner /> : 'Submit Edit'}</button>
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