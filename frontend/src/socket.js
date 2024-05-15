import { io } from 'socket.io-client';

const URL = process.env.REACT_APP_PROJECT_STATE === 'production' ? undefined : 'https://localhost:5000';

export const socket = io(URL, {
  reconnection: true,
  reconnectionAttempts: 3,
  reconnectionDelay: 2000,
  secure: true,
  autoConnect: false
});