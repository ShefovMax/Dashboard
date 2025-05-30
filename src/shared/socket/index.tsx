import { io, Socket } from 'socket.io-client';

export const socket = io('https://socket-server-7cuj.onrender.com/') as Socket;
