import { useEffect, useState } from "react";
import useQuery from "./useQuery";
import { socket } from "../socket";

const useSocket = ({ SSName, keyMap, fetchUrl, socketUrl, socketEmit, socketError }) => {
  const [data, setData] = useState([{}]);
  const [SockError, setSockError] = useState(null);
  const { response, error, fetchData } = useQuery();
  const storedRecords = JSON.parse(sessionStorage.getItem(SSName));

  function convertData(data) {
    const newData = data.map(obj => {
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
  }

  function tryThisShet(data) {
    if(JSON.stringify(convertData(data)) !== JSON.stringify(storedRecords)) {
      sessionStorage.setItem(SSName,JSON.stringify(convertData(data)));
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
      tryThisShet(Sdata);
    });
    socket.on(socketError, (error) => {
      setSockError(error);
      console.error('Error retrieving data:', error);
    });
    setTimeout(() => {
      socket.emit(socketEmit);
    },500)
    return () => {
      socket.off(socketUrl);
      socket.off(socketError);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (response && response.status === 200 && response.data) {
      setData(convertData(response.data));
      sessionStorage.setItem(SSName,JSON.stringify(convertData(response.data)));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response,error]);

  return { data, SockError }
  
}
 
export default useSocket;