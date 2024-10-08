import { io } from 'socket.io-client';

const URL = process.env.REACT_APP_PROJECT_STATE === 'production' ? undefined : 'https://localhost:5000';

const initializeSocket = () => {
  const socket = io(URL, {
    reconnection: true,
    reconnectionDelay: 2000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 3,
    secure: true,
    autoConnect: true,
  });
  socket.on('connect_error', (err) => {
    console.error(`Connection error: ${err}`);
  });
  return socket;
};

export const socket = initializeSocket();
