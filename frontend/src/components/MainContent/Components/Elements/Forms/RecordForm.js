import { Checkbox, Label, Radio, Spinner, TextInput } from 'flowbite-react';
import { useState, useEffect, useContext } from 'react';
import jsonData from '../../../../../common_names_by_gender.json';
import { colorTheme } from '../../../../../App';
import useQuery from '../../../../../hooks/useQuery';
import useCurrentTime from '../../../../../hooks/useCurrentTime';

const RecordForm = () => {
  const [selectedTheme] = useContext(colorTheme);
  const [firstname, setFirstName] = useState('');
  const [middlename, setMiddleName] = useState('');
  const [lastname, setLastName] = useState('');
  const [barangay, setBarangay] = useState('');
  const [gender, setGender] = useState('male');
  const [familyId, setFamilyId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dontCloseUponSubmission, setDontCloseUponSubmission] = useState(false);
  const { mysqlTime } = useCurrentTime();

  const { response, isLoading, error, addData } = useQuery();

  useEffect(() => {
    setFamilyId(GenerateFamId(8).toUpperCase());
  }, []);

  const GenerateFamId = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  const parsePhoneNumber = (e) => {
    const userInput = e.target.value;
    const onlyNumbers = userInput.replace(/\D/g, '');
    setPhoneNumber(onlyNumbers);
  }

  useEffect(() => {
    const lowerCaseName = firstname.toLowerCase();
    const capitalizedName = lowerCaseName.charAt(0).toUpperCase() + lowerCaseName.slice(1);  
    if (jsonData.female.includes(capitalizedName)) {
      setGender('female');
    } else if (jsonData.male.includes(capitalizedName)) {
      setGender('male');
    }
  }, [firstname]);

  const cleanUp = () => {
    setFirstName('');
    setMiddleName('');
    setLastName('');
    setGender('male');
    setBarangay('');
    setPhoneNumber('');
    setFamilyId(GenerateFamId(8).toUpperCase());
  };

  const handleSubmit = async (e) => {
    const history = {logs:{"Record added": String(mysqlTime)}};
    const payload = {
      firstName: firstname,
      middleName: middlename,
      lastName: lastname,
      gender: gender,
      barangay: barangay,
      family_id: `FAMILY_ID-${familyId}`,
      phone_number: phoneNumber,
      date_added: mysqlTime,
      history: JSON.stringify(history)
    }
    if(dontCloseUponSubmission) {
      e.preventDefault();
      addData('addRecord',payload);
      cleanUp();
    } else {
      e.preventDefault();
      // console.log('SUBMITTED : ', payload );
      addData('addRecord',payload);
      cleanUp();
    }
  }

  // THIS FORM SHOULD AUTO COMPLETE THE BARANGAY DEPENDING ON THE FAMILY NAME THAT IS ALSO WITHIN WHAT BARANGAY THE FAMILY NAME IS IN
  // SHOULD CHECK FAMILY ID FIRST BEFORE PASSING WHETHER IT ALREADY EXISTS OR NOT
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="firstname" value="First Name" />
        </div>
        <TextInput maxLength={50} id="firstname" type="text" placeholder="Enter first name. . . . ." required shadow value={firstname} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="middlename" value="Middle Name" />
        </div>
        <TextInput maxLength={50} id="middlename" type="text" placeholder="Enter middle name. . . . ." required shadow value={middlename} onChange={(e) => setMiddleName(e.target.value)} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="lastname" value="Last Name" />
        </div>
        <TextInput maxLength={50} id="lastname" type="text" placeholder="Enter last name. . . . ." required shadow value={lastname} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <fieldset className="flex flex-row gap-3 p-2">
        <legend className="mr-4">Choose a gender</legend>
        <div className="flex items-center gap-2">
          <Radio
            id="male"
            name="gender"
            value="male"
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
            checked={gender === 'others'}
            onChange={() => setGender('others')}
          />
          <Label htmlFor="others">Others</Label>
        </div>
      </fieldset>
      <div className='flex flex-col md:flex-row lg:flex-row gap-3'>
        <div className='basis-1/2'>
          <Label htmlFor="barangay" value="Barangay: " />
          <TextInput className='basis-1/2' id="barangay" type="text" shadow placeholder="Enter barangay. . . . ." value={barangay} onChange={(e) => setBarangay(e.target.value)} />
        </div>
        <div className='basis-1/2'>
          <Label htmlFor="phoneNumber" value="Phone Number: " />
          <TextInput className='basis-1/2' id="phoneNumber" type="text" shadow placeholder="Enter phone number. . . . ." value={phoneNumber} onChange={parsePhoneNumber} maxLength={12} minLength={11}/>
        </div>
      </div>
      <div className='block'>
        <div className="mb-2 block">
          <Label htmlFor="familyId" value="Family ID" />
        </div>
        <TextInput id="familyId" type="text" disabled shadow value={`FAM_ID-${familyId}`} />
      </div>
      <button disabled={isLoading} type="submit" className={`font-semibold p-2 rounded-md w-full transition-colors duration-200 ${!isLoading ? `text-${selectedTheme}-100 bg-${selectedTheme}-700 hover:drop-shadow-md hover:bg-${selectedTheme}-800 focus:bg-${selectedTheme}-600 active:bg-${selectedTheme}-300 active:text-${selectedTheme}-600 active:shadow-inner active:ring-2 active:ring-${selectedTheme}-600` : `text-${selectedTheme}-700 bg-${selectedTheme}-100 shadow-inner` }`}><p className="drop-shadow-lg">{!isLoading ? 'Add New Record' : <Spinner/>}</p></button>
      <div className="flex items-center justify-end gap-2">
        <Checkbox
          id="accept"
          checked={dontCloseUponSubmission}
          onChange={() => setDontCloseUponSubmission((prev) => !prev)}
        />
        <Label htmlFor="accept" className="flex">
          Don't Close Upon Submition
        </Label>
      </div>
    </form>
  );
}

export default RecordForm;
