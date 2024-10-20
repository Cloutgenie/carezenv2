import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

const RealtimeUpdates: React.FC = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  useEffect(() => {
    const socket = io('http://localhost:3000'); // Replace with your actual WebSocket server URL

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      if (user) {
        socket.emit('join', { userId: user.id, role: user.role });
      }
    });

    socket.on('appointmentUpdate', (data) => {
      addNotification({
        id: Date.now(),
        message: `Appointment update: ${data.message}`,
        type: 'info',
        timestamp: new Date().toLocaleString()
      });
    });

    socket.on('appointmentReminder', (data) => {
      addNotification({
        id: Date.now(),
        message: `Reminder: You have an appointment with ${data.doctorName} on ${data.date} at ${data.time}`,
        type: 'warning',
        timestamp: new Date().toLocaleString()
      });
    });

    socket.on('newMessage', (data) => {
      addNotification({
        id: Date.now(),
        message: `New message from ${data.sender}`,
        type: 'info',
        timestamp: new Date().toLocaleString()
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [user, addNotification]);

  return null; // This component doesn't render anything
};

export default RealtimeUpdates;