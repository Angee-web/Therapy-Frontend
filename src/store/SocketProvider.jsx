import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const connectSocket = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return; // Abort connection if there's no token
      }

      const socketInstance = io(import.meta.env.VITE_API_BASE_URL, {
        transports: ["websocket", "polling"],
        auth: { token },
      });

      socketInstance.on("connect", () => {
        setIsConnected(true);
      });

      socketInstance.on("disconnect", () => {
        setIsConnected(false);
      });

      socketInstance.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
      });

      setSocket(socketInstance);
    };

    connectSocket(); // Initial connection attempt

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const handleLogoutSocket = () => {
    if (socket) {
      const userId = localStorage.getItem("userId");
      socket.emit("userLogout", userId);
      socket.disconnect();
    }
  };

  return (
    <SocketContext.Provider value={{ socket, isConnected, handleLogoutSocket }}>
      {children}
    </SocketContext.Provider>
  );
};