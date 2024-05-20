import { useLocation } from "react-router-dom";
import Header from "../../Header";
import { MdOutlineSmartToy } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import useQuery from "../../../../hooks/useQuery";
import { socket } from "../../../../socket";
import { colorTheme } from "../../../../App";

const JsonWebToken = () => {
  const location = useLocation();
  const pathname = location.pathname.slice(1);
  const title = pathname.charAt(0).toUpperCase() + pathname.slice(1);
  const [selectedTheme] = useContext(colorTheme);
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');
  const { userAuth, verifyToken, logoutUser } = useQuery();

  useEffect(() => {
    if (socket.disconnected) {
      setReceivedMessage("Token expired!");
    }
    socket.on('message', (data) => {
      setReceivedMessage(data);
    });
    return () => socket.off('message');
  }, []);

  const handleLogin = async () => {
    await userAuth({ username: 'ASDF', password: 'admin' });
    socket.connect();
  };

  const handleTokenRefresh = async () => {
    await verifyToken();
    socket.auth.token = localStorage.getItem('accessToken');
    socket.connect();
    if (!socket.disconnected) {
      setReceivedMessage('Token Refreshed!');
    }
  };

  const handleLogout = async () => {
    const decoded = jwtDecode(localStorage.getItem("accessToken"));
    await logoutUser({ staff_username: decoded.staff_username});
    socket.auth.token = null;
    socket.disconnect();
    setReceivedMessage('Logged out successfully!');
  }
  
  const handleSendMessage = () => {
    socket.emit('newMessage', message);
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 min-h-screen h-screen overflow-y-auto scroll-smooth p-2 mt-2">
          <div className={`h-96 flex flex-col gap-3 justify-center items-center p-4 bg-${selectedTheme}-300 rounded-lg`}>
            <h1 className="text-lg md:text-xl lg:text-2xl">Socket.io with JWT Authentication</h1>
            <button className="p-1 bg-blue-400 text-blue-900 font-semibold text-sm md:text-base lg:text-lg rounded-md drop-shadow-md" onClick={handleLogin}>Login</button>
            <button className="p-1 bg-blue-400 text-blue-900 font-semibold text-sm md:text-base lg:text-lg rounded-md drop-shadow-md" onClick={handleTokenRefresh}>Refresh Token</button>
            <button className="p-1 bg-red-400 text-red-900 font-semibold text-sm md:text-base lg:text-lg rounded-md drop-shadow-md" onClick={handleLogout}>Logout</button>
            <br />
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
            />
            <button className="p-1 bg-blue-400 text-blue-900 font-semibold text-sm md:text-base lg:text-lg rounded-md drop-shadow-md" onClick={handleSendMessage}>Send Message</button>
            <p>Received Message: <span className="p-1 text-base md:text-lg lg:text-xl font-semibold">{receivedMessage}</span></p>
          </div>
          <div className={`h-96 flex flex-col gap-3 justify-center items-center p-4 bg-${selectedTheme}-300 rounded-lg`}>

          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonWebToken;
