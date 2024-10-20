import React from 'react';
import { Calendar, Clock, Video } from 'lucide-react';

interface Appointment {
  id: number;
  date: string;
  time: string;
  doctorName: string;
  purpose: string;
  isVirtual: boolean;
}

const UpcomingAppointments: React.FC = () => {
  // This would typically come from an API
  const appointments: Appointment[] = [
    { id: 1, date: '2023-04-22', time: '10:00 AM', doctorName: 'Dr. Smith', purpose: 'Regular Checkup', isVirtual: false },
    { id: 2, date: '2023-05-05', time: '2:30 PM', doctorName: 'Dr. Johnson', purpose: 'Cardiology Follow-up', isVirtual: true },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Upcoming Appointments</h2>
      {appointments.map((appointment) => (
        <div key={appointment.id} className="mb-4 p-4 border rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-500" />
              <span className="font-semibold">{appointment.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-500" />
              <span>{appointment.time}</span>
            </div>
          </div>
          <p className="font-semibold">{appointment.doctorName}</p>
          <p className="text-gray-600">{appointment.purpose}</p>
          {appointment.isVirtual && (
            <div className="mt-2 flex items-center text-green-600">
              <Video className="w-5 h-5 mr-2" />
              <span>Virtual Appointment</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UpcomingAppointments;