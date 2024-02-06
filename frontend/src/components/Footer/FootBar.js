import { FaPlusCircle } from "react-icons/fa";

const FootBar = () => {
  return (
    <>
      <div className="flex justify-center items-center text-sky-400">
        <FaPlusCircle className='text-sky-400 w-4 h-4 md:w-8 md:h-8 lg:w-12 lg:h-12' />
      </div>
    </>
  );
}

export default FootBar;