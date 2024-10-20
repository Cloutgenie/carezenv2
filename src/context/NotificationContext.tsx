import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'warning' | 'success';
  timestamp: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'read'>) => void;
  removeNotification: (id: number) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000'); // Replace with your actual WebSocket server URL
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('newNotification', (notification: Omit<Notification, 'id' | 'read'>) => {
        addNotification(notification);
      });
    }
  }, [socket]);

  const addNotification = (notification: Omit<Notification, 'id' | 'read'>) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      read: false,
    };
    setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
  };

  const removeNotification = (id: number) => {
    setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, markAllAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};