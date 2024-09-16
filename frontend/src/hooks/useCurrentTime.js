import { useEffect, useState } from "react";

const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const formatDateString = (value) => {
    return value < 10 ? '0' + value : '' + value;
  };
  const startDate = `${currentYear}-${formatDateString(currentMonth)}-${currentDay.length === 1 ? `0${currentDay}` : currentDay}`;
  const endDate = `${currentYear}-${formatDateString(currentMonth)}-${daysInMonth}`;

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearTimeout(intervalId);
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
    startDate,
    endDate,
    currentTime,
    mysqlTime,
    weeks,
    months,
  };
};
 
export default useCurrentTime;
