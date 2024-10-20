import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const PerformanceMetrics: React.FC = () => {
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

  const appointmentEfficiencyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Average Appointment Duration (minutes)',
        data: [25, 22, 28, 24, 26],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      }
    ]
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-6">Performance Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Patient Satisfaction</h3>
          <Line data={patientSatisfactionData} />
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Appointment Efficiency</h3>
          <Bar data={appointmentEfficiencyData} />
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-2">Key Performance Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800">Patients Seen This Week</h4>
            <p className="text-2xl font-bold text-blue-600">42</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-green-800">Average Wait Time</h4>
            <p className="text-2xl font-bold text-green-600">12 min</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-yellow-800">Treatment Success Rate</h4>
            <p className="text-2xl font-bold text-yellow-600">92%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;