/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useQuery from "./useQuery";
import { socket } from "../socket";
import useCurrentTime from "./useCurrentTime";
// import useIndexedDB from "./useIndexedDb";

const useSocket = ({ SSName, keyMap, fetchUrl, socketUrl, socketEmit, socketError }) => {
  const [data, setData] = useState([{}]);
  const [SockError, setSockError] = useState(null);
  const { response, error, fetchData } = useQuery();
  // const { updateStore, getAllItems } = useIndexedDB("TheDatabase", SSName);
  const [storedRecords, setStoredRecords] = useState([]);
  // const storedRecords = JSON.parse(sessionStorage.getItem(SSName));
  const { mysqlTime } = useCurrentTime();

  function convertData(data) {
    const newData = data && data.map(obj => {
      const newObj = {};
      Object.keys(obj).forEach(key => {
        if (keyMap[key]) {
          newObj[keyMap[key]] = obj[key];
        } else {
          newObj[key] = obj[key];
        }
      });
      return newObj;
    });
    return newData;
  };

  async function tryThisShet(data) {
    if(convertData(data) !== storedRecords) {
      setStoredRecords(convertData(data));
      // updateStore(SSName, convertData(data));
      setData(convertData(data));
    } else {
      setData(storedRecords);
    }
  };

  useEffect(() => {
    if(storedRecords === undefined || storedRecords === null) {
      fetchData(fetchUrl);
    } else {
      setData(storedRecords);
    }
    socket.on(socketUrl, (Sdata) => {
      if (Sdata && Sdata.length > 0) {
        tryThisShet(Sdata);
      }
    });
    socket.on(socketError, (error) => {
      setSockError(error);
      console.error('Error retrieving data:', error);
    });
    setTimeout(() => {
      socket.emit(socketEmit, {dateTime: String(mysqlTime)});
    },500)
    return () => {
      socket.off(socketUrl);
      socket.off(socketError);
    };
  }, []);

  useEffect(() => {
    if (response && response.status === 200 && response.data) {
      setData(convertData(response.data));
      setStoredRecords(response.data);
      // sessionStorage.setItem(SSName,JSON.stringify(convertData(response.data)));
    }
  }, [response,error]);

  return { data, SockError }
  
}
 
export default useSocket;