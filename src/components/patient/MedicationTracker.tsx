import React, { useState } from 'react';
import { Clock, Plus } from 'lucide-react';

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  time: string;
}

const MedicationTracker: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([
    { name: "Aspirin", dosage: "81mg", frequency: "Daily", time: "08:00 AM" },
    { name: "Lisinopril", dosage: "10mg", frequency: "Daily", time: "09:00 PM" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newMedication, setNewMedication] = useState<Medication>({ name: '', dosage: '', frequency: '', time: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMedication(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMedications(prev => [...prev, newMedication]);
    setNewMedication({ name: '', dosage: '', frequency: '', time: '' });
    setShowForm(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Medication Tracker</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm flex items-center"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Medication
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded-md">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Medication Name"
              value={newMedication.name}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
              required
            />
            <input
              type="text"
              name="dosage"
              placeholder="Dosage"
              value={newMedication.dosage}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
              required
            />
            <input
              type="text"
              name="frequency"
              placeholder="Frequency"
              value={newMedication.frequency}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
              required
            />
            <input
              type="time"
              name="time"
              value={newMedication.time}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
              required
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <div className="space-y-4">
        {medications.map((med, index) => (
          <div key={index} className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="font-medium">{med.name}</h3>
              <p className="text-sm text-gray-600">{med.dosage} - {med.frequency}</p>
            </div>
            <div className="flex items-center text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              <span>{med.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicationTracker;