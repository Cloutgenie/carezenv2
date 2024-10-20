import React from 'react';
import { Users, DollarSign, Smile, Activity } from 'lucide-react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const KeyMetrics: React.FC = () => {
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 22000, 20000, 25000],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const appointmentTypeData = {
    labels: ['In-person', 'Telehealth'],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB']
      }
    ]
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Key Metrics</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-500 mr-2" />
            <span className="text-xl font-semibold">1,234</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Total Patients</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-green-500 mr-2" />
            <span className="text-xl font-semibold">$52,000</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Monthly Revenue</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <div className="flex items-center">
            <Smile className="w-8 h-8 text-yellow-500 mr-2" />
            <span className="text-xl font-semibold">4.8</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Satisfaction Rating</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <div className="flex items-center">
            <Activity className="w-8 h-8 text-purple-500 mr-2" />
            <span className="text-xl font-semibold">89%</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Appointment Completion Rate</p>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Revenue Trend</h3>
        <Line data={revenueData} />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Appointment Types</h3>
        <div className="w-1/2 mx-auto">
          <Pie data={appointmentTypeData} />
        </div>
      </div>
    </div>
  );
};

export default KeyMetrics;