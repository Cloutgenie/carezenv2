import React, { useEffect } from 'react';
import { Video, Clock, Calendar } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

const AppointmentCard: React.FC<{
  patientName: string;
  time: string;
  type: 'in-person' | 'telehealth';
  status: 'upcoming' | 'in-progress' | 'completed';
}> = ({ patientName, time, type, status }) => {
  const statusColors = {
    upcoming: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={`https://source.unsplash.com/random/40x40?face`}
            alt={patientName}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="font-semibold">{patientName}</h3>
            <p className="text-sm text-gray-600 flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {time}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold mr-2 ${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
          {type === 'telehealth' ? (
            <button className="bg-green-500 text-white px-3 py-1 rounded-md text-sm flex items-center">
              <Video className="w-4 h-4 mr-1" />
              Join
            </button>
          ) : (
            <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Check-in
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const TodaysAppointments: React.FC = () => {
  const { addNotification } = useNotifications();

  const appointments = [
    { patientName: "Alice Johnson", time: "09:00 AM", type: "in-person", status: "upcoming" },
    { patientName: "Bob Smith", time: "10:30 AM", type: "telehealth", status: "upcoming" },
    { patientName: "Carol Williams", time: "11:45 AM", type: "in-person", status: "upcoming" },
  ];

  useEffect(() => {
    // Simulate sending notifications for upcoming appointments
    appointments.forEach(appointment => {
      const [hours, minutes] = appointment.time.split(':');
      const appointmentTime = new Date();
      appointmentTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      const now = new Date();
      const timeDiff = appointmentTime.getTime() - now.getTime();
      const minutesDiff = timeDiff / (1000 * 60);

      if (minutesDiff <= 15 && minutesDiff > 0) {
        addNotification({
          id: Date.now(),
          message: `Upcoming appointment with ${appointment.patientName} in 15 minutes`,
          type: 'warning',
          timestamp: new Date().toLocaleString()
        });
      }
    });
  }, [addNotification]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Today's Appointments</h2>
      {appointments.map((appointment, index) => (
        <AppointmentCard key={index} {...appointment} />
      ))}
    </div>
  );
};

export default TodaysAppointments;