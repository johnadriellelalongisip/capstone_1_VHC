import { useContext, useEffect, useRef, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useQuery from "../hooks/useQuery";
import { Spinner } from "flowbite-react";
import useCurrentTime from "../hooks/useCurrentTime";
import { notificationMessage } from "../App";

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [notifMessage] = useContext(notificationMessage);
  const promptRef = useRef(null);
  const navigate = useNavigate();
  const { mysqlTime } = useCurrentTime();

  const { response, isLoading, error, addData } = useQuery();
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  function cleanUp() {
    setUsername('');
    setPassword('');
    setEmail('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      username: username,
      password: password,
      email: email,
      current_datetime: mysqlTime,
    };
    addData('addStaff',payload);
  };

  useEffect(() => {
    if (response) {
      if (response.status === 200) {
        console.log("Registration successful:", response.message);
        navigate('/login');
        cleanUp();
      }
    } else if (error) {
      if (error) {
        console.log("An error occured on the server:", error);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, error]);

  useEffect(() => {
    if(notifMessage) {
      promptRef.current.show();
    } else {
      promptRef.current.close();
    }
  }, [notifMessage]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-no-repeat bg-cover bg-center text-sm md:text-base lg:text-md">
      <div className="flex flex-col md:flex-row lg:flex-row w-auto h-auto bg-sky-200/80 rounded-lg shadow-sky-950 shadow-2xl border-[1px] border-sky-900/40 border-solid">
        <div className="md:w-full flex flex-col items-center justify-center text-center md:border-r-[1px] lg:border-r-2 border-solid border-slate-500 p-3 md:p-6 lg:p-9">
          <img src="MHO_logo.png" alt="..." className="w-14 h-14 md:w-20 md:h-20 lg:w-28 lg:h-28"/>
          <p className="text-center font-semibold block md:hidden lg:hidden text-sky-900 drop-shadow-sm">Register Here</p>
        </div>
        <div className="relative flex flex-col p-2">
          <p className="text-center font-semibold p-5 hidden md:block lg:block text-sky-700 drop-shadow-sm">Register Here</p>
          <form onSubmit={handleSubmit} className="w-full flex flex-col justify-start items-start gap-5 p-2 md:p-3 lg:p-4">
            <div className="flex justify-between w-full items-center gap-4">
              <label className="font-semibold text-sky-900" htmlFor="username">Username:</label>
              <input
                required 
                type="text" 
                name="username" 
                id="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-sky-700/90 text-sky-50 rounded-xl p-2 font-semibold drop-shadow-sm"
                maxLength={20}
                minLength={8}
                autoComplete="off"
              />
            </div>
            <div className="relative flex justify-between w-full items-center gap-2">
              <label className="font-semibold text-sky-900" htmlFor="password">Password:</label>
              <input
                required 
                type={!passwordVisibility ? 'text' : 'password'} 
                name="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-sky-700/90 text-sky-50 rounded-xl p-2 font-semibold drop-shadow-sm" 
                maxLength={20}
                minLength={8}
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
            <div className="flex justify-between w-full items-center gap-4">
              <label className="font-semibold text-sky-900" htmlFor="username">Email:</label>
              <input
                required
                type="email" 
                name="email" 
                id="email" 
                value={email}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                maxLength={100}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-sky-700/90 text-sky-50 rounded-xl p-2 font-semibold drop-shadow-sm"
                autoComplete="off"
              />
            </div>
            <button disabled={isLoading} type="submit" className={`font-semibold p-2 rounded-md w-full transition-colors duration-200 ${!isLoading ? 'text-sky-100 bg-sky-700 hover:drop-shadow-md hover:bg-sky-800 focus:bg-sky-600 active:bg-sky-300 active:text-sky-600 active:shadow-inner active:ring-2 active:ring-sky-600' : 'text-sky-700 bg-sky-100 shadow-inner' }`}><p className="drop-shadow-lg">{!isLoading ? 'Create' : <Spinner/>}</p></button>
          </form>
          <dialog ref={promptRef} className="absolute bottom-[-30px] right-0 left-0 bg-transparent">
            <div className="bg-red-200 p-1 text-red-600 font-medium text-center rounded-md drop-shadow-md">
              {notifMessage}
            </div>
          </dialog>
          {/* <div className="text-center font-normal text-xs">
            <p>Already have an account? <button onClick={goToLogin} className="font-semibold hover:underline hover:text-sky-800">Login here</button></p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Register;
