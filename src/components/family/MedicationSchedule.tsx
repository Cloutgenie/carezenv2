import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  notes?: string;
}

const MedicationSchedule: React.FC = () => {
  // Using dummy data to ensure HIPAA compliance
  const medications: Medication[] = [
    { id: 1, name: 'Medication A', dosage: 'As prescribed', frequency: 'Once daily', time: 'Morning' },
    { id: 2, name: 'Medication B', dosage: 'As prescribed', frequency: 'Twice daily', time: 'Morning and Evening', notes: 'Take with food' },
    { id: 3, name: 'Medication C', dosage: 'As prescribed', frequency: 'Once daily', time: 'Evening' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Medication Schedule</h2>
      <div className="space-y-4">
        {medications.map((medication) => (
          <div key={medication.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{medication.name}</h3>
                <p className="text-gray-600">{medication.dosage}</p>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-500" />
                <span>{medication.time}</span>
              </div>
            </div>
            <p className="mt-2">Frequency: {medication.frequency}</p>
            {medication.notes && (
              <div className="mt-2 flex items-start text-yellow-600">
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>{medication.notes}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicationSchedule;