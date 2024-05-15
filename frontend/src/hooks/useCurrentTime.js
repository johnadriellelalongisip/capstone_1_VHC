import { useEffect, useState } from "react";

const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentTime.toLocaleDateString();

  const TimeComponent = () => (
    <p>Time: {formattedTime}</p>
  );
  const DateComponent = () => (
    <p>Date: {formattedDate}</p>
  );
  const offsetInMinutes = currentTime.getTimezoneOffset();
  const adjustedTime = new Date(currentTime.getTime() - (offsetInMinutes * 60000));
  const mysqlTime = adjustedTime.toISOString().slice(0, 19).replace('T', ' ');

  return {
    DateComponent,
    TimeComponent,
    formattedTime,
    formattedDate,
    currentTime,
    mysqlTime,
    weeks,
    months
  };
};
 
export default useCurrentTime;
