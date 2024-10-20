import React, { useEffect } from 'react';
import { Video, Calendar } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

const AppointmentCard: React.FC<{
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  type: 'in-person' | 'telehealth';
  status: 'confirmed' | 'pending' | 'cancelled';
}> = ({ doctorName, specialty, date, time, type, status }) => {
  const statusColors = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-start">
        <img
          src={`https://source.unsplash.com/random/60x60?face`}
          alt={doctorName}
          className="w-16 h-16 rounded-full mr-4"
        />
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{doctorName}</h3>
              <p className="text-gray-600">{specialty}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
          <p className="text-gray-700 mt-2">{date} at {time}</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-600">{type === 'telehealth' ? 'Telehealth' : 'In-person'}</span>
            <div className="space-x-2">
              {type === 'telehealth' && (
                <button className="bg-green-500 text-white px-3 py-1 rounded-md text-sm flex items-center">
                  <Video className="w-4 h-4 mr-1" />
                  Join
                </button>
              )}
              <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Reschedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UpcomingAppointments: React.FC = () => {
  const { addNotification } = useNotifications();

  const appointments = [
    {
      doctorName: "Dr. Jane Smith",
      specialty: "Cardiologist",
      date: "2023-04-15",
      time: "10:00 AM",
      type: "in-person",
      status: "confirmed"
    },
    {
      doctorName: "Dr. John Doe",
      specialty: "Dermatologist",
      date: "2023-04-18",
      time: "2:30 PM",
      type: "telehealth",
      status: "pending"
    },
  ];

  useEffect(() => {
    // Simulate sending reminders for upcoming appointments
    appointments.forEach(appointment => {
      const appointmentDate = new Date(`${appointment.date} ${appointment.time}`);
      const now = new Date();
      const timeDiff = appointmentDate.getTime() - now.getTime();
      const daysDiff = timeDiff / (1000 * 3600 * 24);

      if (daysDiff <= 1 && daysDiff > 0) {
        addNotification({
          id: Date.now(),
          message: `Reminder: You have an appointment with ${appointment.doctorName} tomorrow at ${appointment.time}`,
          type: 'warning',
          timestamp: new Date().toLocaleString()
        });
      }
    });
  }, [addNotification]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Upcoming Appointments</h2>
      {appointments.map((appointment, index) => (
        <AppointmentCard key={index} {...appointment} />
      ))}
    </div>
  );
};

export default UpcomingAppointments;