import React, { useState, useEffect } from 'react';
import { AlertTriangle, Search, Calendar, Pill } from 'lucide-react';

interface NarcoticPrescription {
  id: number;
  patientName: string;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  lastRefillDate: string;
  totalPrescribed: number;
  remainingRefills: number;
}

const NarcoticsTracking: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<NarcoticPrescription[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // In a real application, this would be an API call
    const fetchNarcoticPrescriptions = () => {
      const mockPrescriptions: NarcoticPrescription[] = [
        {
          id: 1,
          patientName: "John Doe",
          medication: "Oxycodone",
          dosage: "10mg",
          frequency: "Every 6 hours as needed",
          startDate: "2023-04-01",
          endDate: "2023-05-01",
          lastRefillDate: "2023-04-15",
          totalPrescribed: 60,
          remainingRefills: 1,
        },
        {
          id: 2,
          patientName: "Jane Smith",
          medication: "Hydrocodone",
          dosage: "5mg",
          frequency: "Every 4-6 hours as needed",
          startDate: "2023-03-15",
          endDate: "2023-04-15",
          lastRefillDate: "2023-04-01",
          totalPrescribed: 30,
          remainingRefills: 0,
        },
      ];
      setPrescriptions(mockPrescriptions);
    };

    fetchNarcoticPrescriptions();
  }, []);

  const filteredPrescriptions = prescriptions.filter(
    (prescription) =>
      prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.medication.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Narcotics Tracking</h2>
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search by patient name or medication..."
          className="w-full p-2 pl-8 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-2 top-2.5 text-gray-400" />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medication</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Refill</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining Refills</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPrescriptions.map((prescription) => (
              <tr key={prescription.id}>
                <td className="px-6 py-4 whitespace-nowrap">{prescription.patientName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{prescription.medication}</td>
                <td className="px-6 py-4 whitespace-nowrap">{prescription.dosage}</td>
                <td className="px-6 py-4 whitespace-nowrap">{prescription.frequency}</td>
                <td className="px-6 py-4 whitespace-nowrap">{prescription.startDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{prescription.endDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{prescription.lastRefillDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    prescription.remainingRefills === 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {prescription.remainingRefills}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Remember to review the patient's history and current medications before prescribing or refilling narcotics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NarcoticsTracking;