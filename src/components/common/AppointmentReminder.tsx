import React, { useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

interface Appointment {
  id: number;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
}

const AppointmentReminder: React.FC = () => {
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Simulating fetching appointments from an API
    const appointments: Appointment[] = [
      { id: 1, patientName: "John Doe", doctorName: "Dr. Smith", date: "2023-04-20", time: "10:00 AM" },
      { id: 2, patientName: "Jane Smith", doctorName: "Dr. Johnson", date: "2023-04-21", time: "2:30 PM" },
    ];

    const checkAppointments = () => {
      const now = new Date();
      appointments.forEach(appointment => {
        const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);
        const timeDiff = appointmentDate.getTime() - now.getTime();
        const hoursDiff = timeDiff / (1000 * 3600);

        if (hoursDiff <= 24 && hoursDiff > 0) {
          addNotification({
            id: appointment.id,
            message: `Reminder: You have an appointment with ${appointment.doctorName} tomorrow at ${appointment.time}`,
            type: 'info',
            timestamp: new Date().toLocaleString()
          });
        }
      });
    };

    // Check for appointments every hour
    const interval = setInterval(checkAppointments, 3600000);

    // Initial check
    checkAppointments();

    return () => clearInterval(interval);
  }, [addNotification]);

  return null; // This component doesn't render anything visible
};

export default AppointmentReminder;