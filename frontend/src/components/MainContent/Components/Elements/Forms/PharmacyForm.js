import { Checkbox, Label, Radio, Spinner, TextInput } from 'flowbite-react';

const PharmacyForm = () => {
  
  return (
    <form className="flex flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="firstname" value="First Name" />
        </div>
        <TextInput required maxLength={50} id="firstname" type="text" placeholder="Enter first name. . . . ." shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="middlename" value="Middle Name" />
        </div>
        <TextInput required maxLength={50} id="middlename" type="text" placeholder="Enter middle name. . . . ." shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="lastname" value="Last Name" />
        </div>
        <TextInput required maxLength={50} id="lastname" type="text" placeholder="Enter last name. . . . ." shadow />
      </div>
      <fieldset className="flex flex-row gap-3 p-2">
        <legend className="mr-4">Choose a gender</legend>
        <div className="flex items-center gap-2">
          <Radio
            id="male"
            name="gender"
            value="male"
          />
          <Label htmlFor="male">Male</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            id="female"
            name="gender"
            value="female"
          />
          <Label htmlFor="female">Female</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            id="others"
            name="gender"
            value="others"
          />
          <Label htmlFor="others">Others</Label>
        </div>
      </fieldset>
      <div className='flex flex-col md:flex-row lg:flex-row gap-3'>
        <div className='basis-1/2'>
          <Label htmlFor="barangay" value="Barangay: " />
          <TextInput required className='basis-1/2' id="barangay" type="text" shadow placeholder="Enter barangay. . . . ." />
        </div>
        <div className='basis-1/2'>
          <Label htmlFor="phoneNumber" value="Phone Number: " />
          <TextInput className='basis-1/2' id="phoneNumber" type="text" shadow placeholder="Enter phone number. . . . ." />
        </div>
      </div>
      <div className='block'>
        <div className="mb-2 block">
          <Label htmlFor="familyId" value="Family ID" />
        </div>
        <TextInput 
          id="familyId" 
          type="text" 
          disabled 
          // shadow value={`FAM_ID-${familyId}`} 
        />
      </div>
      <button 
        type="submit" 
        // disabled={isLoading} 
        // className={`font-semibold p-2 rounded-md w-full transition-colors duration-200 ${!isLoading ? `text-${selectedTheme}-100 bg-${selectedTheme}-700 hover:drop-shadow-md hover:bg-${selectedTheme}-800 focus:bg-${selectedTheme}-600 active:bg-${selectedTheme}-300 active:text-${selectedTheme}-600 active:shadow-inner active:ring-2 active:ring-${selectedTheme}-600` : `text-${selectedTheme}-700 bg-${selectedTheme}-100 shadow-inner` }`}
      >
        <p className="drop-shadow-lg">
          {/* {!isLoading ? 'Add New Record' : <Spinner/>} */}
          Add Record
        </p>
      </button>
      <div className="flex items-center justify-end gap-2">
        <Checkbox
          id="accept"
          // checked={dontCloseUponSubmission}
          // onChange={() => setDontCloseUponSubmission((prev) => !prev)}
        />
        <Label htmlFor="accept" className="flex">
          Don't Close Upon Submition
        </Label>
      </div>
    </form>
  );
}

export default PharmacyForm;
