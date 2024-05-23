import { useLocation } from "react-router-dom";
import Header from "../../Header";
import { MdOutlineSmartToy } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import useQuery from "../../../../hooks/useQuery";
import { socket } from "../../../../socket";
import { colorTheme } from "../../../../App";
import { decryptData } from "../../../../hooks/useCrypto";
import useDeviceId from "../../../../hooks/useDeviceId";
import useCurrentTime from "../../../../hooks/useCurrentTime";

const JsonWebToken = () => {
  const location = useLocation();
  const pathname = location.pathname.slice(1);
  const title = pathname.charAt(0).toUpperCase() + pathname.slice(1);
  const [selectedTheme] = useContext(colorTheme);

  const [messages, setMessages] = useState([{}]);
  const [message, setMessage] = useState('');
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');
  const { userAuth, verifyToken, logoutUser } = useQuery();
  const { deviceId } = useDeviceId();
  const { mysqlTime } = useCurrentTime();

  useEffect(() => {
    socket.on('message', (data) => {
      setMessages((prev) => [
        ...prev,
        { text: data, sender: 'other'}
      ])
      setReceivedMessage(data);
    });
    return () => socket.off('message');
  }, []);

  const handleLogin = async () => {
    const history = {};
    const Hkey = String(mysqlTime);
    history[Hkey] = "Logged In";
    await userAuth({ username: 'qwer', password: 'qwerqwer', deviceId: deviceId, history: history, dateTime: String(mysqlTime)});
  };

  const handleTokenRefresh = async () => {
    await verifyToken();
  };

  const handleLogout = async () => {
    const history = {};
    const Hkey = String(mysqlTime);
    history[Hkey] = "Logged Out";
    const { accessToken } = decryptData(localStorage.getItem('safeStorageData'));
    const decoded = jwtDecode(accessToken);
    await logoutUser({ staff_username: decoded.staff_username, history: history});
    setReceivedMessage('Logged out successfully!');
  }
  
  const handleSendMessage = () => {
    if (!socket.disconnected) {
      socket.emit('newMessage', message);
      setMessages((prev) => [
        ...prev,
        { text: message, sender: 'me' }
      ]);
      setReceivedMessage('');
    } else {
      setReceivedMessage('You are disconnected!');
      setMessage('');
    }
    if (socket.disconnected) {
      setReceivedMessage('Socket is disconnected!');
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-col p-2 mb-4 mx-2 md:mx-3 lg:mx-4 mt-4">
        <div>
          <Header title={title} icon={<MdOutlineSmartToy />} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 p-2 mt-2">
          <div className={`flex flex-col gap-3 justify-center items-center p-4 bg-${selectedTheme}-300 rounded-lg`}>
            <h1 className="text-lg md:text-xl lg:text-2xl">Socket.io with JWT Authentication</h1>
            <h1 className="text-lg md:text-xl lg:text-2xl flex items-center justify-center gap-2">Socket Status <span className={`rounded-full size-2 md:size-3 lg:size-4 ${socket.disconnected ? 'bg-red-500' : 'bg-green-500'}`}></span></h1>
            {!decryptData(localStorage.getItem('safeStorageData')).isLoggedIn ? (
              <button className="p-1 bg-blue-400 text-blue-900 font-semibold text-sm md:text-base lg:text-lg rounded-md drop-shadow-md" onClick={handleLogin}>Login</button>
            ):(
              <button className="p-1 bg-red-400 text-red-900 font-semibold text-sm md:text-base lg:text-lg rounded-md drop-shadow-md" onClick={handleLogout}>Logout</button>
            )}
            <button className="p-1 bg-blue-400 text-blue-900 font-semibold text-sm md:text-base lg:text-lg rounded-md drop-shadow-md" onClick={handleTokenRefresh}>Refresh Token</button>
            <br />
            <div className="flex gap-1 p-2 text-sm md:text-base lg:text-lg font-semibold bg-sky-50 rounded-lg border-transparent drop-shadow-sm">
              <input placeholder="enter username" type="text" name="username" id="username" value={username} onChange={(e) => setusername(e.target.value)}/>
              <input placeholder="enter password" type="password" name="password" id="password" value={password} onChange={(e) => setpassword(e.target.value)}/>
            </div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
            />
            <button className="p-1 bg-blue-400 text-blue-900 font-semibold text-sm md:text-base lg:text-lg rounded-md drop-shadow-md" onClick={handleSendMessage}>Send Message</button>
            <p>Received Message: <span className="p-1 text-base md:text-lg lg:text-xl font-semibold">{receivedMessage}</span></p>
          </div>
          <div className={`flex flex-col gap-3 p-4 bg-${selectedTheme}-300 rounded-lg`}>
            <p className="text-base md:text-lg lg:text-xl font-bold text-start">History</p>
            <div className="my-2 flex flex-col gap-2 overflow-y-auto min-h-max">
              {messages?.map((message, index) => {
                const isSent = message.sender === 'me';
                return (
                  <div
                    key={index}
                    className={`p-2 text-sm md:text-base lg:text-lg font-semibold ${
                      isSent ? 'bg-red-800 text-red-300' : `bg-${selectedTheme}-800 text-${selectedTheme}-300`
                    } rounded-lg ${isSent ? 'text-right' : 'text-left'}`}
                  >
                    {message.text}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonWebToken;
