import React from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StaffEfficiency: React.FC = () => {
  const staffUtilizationData = {
    labels: ['Direct Care', 'Administrative Tasks', 'Training', 'Breaks'],
    datasets: [
      {
        data: [65, 20, 10, 5],
        backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#F44336'],
      },
    ],
  };

  const overtimeTrendData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Overtime Hours',
        data: [12, 15, 10, 8],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Staff Efficiency</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Staff Time Utilization</h3>
          <Doughnut data={staffUtilizationData} />
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Overtime Trend</h3>
          <Line data={overtimeTrendData} />
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800">Average Tasks Completed per Shift</h4>
          <p className="text-2xl font-bold text-blue-600">42</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-green-800">Staff Turnover Rate</h4>
          <p className="text-2xl font-bold text-green-600">12%</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-purple-800">Training Completion Rate</h4>
          <p className="text-2xl font-bold text-purple-600">95%</p>
        </div>
      </div>
    </div>
  );
};

export default StaffEfficiency;