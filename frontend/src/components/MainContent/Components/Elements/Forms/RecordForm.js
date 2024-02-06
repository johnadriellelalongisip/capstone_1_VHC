import { Button, Checkbox, Label, Radio, TextInput } from 'flowbite-react';
import { useState, useEffect } from 'react';
import jsonData from '../../../../../common_names_by_gender.json';

const RecordForm = () => {
  const [firstname, setFirstName] = useState('');
  const [middlename, setMiddleName] = useState('');
  const [lastname, setLastName] = useState('');
  const [barangay, setBarangay] = useState('');
  const [gender, setGender] = useState('male');
  const [familyId, setFamilyId] = useState('');
  const [dontCloseUponSubmission, setDontCloseUponSubmission] = useState(true);

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

  useEffect(() => {
    const lowerCaseName = firstname.toLowerCase();
    const capitalizedName = lowerCaseName.charAt(0).toUpperCase() + lowerCaseName.slice(1);  
    if (jsonData.female.includes(capitalizedName)) {
      setGender('female');
    } else if (jsonData.male.includes(capitalizedName)) {
      setGender('male');
    }
  }, [firstname]);

  const handleSubmit = async (e) => {
    const cleanUp = () => {
      setFirstName('');
      setMiddleName('');
      setLastName('');
      setGender('male');
      setBarangay('');
      setFamilyId(GenerateFamId(8).toUpperCase());
    };
    if(dontCloseUponSubmission) {
      e.preventDefault();
      cleanUp();
    }
    console.log('SUBMITTED');
    cleanUp();
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
      <div className='flex justify-between gap-4 items-center'>
        <div>
          <fieldset className="flex max-w-md flex-col gap-4">
            <legend className="mb-4">Choose a gender</legend>
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
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="barangay" value="Barangay" />
          </div>
          <TextInput id="barangay" type="text" shadow placeholder="Enter barangay. . . . ." value={barangay} onChange={(e) => setBarangay(e.target.value)} />
        </div>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="familyId" value="Family ID" />
        </div>
        <TextInput id="familyId" type="text" disabled shadow value={`FAM_ID-${familyId}`} />
      </div>
      <Button type="submit">Add new record</Button>
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
