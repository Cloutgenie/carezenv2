import React, { useState } from 'react';
import { Search, FileText, Plus } from 'lucide-react';

interface HistoryEntry {
  id: number;
  date: string;
  type: string;
  description: string;
}

const PatientHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState<Omit<HistoryEntry, 'id'>>({ date: '', type: '', description: '' });

  const patients = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
  ];

  const [patientHistory, setPatientHistory] = useState<HistoryEntry[]>([
    { id: 1, date: '2023-03-15', type: 'Checkup', description: 'Annual physical examination' },
    { id: 2, date: '2023-02-01', type: 'Vaccination', description: 'Flu shot administered' },
    { id: 3, date: '2022-11-20', type: 'Surgery', description: 'Appendectomy performed' },
  ]);

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = patientHistory.length + 1;
    setPatientHistory([...patientHistory, { id: newId, ...newEntry }]);
    setNewEntry({ date: '', type: '', description: '' });
    setShowAddForm(false);
  };

  const filteredHistory = patientHistory.filter(entry =>
    entry.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Patient History</h2>
      <div className="mb-4">
        <select
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select a patient</option>
          {patients.map(patient => (
            <option key={patient.id} value={patient.id}>{patient.name}</option>
          ))}
        </select>
      </div>
      {selectedPatient && (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="relative flex-grow mr-4">
              <input
                type="text"
                placeholder="Search patient history..."
                className="w-full p-2 pl-10 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Entry
            </button>
          </div>
          {showAddForm && (
            <form onSubmit={handleAddEntry} className="mb-4 p-4 border rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={newEntry.date}
                  onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                  className="p-2 border rounded-md"
                  required
                />
                <input
                  type="text"
                  placeholder="Entry Type"
                  value={newEntry.type}
                  onChange={(e) => setNewEntry({ ...newEntry, type: e.target.value })}
                  className="p-2 border rounded-md"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={newEntry.description}
                  onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
                  className="p-2 border rounded-md col-span-2"
                  rows={3}
                  required
                />
              </div>
              <div className="mt-4 flex justify-end">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
          <div className="space-y-4">
            {filteredHistory.map((entry) => (
              <div key={entry.id} className="border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">{entry.date}</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                    {entry.type}
                  </span>
                </div>
                <p>{entry.description}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PatientHistory;