import RecordForm from './Forms/RecordForm';
import PharmacyForm from './Forms/PharmacyForm';
import DonorForm from './Forms/DonorForm';
import { MdClose, MdCreate } from "react-icons/md";
import { useContext } from 'react';
import { colorTheme } from '../../../../App';

const SelectedForm = ({ formType, toggle }) => {
  const [selectedTheme] = useContext(colorTheme);

  if (formType === 'records') {
    return (
      <>
        <RecordForm close={toggle}>
          <div className={`fixed top-0 left-0 right-0 flex justify-between items-center p-5 bg-${selectedTheme}-300 text-${selectedTheme}-800 border-b-[1px] shadow-md drop-shadow-md border-${selectedTheme}-950`}>
            <div className='flex items-center'>
              <MdCreate className='mr-2 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6'/>
              <p className='font-bold text-base md:text-lg lg:text-xl'>Add new record</p>
            </div>
            <button onClick={() => toggle()} className={`transition-colors duration-300 p-2 rounded-3xl bg-${selectedTheme}-400 hover:bg-${selectedTheme}-500 active:bg-${selectedTheme}-200`}>
              <MdClose className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6'/>
            </button>
          </div>
        </RecordForm>
      </>
    );
  } else if (formType === 'pharmacy') {
    return (
      <div>
        <PharmacyForm close={toggle}>
          <div className={`fixed top-0 left-0 right-0 flex justify-between items-center p-5 bg-${selectedTheme}-300 text-${selectedTheme}-800 border-b-[1px] shadow-md drop-shadow-md border-${selectedTheme}-950`}>
            <div className='flex items-center'>
              <MdCreate className='mr-2 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6'/>
              <p className='font-bold text-base md:text-lg lg:text-xl'>Add new record</p>
            </div>
            <button onClick={() => toggle()} className={`transition-colors duration-300 p-2 rounded-3xl bg-${selectedTheme}-400 hover:bg-${selectedTheme}-500 active:bg-${selectedTheme}-200`}>
              <MdClose className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6'/>
            </button>
          </div>
        </PharmacyForm>
      </div>
    );
  } else if (formType === 'blood_unit') {
    return (
      <div>
        <DonorForm close={toggle} />
      </div>
    );
  }
}

const FormModal = ({ formRef, toggleForm, formType}) => {
  
  return ( 
    <dialog ref={formRef} className='relative text-xs md:text-sm lg:text-base rounded-lg drop-shadow-lg'>
      <SelectedForm formType={formType} toggle={toggleForm}/>
    </dialog>
  )
}
 
export default FormModal;