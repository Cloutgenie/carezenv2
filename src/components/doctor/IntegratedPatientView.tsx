import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Pill, Activity, Weight, Thermometer } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface PatientData {
  id: string;
  name: string;
  age: number;
  gender: string;
  weight: number[];
  bloodPressure: { systolic: number; diastolic: number }[];
  medications: { name: string; dosage: string; frequency: string }[];
  symptoms: { date: string; description: string }[];
}

const IntegratedPatientView: React.FC = () => {
  const [patientData, setPatientData] = useState<PatientData | null>(null);

  useEffect(() => {
    // Simulated API call to fetch patient data
    const fetchPatientData = async () => {
      // In a real application, you would fetch this data from your backend
      const mockPatientData: PatientData = {
        id: '12345',
        name: 'John Doe',
        age: 45,
        gender: 'Male',
        weight: [80, 79.5, 79, 78.5, 78],
        bloodPressure: [
          { systolic: 130, diastolic: 85 },
          { systolic: 128, diastolic: 83 },
          { systolic: 126, diastolic: 82 },
          { systolic: 125, diastolic: 80 },
          { systolic: 122, diastolic: 79 },
        ],
        medications: [
          { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
          { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
        ],
        symptoms: [
          { date: '2023-04-10', description: 'Mild headache in the morning' },
          { date: '2023-04-12', description: 'Slight dizziness after standing up quickly' },
        ],
      };
      setPatientData(mockPatientData);
    };

    fetchPatientData();
  }, []);

  if (!patientData) {
    return <div>Loading patient data...</div>;
  }

  const weightData = {
    labels: ['5 days ago', '4 days ago', '3 days ago', '2 days ago', 'Yesterday'],
    datasets: [
      {
        label: 'Weight (kg)',
        data: patientData.weight,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const bpData = {
    labels: ['5 days ago', '4 days ago', '3 days ago', '2 days ago', 'Yesterday'],
    datasets: [
      {
        label: 'Systolic',
        data: patientData.bloodPressure.map(bp => bp.systolic),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
      {
        label: 'Diastolic',
        data: patientData.bloodPressure.map(bp => bp.diastolic),
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Integrated Patient View</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Patient Information</h3>
          <p><strong>Name:</strong> {patientData.name}</p>
          <p><strong>Age:</strong> {patientData.age}</p>
          <p><strong>Gender:</strong> {patientData.gender}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Current Medications</h3>
          <ul>
            {patientData.medications.map((med, index) => (
              <li key={index} className="flex items-center mb-2">
                <Pill className="w-5 h-5 mr-2 text-blue-500" />
                {med.name} - {med.dosage} ({med.frequency})
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Weight Trend</h3>
          <Line data={weightData} />
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Blood Pressure Trend</h3>
          <Line data={bpData} />
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Recent Symptoms</h3>
        <ul>
          {patientData.symptoms.map((symptom, index) => (
            <li key={index} className="flex items-center mb-2">
              <Thermometer className="w-5 h-5 mr-2 text-red-500" />
              <span className="font-medium mr-2">{symptom.date}:</span> {symptom.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IntegratedPatientView;