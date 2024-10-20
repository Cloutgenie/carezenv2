import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash, Search } from 'lucide-react';

interface Prescription {
  id: number;
  patientName: string;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
}

const PrescriptionManagement: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentPrescription, setCurrentPrescription] = useState<Prescription | null>(null);

  useEffect(() => {
    // Simulating API call to fetch prescriptions
    const fetchPrescriptions = () => {
      const mockPrescriptions: Prescription[] = [
        { id: 1, patientName: "John Doe", medication: "Amoxicillin", dosage: "500mg", frequency: "3 times a day", startDate: "2023-04-15", endDate: "2023-04-22" },
        { id: 2, patientName: "Jane Smith", medication: "Lisinopril", dosage: "10mg", frequency: "Once daily", startDate: "2023-04-10", endDate: "2023-05-10" },
      ];
      setPrescriptions(mockPrescriptions);
    };

    fetchPrescriptions();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPrescription) {
      if (currentPrescription.id) {
        // Update existing prescription
        setPrescriptions(prescriptions.map(p => p.id === currentPrescription.id ? currentPrescription : p));
      } else {
        // Add new prescription
        setPrescriptions([...prescriptions, { ...currentPrescription, id: Date.now() }]);
      }
      setShowForm(false);
      setCurrentPrescription(null);
    }
  };

  const handleDelete = (id: number) => {
    setPrescriptions(prescriptions.filter(p => p.id !== id));
  };

  const filteredPrescriptions = prescriptions.filter(p =>
    p.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.medication.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Prescription Management</h2>
        <button
          onClick={() => { setShowForm(true); setCurrentPrescription({ id: 0, patientName: '', medication: '', dosage: '', frequency: '', startDate: '', endDate: '' }); }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Prescription
        </button>
      </div>

      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search prescriptions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 pl-8 border rounded-md"
        />
        <Search className="absolute left-2 top-2.5 text-gray-400" />
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-md">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Patient Name"
              value={currentPrescription?.patientName || ''}
              onChange={(e) => setCurrentPrescription({ ...currentPrescription!, patientName: e.target.value })}
              className="p-2 border rounded-md"
              required
            />
            <input
              type="text"
              placeholder="Medication"
              value={currentPrescription?.medication || ''}
              onChange={(e) => setCurrentPrescription({ ...currentPrescription!, medication: e.target.value })}
              className="p-2 border rounded-md"
              required
            />
            <input
              type="text"
              placeholder="Dosage"
              value={currentPrescription?.dosage || ''}
              onChange={(e) => setCurrentPrescription({ ...currentPrescription!, dosage: e.target.value })}
              className="p-2 border rounded-md"
              required
            />
            <input
              type="text"
              placeholder="Frequency"
              value={currentPrescription?.frequency || ''}
              onChange={(e) => setCurrentPrescription({ ...currentPrescription!, frequency: e.target.value })}
              className="p-2 border rounded-md"
              required
            />
            <input
              type="date"
              placeholder="Start Date"
              value={currentPrescription?.startDate || ''}
              onChange={(e) => setCurrentPrescription({ ...currentPrescription!, startDate: e.target.value })}
              className="p-2 border rounded-md"
              required
            />
            <input
              type="date"
              placeholder="End Date"
              value={currentPrescription?.endDate || ''}
              onChange={(e) => setCurrentPrescription({ ...currentPrescription!, endDate: e.target.value })}
              className="p-2 border rounded-md"
              required
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">
              {currentPrescription?.id ? 'Update' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => { setShowForm(false); setCurrentPrescription(null); }}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => { setShowForm(true); setCurrentPrescription(prescription); }} className="text-indigo-600 hover:text-indigo-900 mr-3">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(prescription.id)} className="text-red-600 hover:text-red-900">
                    <Trash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrescriptionManagement;