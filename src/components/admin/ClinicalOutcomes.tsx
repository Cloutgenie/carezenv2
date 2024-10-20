import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const ClinicalOutcomes: React.FC = () => {
  const functionalImprovementData = {
    labels: ['ADLs', 'Mobility', 'Cognition', 'Communication'],
    datasets: [
      {
        label: 'Improvement Rate (%)',
        data: [75, 68, 62, 70],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const readmissionRateData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Readmission Rate (%)',
        data: [12, 10, 11, 9, 8, 7],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Clinical Outcomes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Functional Improvement</h3>
          <Bar data={functionalImprovementData} />
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Hospital Readmission Rate</h3>
          <Line data={readmissionRateData} />
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-green-800">Medication Error Rate</h4>
          <p className="text-2xl font-bold text-green-600">0.5%</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800">Pressure Ulcer Prevalence</h4>
          <p className="text-2xl font-bold text-blue-600">2.8%</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-purple-800">Pain Management Effectiveness</h4>
          <p className="text-2xl font-bold text-purple-600">88%</p>
        </div>
      </div>
    </div>
  );
};

export default ClinicalOutcomes;