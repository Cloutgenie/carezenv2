import React, { useState } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';

interface Prescription {
  id: number;
  patientName: string;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
}

const Prescriptions: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: 1,
      patientName: "John Doe",
      medication: "Amoxicillin",
      dosage: "500mg",
      frequency: "3 times a day",
      startDate: "2023-04-15",
      endDate: "2023-04-22"
    },
    {
      id: 2,
      patientName: "Jane Smith",
      medication: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      startDate: "2023-04-10",
      endDate: "2023-05-10"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Prescription, 'id'>>({
    patientName: '',
    medication: '',
    dosage: '',
    frequency: '',
    startDate: '',
    endDate: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setPrescriptions(prev => prev.map(p => p.id === editingId ? { ...formData, id: editingId } : p));
    } else {
      setPrescriptions(prev => [...prev, { ...formData, id: Date.now() }]);
    }
    setShowForm(false);
    setEditingId(null);
    setFormData({
      patientName: '',
      medication: '',
      dosage: '',
      frequency: '',
      startDate: '',
      endDate: ''
    });
  };

  const handleEdit = (prescription: Prescription) => {
    setFormData(prescription);
    setEditingId(prescription.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setPrescriptions(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Prescriptions</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Prescription
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-md">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="patientName"
              placeholder="Patient Name"
              value={formData.patientName}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
              required
            />
            <input
              type="text"
              name="medication"
              placeholder="Medication"
              value={formData.medication}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
              required
            />
            <input
              type="text"
              name="dosage"
              placeholder="Dosage"
              value={formData.dosage}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
              required
            />
            <input
              type="text"
              name="frequency"
              placeholder="Frequency"
              value={formData.frequency}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
              required
            />
            <input
              type="date"
              name="startDate"
              placeholder="Start Date"
              value={formData.startDate}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
              required
            />
            <input
              type="date"
              name="endDate"
              placeholder="End Date"
              value={formData.endDate}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
              required
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">
              {editingId ? 'Update' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
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
            {prescriptions.map((prescription) => (
              <tr key={prescription.id}>
                <td className="px-6 py-4 whitespace-nowrap">{prescription.patientName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{prescription.medication}</td>
                <td className="px-6 py-4 whitespace-nowrap">{prescription.dosage}</td>
                <td className="px-6 py-4 whitespace-nowrap">{prescription.frequency}</td>
                <td className="px-6 py-4 whitespace-nowrap">{prescription.startDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{prescription.endDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleEdit(prescription)} className="text-indigo-600 hover:text-indigo-900 mr-3">
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

export default Prescriptions;