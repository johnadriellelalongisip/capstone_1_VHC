import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import useQuery from "../hooks/useQuery";
import { Spinner } from "flowbite-react";
import useDeviceId from "../hooks/useDeviceId";
import useCurrentTime from "../hooks/useCurrentTime";

const Login = () => {
  const { deviceId } = useDeviceId();
  const { mysqlTime } = useCurrentTime();
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const { isLoading, userAuth } = useQuery();
  const myDevice = String(deviceId);
  const [payload, setPayload] = useState({
    username: "",
    password: "",
    dateTime: String(mysqlTime)
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const history = {};
    const Hkey = String(mysqlTime);
    history[Hkey] = "Logged In";
    const ipAddress = sessionStorage.getItem("myIpAddress");
    if (ipAddress) {
      const newPayload = {
        ...payload,
        deviceId: myDevice,
        history: history,
        ipAddress: ipAddress
      };
      await userAuth(newPayload);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload(prevPayload => ({
      ...prevPayload,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-no-repeat bg-cover bg-center text-sm md:text-base lg:text-md">
      <div className="flex flex-col md:flex-row lg:flex-row w-auto h-auto bg-sky-200/80 rounded-lg shadow-sky-950 shadow-2xl border-[1px] border-sky-900/40 border-solid">
        <div className="md:w-full flex flex-col items-center justify-center text-center md:border-r-[1px] lg:border-r-2 border-solid border-slate-500 p-3 md:p-6 lg:p-9">
          <img src="MHO_logo.png" alt="..." className="w-14 h-14 md:w-20 md:h-20 lg:w-28 lg:h-28"/>
          <p className="text-center font-semibold block md:hidden lg:hidden text-sky-900 drop-shadow-sm">Login Here</p>
        </div>
        <div className="flex flex-col m-2">
          <p className="text-center font-semibold p-5 hidden md:block lg:block text-sky-700 drop-shadow-sm">Login Here</p>
          <form onSubmit={handleSubmit} className="w-full flex flex-col justify-start items-start gap-5 p-2 md:p-3 lg:p-4">
            <div className="flex justify-between w-full items-center gap-4">
              <label className="font-semibold text-sky-900" htmlFor="username">Username:</label>
              <input 
                required
                type="text" 
                name="username" 
                id="username" 
                value={payload.username}
                onChange={handleChange}
                className="bg-sky-700/90 text-sky-50 rounded-xl p-2 font-semibold drop-shadow-sm"
                maxLength={20}
                autoComplete="username"
              />
            </div>
            <div className="relative flex justify-between w-full items-center gap-2">
              <label className="font-semibold text-sky-900" htmlFor="password">Password:</label>
              <input 
                required
                type={!passwordVisibility ? 'text' : 'password'} 
                name="password" 
                id="password" 
                value={payload.password}
                onChange={handleChange}
                className="bg-sky-700/90 text-sky-50 rounded-xl p-2 font-semibold drop-shadow-sm" 
                maxLength={20}
                autoComplete="off"
              />
              <button className="absolute right-0 p-1 drop-shadow-md" onClick={(e) => {e.preventDefault(); setPasswordVisibility(prev => !prev);}}>
                {
                  passwordVisibility ? (
                  <IoMdEye className="h-5 w-5 hover:text-gray-900 text-gray-800" />
                  ) : (
                  <IoMdEyeOff className="h-5 w-5 hover:text-gray-900 text-gray-800" />
                  )
                }
              </button>
            </div>
            <button disabled={isLoading} type="submit" className={`font-semibold p-2 rounded-md w-full transition-colors duration-200 ${!isLoading ? 'text-sky-100 bg-sky-700 hover:drop-shadow-md hover:bg-sky-800 focus:bg-sky-600 active:bg-sky-300 active:text-sky-600 active:shadow-inner active:ring-2 active:ring-sky-600' : 'text-sky-700 bg-sky-100 shadow-inner' }`}><p className="drop-shadow-lg">{!isLoading ? 'Login' : <Spinner/>}</p></button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
