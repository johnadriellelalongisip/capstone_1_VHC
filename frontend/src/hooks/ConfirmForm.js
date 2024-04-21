import { useContext } from "react";
import { colorTheme } from "../App";
import { MdCheck, MdClose } from "react-icons/md";
import { Tooltip } from "flowbite-react";

const ConfirmForm = ({ confirmRef, message, onConfirm, confirmMessage, onCancel, cancelMessage, onBack, backMessage }) => {
  const [selectedTheme] = useContext(colorTheme);

  return (
    <dialog ref={confirmRef} className={`rounded-lg bg-${selectedTheme}-200 drop-shadow-lg min-w-50 md:w-[400px] lg:w-[500px]`}>
      <div className={`m-3 flex flex-col gap-2 text-xs md:text-sm lg:text-base text-${selectedTheme}-700`}>
        <div className="self-end p-1">
          <Tooltip content={backMessage} animation="duration-500">
            <MdClose onClick={() => onBack()} className="size-6 md:size-7 lg:size-8" />
          </Tooltip>
        </div>
        <div className="flex flex-col">
          <p className="p-2 font-bold text-sm md:text-base lg:text-lg">{message}</p>
          <p className="p-2 font-thin">Choose an option whether to proceed or close the dialog to cancel.</p>
        </div>
        <div className="flex gap-2 justify-end">
          <Tooltip content={confirmMessage} animation="duration-500">
            <button onClick={() => onConfirm()} className={`flex gap-2 transition-colors duration-200 rounded-3xl p-1 bg-${selectedTheme}-300 hover:bg-${selectedTheme}-400 active:bg-${selectedTheme}-200`}>
              <MdCheck className='size-6 md:size-7 lg:size-8' />
            </button>
          </Tooltip>
          <Tooltip content={cancelMessage} animation="duration-500">
            <button onClick={() => onCancel()} className={`flex gap-2 transition-colors duration-200 rounded-3xl p-1 bg-${selectedTheme}-300 hover:bg-${selectedTheme}-400 active:bg-${selectedTheme}-200`}>
              <MdClose className='size-6 md:size-7 lg:size-8' />
            </button>
          </Tooltip>
        </div>
      </div>
    </dialog>
  );
}
 
export default ConfirmForm;