import { Modal } from 'flowbite-react';
import RecordForm from './Forms/RecordForm';
import PharmacyForm from './Forms/PharmacyForm';
import DonorForm from './Forms/DonorForm';
import { MdCreate } from "react-icons/md";
import { useContext } from 'react';
import { colorTheme } from '../../../../App';

const FormModal = ({ isOpen, formType, onClose }) => {
  const [selectedTheme] = useContext(colorTheme);

  if (formType === 'records') {
    return (
      <Modal show={isOpen} onClose={onClose} className={`bg-${selectedTheme}-200`}>
        <Modal.Header className={`bg-${selectedTheme}-600 font-semibold`}><p className={`text-${selectedTheme}-50 flex-nowrap flex items-center`}>
          <span className='mr-1'><MdCreate /></span>
          Add A New Record</p>
        </Modal.Header>
        <Modal.Body>
          <RecordForm />
        </Modal.Body>
      </Modal>
    );
  } else if (formType === 'pharmacy') {
    return (
      <Modal show={isOpen} onClose={onClose}>
        <Modal.Header>Add New Product</Modal.Header>
        <Modal.Body>
          <PharmacyForm />
        </Modal.Body>
      </Modal>
    );
  } else if (formType === 'blood_unit') {
    return (
      <Modal show={isOpen} onClose={onClose}>
        <Modal.Header>Add A Donor</Modal.Header>
        <Modal.Body>
          <DonorForm />
        </Modal.Body>
      </Modal>
    );
  }
}
 
export default FormModal;