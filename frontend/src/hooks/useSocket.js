import io from 'socket.io-client';
import { AES, enc } from 'crypto-js';
import { useEffect } from 'react';

const useSocket = () => {
  const socket = io(String(process.env.REACT_APP_BASE_SOCKET), {
    reconnection: false,
    reconnectionAttempts: 3,
    reconnectionDelay: 2000,
    secure: true,
  });
  const secretKey = process.env.REACT_APP_KEY;

  const encryptData = (data) => {
    return AES.encrypt(data, secretKey).toString();
  };

  const decryptData = (data) => {
    return AES.decrypt(data, secretKey).toString(enc.Utf8);
  };

  const socketListen = (channel, handleData) => {
    socket.on(channel, handleData)
  }

  const socketEmit = (channel,data) => {
    socket.emit(channel, encryptData(data));
  };

  const socketDisconnect = (channel) => {
    socket.on(channel, (reason) => {
      console.log('Socket disconnected:', reason);
    });
  };

  const socketReconnect = () => {
    socket.on('reconnect_attempt', (attemptNumber) => {
      console.log(`Attempting to reconnect (attempt ${attemptNumber})...`);
    });
  }

  useEffect(() => {
    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return {
    socketReconnect,
    socketListen,
    socketDisconnect,
    socketEmit,
    decryptData,
  };
};

export default useSocket;
