/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useQuery from "./useQuery";
import { socket } from "../socket";
import useCurrentTime from "./useCurrentTime";

const useSocket = ({ keyMap, fetchUrl, socketUrl, socketEmit, socketError }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [SockError, setSockError] = useState(null);
  const { response, error, fetchData } = useQuery();
  const [storedRecords, setStoredRecords] = useState([]);
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
      setData(convertData(data));
      setLoading(false);
    } else {
      setData(storedRecords);
    }
  };

  useEffect(() => {
    if(storedRecords === undefined || storedRecords === null) {
      setLoading(true);
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
    }
  }, [response,error]);

  return { data, SockError, loading }
  
}
 
export default useSocket;