import React, { useState, useEffect } from 'react';
import { Bell, Check, X } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
}

const MedicationReminder: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Simulating API call to fetch medications
    const fetchMedications = () => {
      const mockMedications: Medication[] = [
        { id: 1, name: "Aspirin", dosage: "81mg", frequency: "Daily", time: "08:00" },
        { id: 2, name: "Lisinopril", dosage: "10mg", frequency: "Daily", time: "09:00" },
        { id: 3, name: "Metformin", dosage: "500mg", frequency: "Twice daily", time: "09:00,21:00" },
      ];
      setMedications(mockMedications);
    };

    fetchMedications();
  }, []);

  useEffect(() => {
    const checkMedications = () => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      medications.forEach(medication => {
        const times = medication.time.split(',');
        times.forEach(time => {
          if (time === currentTime) {
            addNotification({
              id: Date.now(),
              message: `Time to take ${medication.name} (${medication.dosage})`,
              type: 'warning',
              timestamp: new Date().toLocaleString()
            });
          }
        });
      });
    };

    const interval = setInterval(checkMedications, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [medications, addNotification]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Medication Reminders</h2>
      <ul className="space-y-4">
        {medications.map(medication => (
          <li key={medication.id} className="flex items-center justify-between border-b pb-2">
            <div>
              <h3 className="font-semibold">{medication.name}</h3>
              <p className="text-sm text-gray-600">{medication.dosage} - {medication.frequency}</p>
            </div>
            <div className="flex items-center">
              <Bell className="w-5 h-5 text-blue-500 mr-2" />
              <span>{medication.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicationReminder;