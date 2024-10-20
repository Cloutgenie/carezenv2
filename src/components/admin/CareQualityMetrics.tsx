import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const CareQualityMetrics: React.FC = () => {
  const patientSatisfactionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Patient Satisfaction Score',
        data: [4.2, 4.5, 4.3, 4.6, 4.8, 4.7],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const incidentRateData = {
    labels: ['Falls', 'Medication Errors', 'Pressure Ulcers', 'Infections'],
    datasets: [
      {
        label: 'Incident Rate per 1000 Resident Days',
        data: [2.5, 1.8, 0.9, 1.2],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      }
    ]
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Care Quality Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Patient Satisfaction Trend</h3>
          <Line data={patientSatisfactionData} />
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Incident Rates</h3>
          <Bar data={incidentRateData} />
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-green-800">Average Length of Stay</h4>
          <p className="text-2xl font-bold text-green-600">28.5 days</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800">Staff-to-Resident Ratio</h4>
          <p className="text-2xl font-bold text-blue-600">1:6</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-purple-800">Activities Participation Rate</h4>
          <p className="text-2xl font-bold text-purple-600">78%</p>
        </div>
      </div>
    </div>
  );
};

export default CareQualityMetrics;