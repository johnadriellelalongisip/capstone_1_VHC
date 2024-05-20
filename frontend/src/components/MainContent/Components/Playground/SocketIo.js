import { useLocation } from "react-router-dom";
import Header from "../../Header";
import { MdOutlineSmartToy } from "react-icons/md";

const SocketIo = () => {
  const location = useLocation();
  const pathname = location.pathname.slice(1);
  const title = pathname.charAt(0).toUpperCase() + pathname.slice(1);
  

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-col p-2 mb-4 mx-2 md:mx-3 lg:mx-4 mt-4">
        <div>
          <Header title={ title } icon={<MdOutlineSmartToy />}/>
        </div>
        <div className="min-h-screen h-screen overflow-y-auto scroll-smooth p-2 mt-2">
          <div className="flex flex-col justify-start items-center gap-3">
          
          </div>  
        </div>
      </div>
    </div>
  );
}
 
export default SocketIo;