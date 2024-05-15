import { useContext, useEffect, useState } from "react";
import { colorTheme } from "../../../../../App";
import useQuery from "../../../../../hooks/useQuery";
import { Label, Radio, Spinner } from "flowbite-react";
import useCurrentTime from "../../../../../hooks/useCurrentTime";
import { socket } from "../../../../../socket";

const NewAccountForm = ({ close, children }) => {
  const [selectedTheme] = useContext(colorTheme);
  const { mysqlTime } = useCurrentTime();
  const { isLoading, addData } = useQuery();
  const [isWarningShown, setIsWarningShown] = useState(false);
  const [warning, setWarning] = useState("");
  const [repassword, setRepassword] = useState("");
  const [payload, setPayload] = useState({
    username: "",
    password: "",
    email: "",
    role: "user",
    accessibility: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'repassword') {
      setRepassword(value);
    }
    setPayload((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    const history = {};
    const JKey = String(mysqlTime);
    history[JKey] = "Account Added";    
    setPayload((prev) => ({
      ...prev,
      history,
      current_datetime: String(mysqlTime)
    }));
  }

  useEffect(() => {
    if ((payload.password !== repassword) && (repassword.length >= 8 && payload.password.length >= 8)) {
      setIsWarningShown(true);
      setWarning("Password does not match!");
    } else {
      setIsWarningShown(false);
    }
  }, [payload.password, repassword]);

  function cleanUp() {
    setPayload({
      username: "",
      password: "",
      email: "",
      role: "user",
      accessibility: ""
    });
    setRepassword("");
    setIsWarningShown(false);
    close();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((repassword.length > 0 && repassword.length < 8) || (payload.password.length > 0 && payload.password.length < 8)) {
      setIsWarningShown(true);
      setWarning("Password must be greater than 8 characters!");
    } else {
      addData('addStaff',payload);
      setIsWarningShown(false);
      cleanUp();
    }
    setTimeout(() => {
      socket.emit("updateStaff");
    }, 500)
  }
  
  return (
    <>
      {children}
      <form className="flex flex-col gap-4 m-5 mt-20 md:mt-24 lg:mt-24 w-[500px]" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <label htmlFor="username" className='text-xs md:text-sm lg:text-base font-semibold'>User Name</label>
          </div>
          <input 
            type="text" 
            required 
            className={`text-xs md:text-sm lg:text-base shadow-md rounded-lg w-full bg-transparent border-[1px] border-${selectedTheme}-800`}
            maxLength={50} 
            id="username" 
            name="username"
            placeholder="Enter user name. . . . ." 
            value={payload.username} 
            onChange={handleChange} 
            autoComplete="off"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <label htmlFor="password" className='text-xs md:text-sm lg:text-base font-semibold'>Password</label>
          </div>
          <input 
            required 
            className={`text-xs md:text-sm lg:text-base shadow-md rounded-lg w-full bg-transparent border-[1px] border-${selectedTheme}-800`}
            maxLength={50} 
            minLength={8}
            id="password"
            name="password"
            type="password" 
            placeholder="Create a unique password. . . . ."
            value={payload.password}
            onChange={handleChange} 
            autoComplete="off"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <label htmlFor="repassword" className='text-xs md:text-sm lg:text-base font-semibold'>Re-enter Password</label>
          </div>
          <input 
            required 
            className={`text-xs md:text-sm lg:text-base shadow-md rounded-lg w-full bg-transparent border-[1px] border-${selectedTheme}-800`}
            maxLength={50} 
            minLength={8}
            id="repassword"
            name="repassword"
            type="password" 
            placeholder="Re-enter your unique password. . . . ."
            value={repassword}
            onChange={handleChange} 
            autoComplete="off"
          />
          </div>

          {isWarningShown && 
          <p className={`text-wrap text-red-700 text-xs md:text-sm lg:text-sm font-thin p-1 bg-${selectedTheme}-50 rounded-lg text-center`}>
            {warning}
          </p>}

        <fieldset className="flex flex-row gap-3 p-2">
          <legend className="mr-4 text-xs md:text-sm lg:text-base">Choose a role</legend>
          <div className="flex items-center gap-2">
            <Radio
              id="user"
              name="role"
              value="user"
              className='text-xs md:text-sm lg:text-base'
              checked={payload.role === 'user'}
              onChange={handleChange}
            />
            <Label htmlFor="user">User</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio
              id="admin"
              name="role"
              value="admin"
              className='text-xs md:text-sm lg:text-base'
              checked={payload.role === 'admin'}
              onChange={handleChange}
            />
            <Label htmlFor="admin">Admin</Label>
          </div>
        </fieldset>
        <div>
          <div className="mb-2 block">
            <label htmlFor="email" className='text-xs md:text-sm lg:text-base font-semibold'>Email</label>
          </div>
          <input 
            required 
            className={`text-xs md:text-sm lg:text-base shadow-md rounded-lg w-full bg-transparent border-[1px] border-${selectedTheme}-800`}
            maxLength={50} 
            minLength={8}
            id="email"
            name="email"
            type="email" 
            placeholder="Add a valid email. . . . ."
            value={payload.email}
            onChange={handleChange} 
            autoComplete="off"
          />
        </div>
        <button disabled={isLoading} type="submit" className={`font-semibold p-2 rounded-md w-full transition-colors duration-200 ${!isLoading ? `text-${selectedTheme}-100 bg-${selectedTheme}-700 hover:drop-shadow-md hover:bg-${selectedTheme}-800 focus:bg-${selectedTheme}-600 active:bg-${selectedTheme}-300 active:text-${selectedTheme}-600 active:shadow-inner active:ring-2 active:ring-${selectedTheme}-600` : `text-${selectedTheme}-700 bg-${selectedTheme}-100 shadow-inner` }`}><p className="drop-shadow-lg">{!isLoading ? 'Add New Record' : <Spinner/>}</p></button>
      </form>
    </>
  );
}
 
export default NewAccountForm;