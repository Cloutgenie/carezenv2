import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const FinancialReports: React.FC = () => {
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 22000, 20000, 25000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const expensesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Expenses',
        data: [10000, 15000, 12000, 18000, 16000, 20000],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
        fill: false,
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Financial Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Revenue</h3>
          <Bar data={revenueData} />
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Expenses</h3>
          <Line data={expensesData} />
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-green-800">Total Revenue</h4>
          <p className="text-2xl font-bold text-green-600">$113,000</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-red-800">Total Expenses</h4>
          <p className="text-2xl font-bold text-red-600">$91,000</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800">Net Profit</h4>
          <p className="text-2xl font-bold text-blue-600">$22,000</p>
        </div>
      </div>
    </div>
  );
};

export default FinancialReports;