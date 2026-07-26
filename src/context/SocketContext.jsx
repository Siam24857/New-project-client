import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext.jsx';

const SocketContext = createContext(null);

const SOCKET_URL = 'http://localhost:5000';

export function SocketProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setConnected(false);
      }
      return;
    }

    const token = localStorage.getItem('taskflow_token');
    const socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));

    socket.on('project:created', (data) => {
      setNotifications((prev) => [...prev, { type: 'project:created', message: `Project created: ${data.name}`, time: Date.now() }]);
    });
    socket.on('project:updated', (data) => {
      setNotifications((prev) => [...prev, { type: 'project:updated', message: `Project updated: ${data.name}`, time: Date.now() }]);
    });
    socket.on('project:deleted', () => {
      setNotifications((prev) => [...prev, { type: 'project:deleted', message: 'A project was deleted', time: Date.now() }]);
    });
    socket.on('task:created', (data) => {
      setNotifications((prev) => [...prev, { type: 'task:created', message: `Task created: ${data.title}`, time: Date.now() }]);
    });
    socket.on('task:updated', (data) => {
      setNotifications((prev) => [...prev, { type: 'task:updated', message: `Task updated: ${data.title}`, time: Date.now() }]);
    });
    socket.on('task:deleted', () => {
      setNotifications((prev) => [...prev, { type: 'task:deleted', message: 'A task was deleted', time: Date.now() }]);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
      setConnected(false);
    };
  }, [isAuthenticated, user]);

  const clearNotifications = () => setNotifications([]);

  const dismissNotification = (index) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, connected, notifications, clearNotifications, dismissNotification }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error('useSocket must be used within SocketProvider');
  return ctx;
};
