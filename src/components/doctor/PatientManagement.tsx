import React, { useState } from 'react';
import { Search, Edit, FileText } from 'lucide-react';

const PatientCard: React.FC<{
  name: string;
  lastVisit: string;
  nextAppointment: string;
}> = ({ name, lastVisit, nextAppointment }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={`https://source.unsplash.com/random/40x40?face`}
            alt={name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-gray-600">Last visit: {lastVisit}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600">Next: {nextAppointment}</p>
          <div className="flex mt-2">
            <button className="text-blue-500 hover:text-blue-700 mr-2">
              <Edit className="w-5 h-5" />
            </button>
            <button className="text-green-500 hover:text-green-700">
              <FileText className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PatientManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const patients = [
    { name: "Alice Johnson", lastVisit: "2023-03-15", nextAppointment: "2023-04-20" },
    { name: "Bob Smith", lastVisit: "2023-03-10", nextAppointment: "2023-04-18" },
    { name: "Carol Williams", lastVisit: "2023-03-05", nextAppointment: "2023-04-22" },
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Patient Management</h2>
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search patients..."
          className="w-full p-2 pl-10 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
      </div>
      {filteredPatients.map((patient, index) => (
        <PatientCard key={index} {...patient} />
      ))}
    </div>
  );
};

export default PatientManagement;