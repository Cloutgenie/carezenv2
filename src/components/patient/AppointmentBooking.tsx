import React, { useState } from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
}

const AppointmentBooking: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addNotification } = useNotifications();

  const doctors: Doctor[] = [
    { id: 1, name: 'Dr. Jane Smith', specialty: 'Cardiologist' },
    { id: 2, name: 'Dr. John Doe', specialty: 'Dermatologist' },
    { id: 3, name: 'Dr. Emily Brown', specialty: 'Pediatrician' },
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!selectedDate) newErrors.date = 'Date is required';
    if (!selectedTime) newErrors.time = 'Time is required';
    if (!selectedDoctor) newErrors.doctor = 'Doctor selection is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        addNotification({
          id: Date.now(),
          message: 'Appointment booked successfully!',
          type: 'success',
          timestamp: new Date().toLocaleString()
        });
        // Reset form
        setSelectedDate('');
        setSelectedTime('');
        setSelectedDoctor('');
      } catch (error) {
        addNotification({
          id: Date.now(),
          message: 'Failed to book appointment. Please try again.',
          type: 'error',
          timestamp: new Date().toLocaleString()
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              id="date"
              className={`focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${errors.date ? 'border-red-500' : ''}`}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="time"
              id="time"
              className={`focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${errors.time ? 'border-red-500' : ''}`}
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            />
          </div>
          {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time}</p>}
        </div>
        <div>
          <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">Doctor</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="doctor"
              className={`focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${errors.doctor ? 'border-red-500' : ''}`}
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              <option value="">Select a doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialty}
                </option>
              ))}
            </select>
          </div>
          {errors.doctor && <p className="mt-1 text-sm text-red-500">{errors.doctor}</p>}
        </div>
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Booking...' : 'Book Appointment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentBooking;