import React, { useState, useEffect } from 'react';
import { Clock, Video, User, ArrowRight, AlertCircle } from 'lucide-react';
import { useApi } from '../../hooks/useApi';

interface Patient {
  id: number;
  name: string;
  appointmentTime: string;
  appointmentType: 'in-person' | 'telehealth';
  status: 'waiting' | 'in-progress' | 'completed';
  waitTime: number;
  roomNumber?: string;
}

const PatientQueue: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const { execute: fetchPatients, loading, error } = useApi<Patient[]>();
  const { execute: updatePatientStatus } = useApi<Patient>();

  useEffect(() => {
    const getPatients = async () => {
      try {
        const data = await fetchPatients('/api/patient-queue');
        if (data) {
          setPatients(data);
        }
      } catch (err) {
        console.error('Error fetching patients:', err);
      }
    };

    getPatients();
  }, [fetchPatients]);

  const handleStatusChange = async (patientId: number, newStatus: 'waiting' | 'in-progress' | 'completed') => {
    try {
      const updatedPatient = await updatePatientStatus(`/api/patient-queue/${patientId}`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus }),
      });
      if (updatedPatient) {
        setPatients(patients.map(patient => 
          patient.id === patientId ? updatedPatient : patient
        ));
      }
    } catch (err) {
      console.error('Error updating patient status:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getWaitTimeColor = (waitTime: number) => {
    if (waitTime <= 15) return 'text-green-500';
    if (waitTime <= 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  if (loading) {
    return <div>Loading patient queue...</div>;
  }

  if (error) {
    return <div>Error loading patient queue. Please try again later.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Patient Queue</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wait Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <User className="h-10 w-10 rounded-full text-gray-300" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{patient.appointmentTime}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {patient.appointmentType === 'telehealth' ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      <Video className="w-4 h-4 mr-1" /> Telehealth
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      In-person
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                    {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`font-semibold ${getWaitTimeColor(patient.waitTime)}`}>
                    {patient.waitTime} min
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {patient.roomNumber || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {patient.status === 'waiting' && (
                    <button
                      onClick={() => handleStatusChange(patient.id, 'in-progress')}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  )}
                  {patient.status === 'in-progress' && (
                    <button
                      onClick={() => handleStatusChange(patient.id, 'completed')}
                      className="text-green-600 hover:text-green-900"
                    >
                      Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {patients.some(patient => patient.waitTime > 30) && (
        <div className="mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Long Wait Times</p>
          <p>Some patients have been waiting for more than 30 minutes. Please review the queue.</p>
        </div>
      )}
    </div>
  );
};

export default PatientQueue;