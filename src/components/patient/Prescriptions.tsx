import React, { useState, useEffect } from 'react';

interface Prescription {
  id: number;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
}

const Prescriptions: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    // Simulating API call to fetch prescriptions
    const fetchPrescriptions = () => {
      const mockPrescriptions: Prescription[] = [
        {
          id: 1,
          medication: "Amoxicillin",
          dosage: "500mg",
          frequency: "3 times a day",
          startDate: "2023-04-15",
          endDate: "2023-04-22"
        },
        {
          id: 2,
          medication: "Lisinopril",
          dosage: "10mg",
          frequency: "Once daily",
          startDate: "2023-04-10",
          endDate: "2023-05-10"
        }
      ];
      setPrescriptions(mockPrescriptions);
    };

    fetchPrescriptions();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Current Prescriptions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medication</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {prescriptions.map((prescription) => (
              <tr key={prescription.id}>
                <td className="px-6 py-4 whitespace-nowrap">{prescription.medication}</td>
                <td className="px-6 py-4 whitespace-nowrap">{prescription.dosage}</td>
                <td className="px-6 py-4 whitespace-nowrap">{prescription.frequency}</td>
                <td className="px-6 py-4 whitespace-nowrap">{prescription.startDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{prescription.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Prescriptions;