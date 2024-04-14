import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'https://localhost:5000';

export const socket = io(URL, {
  reconnection: false,
  reconnectionAttempts: 3,
  reconnectionDelay: 2000,
  secure: true,
  autoConnect: false
});