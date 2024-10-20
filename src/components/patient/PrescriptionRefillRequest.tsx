import React, { useState, useEffect } from 'react';
import { Pill, Send } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

interface Prescription {
  id: number;
  name: string;
  dosage: string;
  refillsRemaining: number;
}

const PrescriptionRefillRequest: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [selectedPrescription, setSelectedPrescription] = useState<number | null>(null);
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Simulating API call to fetch prescriptions
    const fetchPrescriptions = () => {
      const mockPrescriptions: Prescription[] = [
        { id: 1, name: "Lisinopril", dosage: "10mg", refillsRemaining: 2 },
        { id: 2, name: "Metformin", dosage: "500mg", refillsRemaining: 1 },
        { id: 3, name: "Atorvastatin", dosage: "20mg", refillsRemaining: 3 },
      ];
      setPrescriptions(mockPrescriptions);
    };

    fetchPrescriptions();
  }, []);

  const handleRefillRequest = () => {
    if (selectedPrescription) {
      // Simulating API call to request refill
      console.log(`Requesting refill for prescription ID: ${selectedPrescription}`);
      addNotification({
        id: Date.now(),
        message: "Prescription refill request sent successfully",
        type: 'success',
        timestamp: new Date().toLocaleString()
      });
      setSelectedPrescription(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Request Prescription Refill</h2>
      <div className="mb-4">
        <label htmlFor="prescription" className="block text-sm font-medium text-gray-700">Select Prescription</label>
        <select
          id="prescription"
          value={selectedPrescription || ''}
          onChange={(e) => setSelectedPrescription(Number(e.target.value))}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="">Select a prescription</option>
          {prescriptions.map((prescription) => (
            <option key={prescription.id} value={prescription.id}>
              {prescription.name} ({prescription.dosage}) - Refills remaining: {prescription.refillsRemaining}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleRefillRequest}
        disabled={!selectedPrescription}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Pill className="w-5 h-5 mr-2" />
        Request Refill
      </button>
    </div>
  );
};

export default PrescriptionRefillRequest;