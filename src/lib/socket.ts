import { io, Socket } from "socket.io-client";

const URL =
  process.env.NEXT_PUBLIC_SERVER_URL_IMAGE || "http://localhost:5000/"; // Replace with your backend

let socket: Socket;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(URL, {
      transports: ["websocket"],
      reconnection: true,
    });
  }
  return socket;
};
